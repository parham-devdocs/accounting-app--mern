import { ResponsivePie } from "@nivo/pie";
import { tokens, useMode } from "../../theme";

const MyResponsivePie = ({ data }) => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsivePie
      animate={true}
      motionConfig="gentle"
      transitionMode="innerRadius"
      colors={[
        "#3498db", // Blue
        "#2ecc71", // Green
        colors.blueAccent[500],
        colors.greenAccent[500],
        "#1abc9c", // Teal
      ]}
      data={data}
      margin={{ top: 30, right: 70, bottom: 30, left: 70 }}
      innerRadius={0.6}
      padAngle={0.7}
      cornerRadius={2}
      activeOuterRadiusOffset={20}
      borderWidth={2}
      borderColor={{ from: "color", modifiers: [["darker", 0.1]] }}
      arcLinkLabelsSkipAngle={5}
      arcLinkLabelsTextColor={colors.greenAccent[500]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 20]] }}
    />
  );
};

export default MyResponsivePie;
