import { ResponsiveBar } from "@nivo/bar";
import { tokens, useMode } from "../../theme";

const BarChart = ({ data }) => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  return (
    <ResponsiveBar
      data={data}
      keys={["target","saving"]}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={[
        "#3498db", // Blue
        "#2ecc71", // Green
        colors.blueAccent[500],
        colors.greenAccent[500],
        "#1abc9c", // Teal
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.greenAccent[500],
            },
          },
          ticks: {
            line: {
              stroke: colors.greenAccent[500],
              strokeWidth: 1,
            },
            text: {
              fill: colors.greenAccent[500],
            },
          },
        },
        legends: {
          text: {
            fill: colors.greenAccent[500],
          },
        },
        tooltip: {
          container: {
            color: colors.greenAccent[500],
          },
        },
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "month",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
        tickTextColor: colors.greenAccent[500], // Change bottom axis text color here
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "value",
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          itemTextColor: [colors.greenAccent[500]], // Change legend text color here
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  );
};

export default BarChart;
