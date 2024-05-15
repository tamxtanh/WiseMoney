export default interface ChartData {
  value: number;
  name: string;
  color: string;
}

export default interface FullChartData {
  title: string;
  height: number; // Pie chart should be 300
  list: ChartData[];
}
