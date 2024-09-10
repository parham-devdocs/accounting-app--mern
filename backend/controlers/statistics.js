import incomeModel from "../models/incomeModel.js";
import expenseModel from "../models/expenseModel.js";
import goalModel from "../models/goalModel.js";
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
  console.log(expenses)
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
  console.log([transformedIncomes, transformedExpenses]);
  res.send([
    { id: "Incomes", color: "#0d73b7", data: transformedIncomes },
    { id: "Expenses", color: "#3bbe76", data: transformedExpenses },
  ]);
};

















export const lastMonthStatistics = async (req, res) => {
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const firstDayOfLastMonth = new Date(
    lastMonth.getFullYear(),
    lastMonth.getMonth(),
    1
  );
  const lastDayOfLastMonth = new Date(
    lastMonth.getFullYear(),
    lastMonth.getMonth() + 1,
    0 // This gives the last day of the last month
  );

  // Getting incomes of last month
  const earnings = await incomeModel.aggregate([
    {
      $match: {
        date: {
          $gte: firstDayOfLastMonth,
          $lt: lastDayOfLastMonth,
        },
      },
    },
    {
      $group: {
        _id: null,
        sum: { $sum: "$amount" },
      },
    },
  ]);

  // Getting expenses of last month
  const expenses = await expenseModel.aggregate([
    {
      $match: {
        date: {
          $gte: firstDayOfLastMonth,
          $lt: lastDayOfLastMonth,
        },
      },
    },
    {
      $group: {
        _id: null,
        sum: { $sum: "$amount" },
      },
    },
  ]);

  // Getting target
  const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)
  const currentYear = new Date().getFullYear();

  const goal = await goalModel.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $eq: [{ $year: "$createdAt" }, currentYear] },
            { $eq: [{ $month: "$createdAt" }, currentMonth] },
          ],
        },
      },
    },
    
    {
      $project: {
        month: { $month: "$createdAt" }, // Get the month from createdAt
        target: 1, // Include target field
        budget: 1, // Include budget field
      },
    },
  ]);
  const remaining_budget = goal[0].budget - expenses[0].sum
  const financial_objective=goal[0].target
  res.send({expenses,earnings,remaining_budget,financial_objective})
};
