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

interface PieChartData {
  value: number;
  name: string;
  image_url: string;
}

// FullPieChartData interface with list of PieChartData
export interface FullPieChartData {
  height: number; // Pie chart should be 300
  list: PieChartData[];
}

export default interface DoubleChartData {
  value: number;
  label: string;
  spacing: number;
  labelWidth: number;
  labelTextStyle: { color: string };
  frontColor: string;
}
