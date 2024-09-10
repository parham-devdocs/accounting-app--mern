import { Box, Typography } from "@mui/material";
import LineChart from "../components/Statistics/LineChart";
import ChartLayout from "../components/Statistics/ChartLayout";
import { tokens, useMode } from "../theme";
import PieChart from "../components/Statistics/PieChart";
import BarChart from "../components/Statistics/BarChart";
import Card from "../components/Statistics/Card";
import BasicDatePicker from "../components/UI/DatePicker";
import Button from "../components/UI/Button";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import FinancialGoalModal from "../components/Statistics/FinancialGoalModal";
import axios from "axios";
import { toast, Toaster } from "sonner";

const Statistics = () => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const [monthlyReportDate, setMonthlyReportDate] = useState("");
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [aggregatedIncomes, setAggregatedIncomes] = useState([]);
  const [aggregatedExpenses, setAggregatedExpenses] = useState([]);
  const [Expense_vs_Income, setExpense_vs_Income] = useState([]);
  const [saving_target, setSaving_target] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState({
    expenses: [
      {
        
        sum: 0,
      },
    ],
    earnings: [
      {
     
        sum: 0,
      },
    ],
    remaining_budget: 160,
    financial_objective: 200,
  });

  const addGoalHandler = (goalData) => {
    axios
      .post("http://localhost:5000/api/v1/goal", goalData)
      .then(() => {
        toast.success("Financial target successfully added");
      })
      .catch(() => {
        toast.warning("Financial target already exists");
      });

    setShowGoalModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expensesRes, incomesRes, comparisonRes, goalsRes, reportRes] =
          await Promise.all([
            axios.get(
              "http://localhost:5000/api/v1/transactions/aggregate-expenses"
            ),
            axios.get(
              "http://localhost:5000/api/v1/transactions/aggregate-incomes"
            ),
            axios.get("http://localhost:5000/api/v1/statistics/comparison"),
            axios.get("http://localhost:5000/api/v1/goal"),
            axios.get(
              "http://localhost:5000/api/v1/statistics/lastMonthStatistics"
            ),
          ]);

        setAggregatedExpenses(expensesRes.data.message);
        setAggregatedIncomes(incomesRes.data.message);
        setExpense_vs_Income(comparisonRes.data);
        setSaving_target(goalsRes.data.message);
        setMonthlyReport(reportRes.data);
        console.log(Expense_vs_Income);

      } catch (err) {
        console.error(err);
      }
    };
console.log(Expense_vs_Income)
    fetchData();
  }, []);
console.log(monthlyReport?.earnings[0]?.sum)
  return (
    <Box
      minHeight="500px"
      width="100vw"
      borderRadius={10}
      padding={3}
      display="flex"
      gap={2}
      flexWrap="wrap"
    >
      <ChartLayout minWidth="600px" height="400px" header="Expenses vs Incomes">
        <LineChart xAxis="Months" yAxis="Amount" data={Expense_vs_Income} />
      </ChartLayout>
      <ChartLayout minWidth="400px" height="400px" header="Expenses">
        <PieChart data={aggregatedExpenses} />
      </ChartLayout>
      <ChartLayout minWidth="400px" height="400px" header="Incomes">
        <PieChart data={aggregatedIncomes} />
      </ChartLayout>
      <ChartLayout minWidth="600px" height="400px">
        <ChartLayout
          padding={1}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          header="Financial Goals"
        >
          <Box display="flex" gap={2} alignItems="center">
            <Button
              color={colors.greenAccent[500]}
              bgColor={colors.primary[500]}
              hoverBgColor={colors.greenAccent[200]}
              borderColor={colors.greenAccent[500]}
              borderRadius="9px"
              hovercolor={colors.primary[500]}
              onClick={() => { setShowGoalModal(true),console.log(showGoalModal) }}
            >
              <Typography variant="h5">Set a Goal</Typography>
            </Button>
          </Box>
        </ChartLayout>
        <BarChart data={saving_target} />
      </ChartLayout>
      <ChartLayout
        display="grid"
        flexDirection="column"
        gap={1}
        width="820px"
        padding={1}
      >
        <ChartLayout
          padding={1}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          header="Monthly Report"
        >
          <Box display="flex" gap={2} alignItems="center">
            <Button
              color={colors.greenAccent[500]}
              bgColor={colors.primary[500]}
              hoverBgColor={colors.greenAccent[200]}
              borderColor={colors.greenAccent[500]}
              borderRadius="9px"
              hovercolor={colors.primary[500]}
              onClick={() => console.log(monthlyReportDate)}
            >
              <Typography variant="h6">
                <SearchIcon />
              </Typography>
            </Button>
            <BasicDatePicker
              views={["month", "year"]}
              onDateChangeHandler={(e) => setMonthlyReportDate(e.$d)}
            />
          </Box>
        </ChartLayout>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1}>
          <ChartLayout padding={1}>
            <Card
              header="Total Earnings"
              amount={monthlyReport?.earnings[0]?.sum}
              textColor="green"
            />
          </ChartLayout>
          <ChartLayout padding={1}>
            <Card
              header="Total Expenditures"
              amount={monthlyReport?.expenses[0]?.sum}
              textColor={colors.redAccent[500]}
            />
          </ChartLayout>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1}>
          <ChartLayout padding={1}>
            <Card
              header="Financial Objective"
              amount={monthlyReport?.financial_objective}
              textColor={colors.primary[100]}
            />
          </ChartLayout>
          <ChartLayout padding={1}>
            <Card
              header="Remaining Budget"
              amount={monthlyReport?.remaining_budget}
              textColor={colors.primary[100]}
            />
          </ChartLayout>
        </Box>
      </ChartLayout>
      <FinancialGoalModal
        onCloseModalHandler={()=>setShowGoalModal(false)}
        handleFormSubmit={addGoalHandler}
        showModal={showGoalModal}
      />
      <Toaster />
    </Box>
  );
};

export default Statistics;
