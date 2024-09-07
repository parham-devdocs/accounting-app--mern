import { Box,Typography} from "@mui/material";
import LineChart from "../components/Statistics/LineChart";
import ChartLayout from "../components/Statistics/ChartLayout";
import { tokens, useMode } from "../theme";
import PieChart from "../components/Statistics/PieChart";
import {  expensesPie, goalsBar, incomesPie } from "./data";
import BarChart from "../components/Statistics/BarChart";
import Card from "../components/Statistics/Card";
import BasicDatePicker from "../components/UI/DatePicker";
import Button from "../components/UI/Button";
import  SearchIcon  from '@mui/icons-material/Search';
import { useState } from "react";
import FinancialGoal from "../components/UI/FinancialGoal";
import axios from 'axios';
import { toast,Toaster } from "sonner";
const Statistics = () => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const [monthlyReportDate, setMonthlyReportDat] = useState('')
  const [showGoalModal, setShowGoalMedal] = useState(false)
  const addGoalHandler = (e) => {
    
    axios.post("http://localhost:5000/api/v1/goal", e)
      .then((res) => {
        toast.success("financial target  suuccessfuly added")
      })
      .catch((err) => {
      toast.warning("financial target already exists")
    })
  
    setShowGoalMedal(false)
  }
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
        <LineChart xAxis="Months" yAxis="Amount" />
      </ChartLayout>
      <ChartLayout minWidth="400px" height="400px" header="Expenses">
        <PieChart data={expensesPie} />
      </ChartLayout>
      <ChartLayout minWidth="400px" height="400px" header="Incomes">
        <PieChart data={incomesPie} />
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
              onClick={() => setShowGoalMedal(true)}
            >
              <Typography variant="h5">set a goal</Typography>
            </Button>
          </Box>
        </ChartLayout>
        <BarChart data={goalsBar} />
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
          header="Monthly report"
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
              {" "}
              <Typography variant="h6">
                <SearchIcon />
              </Typography>
            </Button>
            <BasicDatePicker
              views={["month", "year"]}
              onDateChangeHandler={(e) => setMonthlyReportDat(e.$d)}
            />
          </Box>
        </ChartLayout>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1}>
          <ChartLayout padding={1}>
            <Card header="Total Earnings" amount="500" textColor="green" />
          </ChartLayout>
          <ChartLayout padding={1}>
            <Card
              header="Total Expenditures"
              amount="600"
              textColor={colors.redAccent[500]}
            />
          </ChartLayout>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1}>
          <ChartLayout padding={1}>
            <Card
              header="Financial Objective"
              amount="200"
              textColor={colors.primary[100]}
            />
          </ChartLayout>
          <ChartLayout padding={1}>
            <Card
              header="Remaining Budget"
              amount="350"
              textColor={colors.primary[100]}
            />
          </ChartLayout>
        </Box>
      </ChartLayout>
      <FinancialGoal
        showModal={showGoalModal}
        handleFormSubmit={addGoalHandler}
        onCloseModalHandler={() => setShowGoalMedal((prev) => !prev)}
      />
      <Toaster
        position="bottom-right"
        
        expand
        richColors
      />{" "}
    </Box>
  );
};

export default Statistics;
