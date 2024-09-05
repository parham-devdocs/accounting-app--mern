import { ResponsivePie } from "@nivo/pie";
import { tokens, useMode } from "../../theme";

const data = [
  {
    id: "sass",
    label: "Sass",
    value: 141,
    color: "hsl(212, 70%, 50%)",
  },
  {
    id: "erlang",
    label: "Erlang",
    value: 543,
    color: "hsl(134, 70%, 50%)",
  },
  {
    id: "make",
    label: "Make",
    value: 274,
    color: "hsl(317, 70%, 50%)",
  },
  {
    id: "elixir",
    label: "Elixir",
    value: 532,
    color: "hsl(185, 70%, 50%)",
  },
  {
    id: "ruby",
    label: "Ruby",
    value: 336,
    color: "hsl(12, 70%, 50%)",
  },
  {
    id: "sass",
    label: "Sass",
    value: 141,
    color: "hsl(212, 70%, 50%)",
  },
  {
    id: "erlang",
    label: "Erlang",
    value: 543,
    color: "hsl(134, 70%, 50%)",
  },
  {
    id: "make",
    label: "Make",
    value: 274,
    color: "hsl(317, 70%, 50%)",
  },
  {
    id: "elixir",
    label: "Elixir",
    value: 532,
    color: "hsl(185, 70%, 50%)",
  },
  {
    id: "ruby",
    label: "Ruby",
    value: 336,
    color: "hsl(12, 70%, 50%)",
  },
];

const MyResponsivePie = () => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
      <ResponsivePie
          
      data={data}
      margin={{ top: 30, right: 70, bottom: 30, left: 70 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.greenAccent[500]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        { match: { id: "ruby" }, id: "dots" },
        { match: { id: "elixir" }, id: "lines" },
      ]}
     
    />
  );
};

export default MyResponsivePie;
