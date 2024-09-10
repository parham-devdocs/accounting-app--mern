import goalModel from "../models/goalModel.js";
import expenseModel from "../models/expenseModel.js";
export const AddGoal = async (req, res) => {
  const { target, budget } = req.body;

  try {
    if (!target || !budget) {
      return res
        .status(400)
        .json({ message: "target or budget not available" });
    }
    if (target < 1 || budget < 1) {
      return res.status(400).json({ message: "target or budget not valid" });
    }

    const date = new Date();
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    // Check if a goal already exists for the current month
    const existingGoal = await goalModel.findOne({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    if (existingGoal) {
      return res
        .status(400)
        .json({ message: "Goal already exists for this month." });
    }
    // Create and save the new goal
    const goal = new goalModel({ target, budget });
    await goal.save();

    res.status(201).json({ message: "Goal added successfully", goal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGoals = async (req, res) => {
  try {
    const date = new Date();
    const year = date.getFullYear();
    const expenses = await expenseModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $year: "$createdAt" }, year], // Filter for the current year
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month
          amount: { $sum: "$amount" }, // Sum up the budgets
        },
      },
      {
        $project: {
          month: "$_id", // Rename _id to month
          amount: 1,
          _id: 0, // Exclude the default _id field
        },
      },
    ]);
    const goals = await goalModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $year: "$createdAt" }, year], // Filter for the current year
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month
          target: { $sum: "$target" }, // Sum up the targets
          budget: { $sum: "$budget" },
        },
      },
      {
        $project: {
          month: "$_id", // Rename _id to month
          target: 1,
          budget: 1,
          _id: 0, // Exclude the default _id field
        },
      },
    ]);
    const combined = goals.map((goal) => {
      const expense = expenses.find((exp) => exp.month === goal.month);
      return {
        month: goal.month,
        target: goal.target,
        saving: goal.budget - expense.amount,
      };
    });
    res.status(200).json({message:combined});
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
