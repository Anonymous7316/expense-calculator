import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function App({data}) {
  return (
    <ComposedChart
      layout="vertical"
      width={417}
      height={345}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Bar dataKey="amt" barSize={20} fill="#413ea0" />
    </ComposedChart>
  );
}