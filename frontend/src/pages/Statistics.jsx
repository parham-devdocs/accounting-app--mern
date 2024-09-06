import { Box, colors } from "@mui/material";
import LineChart from "../components/Statistics/LineChart";
import ChartLayout from "../components/Statistics/ChartLayout";
import { tokens, useMode } from "../theme";
import PieChart from "../components/Statistics/PieChart";
import { expensesPie,incomesPie } from "./data";
const Statistics = () => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);

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
      <ChartLayout minWidth="400px" height="400px" header="Expenses" >
        <PieChart data={expensesPie} />
      </ChartLayout>
      <ChartLayout minWidth="400px" height="400px" header="Incomes">
        <PieChart data={incomesPie}  />
      </ChartLayout>
     
    </Box>
  );
};

export default Statistics;
