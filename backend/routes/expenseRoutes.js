const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");


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


// 🧪 Test route
router.get("/test", (req, res) => {
  res.send("Test route working");
});

module.exports = router;