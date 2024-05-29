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

    const error = console.error;
    console.error = (...args: any) => {
      if (/defaultProps/.test(args[0])) return;
      error(...args);
    };

    const defaultColor = data.defaultColor;

    // Calculate the maximum value in the data list
    const maxValue = Math.max(...data.list.map((item) => item.value));

    const formatValueLabel = (value) => {
      if (value >= 1000000) {
        return `${(value / 1000000).toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}M`;
      } else if (value >= 1000) {
        return `${(value / 1000).toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}K`;
      }
      return value.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    };

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
              y={y(item.value) - 5} // Subtract Height / 2 to make half of the Rect above the bar
              rx={5} // Set to Height / 2
              ry={5} // Set to Height / 2
              width={bandwidth}
              height={20} // Height of the Rect
              fill={item.svg ? item.svg.fill : defaultColor}
            />
          ) : null}
        </G>
      ));

    return (
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          width: "90%",
          alignSelf: "center",
        }}
      >
        <YAxis
          data={data.list}
          contentInset={{ top: 50, bottom: 30 }}
          svg={{
            fill: COLORS.textColor3,
            fontSize: 14,
          }}
          yAccessor={({ item }) => item.value}
          scale={scaleLinear}
          numberOfTicks={7}
          min={0}
          max={maxValue}
          formatLabel={formatValueLabel} // format the label
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
          {data.list.length <= 2 ? (
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
          ) : (
            <View style={{ height: 90 }}>
              {/* Adjust this value to set the height of the XAxis */}
              <XAxis
                style={{ flex: 1 }}
                data={data.list.map((_, index) => index)} // array of numbers
                formatLabel={(value, index) => data.list[index].name} // display the names
                contentInset={{
                  left: (SIZES.width * 0.9 - 50) / (2 * data.list.length),
                  right: (SIZES.width * 0.9 - 50) / (2 * data.list.length),
                }}
                svg={{
                  fontSize: 10,
                  fill: COLORS.textColor3,
                  rotation: -60,
                  originY: 50,
                  y: 40,
                }}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default DoubleBarChart;
