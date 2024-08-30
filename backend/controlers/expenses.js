import ExpenseModel from "../models/expenseModel.js";

export const addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = ExpenseModel({
    title,
    amount,
    category,
    description,
    date,
  });
  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "all fields are required" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "amount must be a positive number" });
    }
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "something went wrong in the server!" });
  }
};

export const getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseModel.find().sort({ createdAt: -1 });
    res.status(200).send(expenses);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "something went wrong in the server!" });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExpense = await ExpenseModel.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    
    res.status(200).json({ message: "income deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "something went wrong in the server!" });
  }
};


export const editExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const { id } = req.params;

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }

    const updatedData = await ExpenseModel.findByIdAndUpdate(
      id,
      { title, amount, category, description, date },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Data updated", data: updatedData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong on the server!" });
  }
};
