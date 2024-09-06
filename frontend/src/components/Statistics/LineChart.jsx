import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
const data = [
  {
    id: "Expenses",
    color: "#3bbe76",
    data: [
      {
        x: "Jan",
        y: 87,
      },
      {
        x: "Feb",
        y: 109,
      },
      {
        x: "Mar",
        y: 66,
      },
      {
        x: "Apr",
        y: 220,
      },
      {
        x: "May",
        y: 79,
      },
      {
        x: "Jun",
        y: 104,
      },
      {
        x: "Jul",
        y: 46,
      },
      {
        x: "Aug",
        y: 228,
      },
      {
        x: "Sept",
        y: 69,
      },
      {
        x: "Oct",
        y: 36,
      },
      {
        x: "Nov",
        y: 63,
      },
      {
        x: "Dec",
        y: 252,
      },
    ],
  },
  {
    id: "Incomes",
    color: "#0d73b7",
    data: [
      {
        x: "Jan",
        y: 87,
      },
      {
        x: "Feb",
        y: 109,
      },
      {
        x: "Mar",
        y: 66,
      },
      {
        x: "Apr",
        y: 220,
      },
      {
        x: "May",
        y: 79,
      },
      {
        x: "Jun",
        y: 104,
      },
      {
        x: "Jul",
        y: 46,
      },
      {
        x: "Aug",
        y: 228,
      },
      {
        x: "Sept",
        y: 69,
      },
      {
        x: "Oct",
        y: 36,
      },
      {
        x: "Nov",
        y: 63,
      },
      {
        x: "Dec",
        y: 252,
      },
    ],
  },
];
const MyResponsiveLine = ({ xAxis, yAxis }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <ResponsiveLine
        colors={[colors.blueAccent[500],colors.greenAccent[500]]}
        data={data}
        margin={{ top: 20, right: 70, bottom: 50, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        enableArea={true}
        areaOpacity={0.05}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: xAxis,
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: yAxis,
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
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
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 1,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default MyResponsiveLine;
