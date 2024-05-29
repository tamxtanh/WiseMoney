import React from "react";
import { View, Text as RNText } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { Text, Image } from "react-native-svg";
import { COLORS, SIZES } from "../../constants";
import { FullPieChartData } from "./interface";
import G from "react-native-svg";

class DonutChart extends React.PureComponent<{ data: FullPieChartData }> {
  render() {
    const { data } = this.props;

    // Darker colors
    const pastelColors = [
      "#DCE775", // Light lime
      "#FFB74D", // Orange
      "#4DB6AC", // Light teal
      "#BA68C8", // Medium purple
      "#81C784", // Medium green
      "#FF8A65", // Deep orange
      "#FFD54F", // Amber
      "#F06292", // Light pink
      "#E57373", // Light red
      "#9575CD", // Medium indigo
      "#7986CB", // Light blue
      "#64B5F6", // Medium blue
      "#81C784", // Medium green
      "#A1887F", // Brown
    ]; // Add more dark colors if needed

    // Calculate the total
    const total = data.list.reduce((sum, item) => sum + item.value, 0);
    const threshold = total * 0.1; // Ngưỡng là 10% của tổng giá trị

    let dataWithKeysAndColors;

    if (data.list.length <= 5) {
      dataWithKeysAndColors = data.list.map((item, index) => ({
        ...item,
        key: `pie-item-${index}`,
        svg: { fill: pastelColors[index % pastelColors.length] },
      }));
    } else {
      // Lọc ra các thành phần có phần trăm nhỏ hơn 10%
      const filteredData = data.list.filter(
        (item) => item.value / total >= 0.1
      );

      // Tính tổng giá trị của các thành phần có phần trăm nhỏ hơn 10%
      const otherTotal = data.list.reduce((sum, item) => {
        if (item.value / total < 0.1) {
          return sum + item.value;
        }
        return sum;
      }, 0);

      // Thêm một mục mới cho 'Other' nếu có các thành phần có phần trăm nhỏ hơn 10%
      if (otherTotal > 0) {
        filteredData.push({
          name: "Other",
          value: otherTotal,
          image_url: "", // Đặt URL hình ảnh phù hợp cho danh mục 'Other' nếu cần
        });
      }

      // Tạo keys và màu cho mỗi thành phần đã lọc
      dataWithKeysAndColors = filteredData.map((item, index) => ({
        ...item,
        key: `pie-item-${index}`,
        svg: { fill: pastelColors[index % pastelColors.length] },
      }));
    }

    const Labels = ({ slices }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, data } = slice;
        const labelAngle =
          Math.atan2(labelCentroid[1], labelCentroid[0]) + Math.PI / 2;

        const imageUrl =
          data.image_url || require("../../assets/images/three-dots.png");

        return (
          <G key={index}>
            <Image
              transform={`translate(${labelCentroid[0] - 10}, ${
                labelCentroid[1] - 10
              })`}
              width={22} // Width of the image
              height={22} // Height of the image
              href={imageUrl} // Image URL
            />
            <Text
              transform={`translate(${labelCentroid[0] + 3}, ${
                labelCentroid[1] + 20
              })`}
              fill={COLORS.textColor1}
              textAnchor={"middle"}
              alignmentBaseline={"center"}
              fontSize={12}
            >
              {`${((data.value / total) * 100).toFixed(1)}%`}
            </Text>
          </G>
        );
      });
    };

    return (
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <PieChart
          //style={{ height: data.height }}
          valueAccessor={({ item }) => item.value}
          data={dataWithKeysAndColors}
          style={{ height: 400 }}
          padAngle={0}
          labelRadius={"75%"}
          spacing={0}
          outerRadius={"55%"} // Adjust outer radius as needed
          innerRadius={"30%"} // Adjust inner radius to create the donut effect
          key={({ item }) => item.key}
        >
          <Labels />
        </PieChart>
      </View>
    );
  }
}

export default DonutChart;
