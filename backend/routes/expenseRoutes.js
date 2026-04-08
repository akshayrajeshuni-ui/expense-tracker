const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// ➕ Add Expense
router.post("/", async (req, res) => {
  try {
    const { title, amount, category, date, userId } = req.body;

    // ✅ validation
    if (!userId) {
      return res.status(400).json({ message: "UserId required" });
    }

    const expense = new Expense({
      title,
      amount,
      category,
      date,
      userId
    });

    const saved = await expense.save();
    res.json(saved);

  } catch (err) {
    res.status(500).json(err);
  }
});

// 📥 Get Expenses
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    // ✅ validation
    if (!userId) {
      return res.status(400).json({ message: "UserId required" });
    }

    // ✅ filter by user
    const expenses = await Expense.find({ userId });

    res.json(expenses);

  } catch (err) {
    res.status(500).json(err);
  }
});
// ❌ Delete Expense
router.delete("/:id", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "UserId required" });
    }

    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: userId
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found or not authorized"
      });
    }

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json(err);
  }
});

    if (!expense) {
      return res.status(404).json({ message: "Not found or not authorized" });
    }

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