export default interface ChartData {
  value: number;
  name: string;
  svg: { fill: string };
}

export default interface FullChartData {
  defaultColor: string;
  height: number; // Pie chart should be 300
  list: ChartData[];
}

export default interface DoubleChartData {
  value: number;
  label: string;
  spacing: number;
  labelWidth: number;
  labelTextStyle: { color: string };
  frontColor: string;
}
