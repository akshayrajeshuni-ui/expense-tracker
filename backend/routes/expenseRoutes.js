const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const jwt = require("jsonwebtoken");

// ✅ Middleware to verify token
const verify = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json("No token");
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(400).json("Invalid token");
  }
};

// ➕ Add Expense
router.post("/", verify, async (req, res) => {
  const { title, amount, category, date } = req.body;

  const expense = new Expense({
    title,
    amount,
    category,
    date,
    userId: req.userId
  });

  const saved = await expense.save();
  res.json(saved);
});


// 📥 Get Expenses (FILTERED BY USER)
router.get("/", verify, async (req, res) => {
  const expenses = await Expense.find({ userId: req.userId });
  res.json(expenses);
});


// ❌ Delete Expense (ONLY OWN DATA)
router.delete("/:id", verify, async (req, res) => {
  const expense = await Expense.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId
  });

  res.json({ message: "Deleted" });
});
router.put("/:id", verify, async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, amount, category, date },
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json(err);
  }
});


// 🧪 Test route
router.get("/test", (req, res) => {
  res.send("Test route working");
});

module.exports = router;