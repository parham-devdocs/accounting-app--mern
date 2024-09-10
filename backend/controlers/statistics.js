import incomeModel from "../models/incomeModel.js";
import expenseModel from "../models/expenseModel.js";

export const compare_expenses_incomes = async (req, res) => {
  const date = new Date();
  const incomes = await incomeModel.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $year: "$date" }, date.getFullYear()], // Filter for the current year
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
        },
        averageIncome: { $avg: "$amount" },
      },
    },
  ]);
  const expenses = await expenseModel.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $year: "$date" }, date.getFullYear()], // Filter for the current year
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
        },
        averageIncome: { $avg: "$amount" },
      },
    },
  ]);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const transformedIncomes = [];
  incomes.map((item) => {
    transformedIncomes.push({
      x: monthNames[item._id.month - 1],
      y: item.averageIncome,
    });
  });
  const transformedExpenses = [];
  expenses.map((item) => {
    transformedExpenses.push({
      x: monthNames[item._id.month - 1],
      y: item.averageIncome,
    });
  });
  console.log(object)
  res.send([
    { id: "Incomes", color: "#0d73b7", data: transformedIncomes },
    { id: "Expenses", color: "#3bbe76", data: transformedExpenses },
  ]);
};
