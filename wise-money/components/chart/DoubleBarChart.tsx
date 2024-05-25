import React from "react";
import { View, Text as RNText } from "react-native";
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { Defs, ClipPath, Rect, G } from "react-native-svg";
import { Text } from "react-native-svg";
import { COLORS, SIZES } from "../../constants";
import FullChartData from "./interface";
import { scaleLinear } from "d3-scale";

class DoubleBarChart extends React.PureComponent<{ data: FullChartData }> {
  render() {
    const { data } = this.props;

    const defaultColor = data.defaultColor;

    const Labels = ({ x, y, bandwidth, data }) =>
      data.map((item, index) => (
        <G key={index}>
          <Text
            x={x(index) + bandwidth / 2}
            y={y(item.value) - 20}
            fontSize={14}
            fill={item.svg ? item.svg.fill : defaultColor}
            alignmentBaseline={"middle"}
            textAnchor={"middle"}
          >
            {item.value
              ? item.value?.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })
              : "None"}
          </Text>
          {item.value ? (
            <Rect
              x={x(index)}
              y={y(item.value) - 8} // Subtract Height / 2 to make half of the Rect above the bar
              rx={8} // Set to Height / 2
              ry={8} // Set to Height / 2
              width={bandwidth}
              height={20} // Height of the Rect
              fill={item.svg ? item.svg.fill : defaultColor}
            />
          ) : null}
        </G>
      ));

    return (
      <View style={{ flexDirection: "row", width: "90%", alignSelf: "center" }}>
        <YAxis
          data={data.list}
          contentInset={{ top: 0, bottom: 0 }}
          svg={{
            fill: COLORS.textColor3,
            fontSize: 14,
          }}
          yAccessor={({ item }) => item.value}
          scale={scaleLinear}
          numberOfTicks={5}
          formatLabel={(value) => `${Math.round(value / 1000000)}M`} // round the value
        />

        <View style={{ flex: 1 }}>
          <BarChart
            style={{ height: data.height }}
            data={data.list}
            svg={{ fill: defaultColor }}
            contentInset={{ top: 50, bottom: 10 }}
            spacingInner={0.3}
            bandwidth={10}
            spacing={0.2}
            gridMin={0}
            yAccessor={({ item }) => item.value}
            barBorderRadius={4}
          >
            <Grid />
            <Labels />
          </BarChart>
          <XAxis
            data={data.list.map((_, index) => index)} // array of numbers
            formatLabel={(value, index) => data.list[index].name} // display the names
            contentInset={{
              left: (SIZES.width * 0.9 - 50) / (2 * data.list.length),
              right: (SIZES.width * 0.9 - 50) / (2 * data.list.length),
            }}
            svg={{
              fontSize: 14,
              fill: COLORS.textColor3,
            }}
          />
        </View>
      </View>
    );
  }
}

export default DoubleBarChart;
