import goalModel from "../models/goalModel.js";

export const AddGoal = async (req, res) => {
  const { amount } = req.body;

  try {
    if (!amount) {
      return res.status(400).json({ message: "Amount not available" });
    }
    if (amount < 1) {
      return res.status(400).json({ message: "Amount not valid" });
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
    const goal = new goalModel({ amount });
    await goal.save();

    res.status(201).json({ message: "Goal added successfully", goal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
