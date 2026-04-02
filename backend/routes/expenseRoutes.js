const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// ➕ Add Expense
router.post("/", async (req, res) => {
  try {
    const expense = new Expense(req.body);
    const saved = await expense.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 📥 Get Expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json(err);
  }
});
// ❌ Delete Expense
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// 🧪 Test route (keep it)
router.get("/test", (req, res) => {
  res.send("Test route working");
});

module.exports = router;