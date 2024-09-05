import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
const data=[
  {
    id: "japan",
    color: "hsl(336, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 87,
      },
      {
        x: "helicopter",
        y: 109,
      },
      {
        x: "boat",
        y: 66,
      },
      {
        x: "train",
        y: 220,
      },
      {
        x: "subway",
        y: 79,
      },
      {
        x: "bus",
        y: 104,
      },
      {
        x: "car",
        y: 46,
      },
      {
        x: "moto",
        y: 228,
      },
      {
        x: "bicycle",
        y: 69,
      },
      {
        x: "horse",
        y: 36,
      },
      {
        x: "skateboard",
        y: 63,
      },
      {
        x: "others",
        y: 252,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(149, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 0,
      },
      {
        x: "helicopter",
        y: 211,
      },
      {
        x: "boat",
        y: 97,
      },
      {
        x: "train",
        y: 49,
      },
      {
        x: "subway",
        y: 119,
      },
      {
        x: "bus",
        y: 283,
      },
      {
        x: "car",
        y: 22,
      },
      {
        x: "moto",
        y: 289,
      },
      {
        x: "bicycle",
        y: 234,
      },
      {
        x: "horse",
        y: 239,
      },
      {
        x: "skateboard",
        y: 294,
      },
      {
        x: "others",
        y: 165,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(125, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 76,
      },
      {
        x: "helicopter",
        y: 103,
      },
      {
        x: "boat",
        y: 222,
      },
      {
        x: "train",
        y: 206,
      },
      {
        x: "subway",
        y: 219,
      },
      {
        x: "bus",
        y: 67,
      },
      {
        x: "car",
        y: 142,
      },
      {
        x: "moto",
        y: 139,
      },
      {
        x: "bicycle",
        y: 119,
      },
      {
        x: "horse",
        y: 151,
      },
      {
        x: "skateboard",
        y: 1,
      },
      {
        x: "others",
        y: 147,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(86, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 77,
      },
      {
        x: "helicopter",
        y: 207,
      },
      {
        x: "boat",
        y: 168,
      },
      {
        x: "train",
        y: 270,
      },
      {
        x: "subway",
        y: 195,
      },
      {
        x: "bus",
        y: 22,
      },
      {
        x: "car",
        y: 44,
      },
      {
        x: "moto",
        y: 181,
      },
      {
        x: "bicycle",
        y: 41,
      },
      {
        x: "horse",
        y: 134,
      },
      {
        x: "skateboard",
        y: 266,
      },
      {
        x: "others",
        y: 203,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(126, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 156,
      },
      {
        x: "helicopter",
        y: 299,
      },
      {
        x: "boat",
        y: 260,
      },
      {
        x: "train",
        y: 136,
      },
      {
        x: "subway",
        y: 29,
      },
      {
        x: "bus",
        y: 99,
      },
      {
        x: "car",
        y: 258,
      },
      {
        x: "moto",
        y: 237,
      },
      {
        x: "bicycle",
        y: 296,
      },
      {
        x: "horse",
        y: 15,
      },
      {
        x: "skateboard",
        y: 184,
      },
      {
        x: "others",
        y: 115,
      },
    ],
  },
];
const MyResponsiveLine = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    return (
      <>
        
        <ResponsiveLine
          data={data}
          margin={{ top: 20, right: 70, bottom: 50, left: 30 }}
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
            legend: "transportation",
            legendOffset: 36,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
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
                  fill: colors.grey[100],
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
              itemOpacity: 0.75,
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
