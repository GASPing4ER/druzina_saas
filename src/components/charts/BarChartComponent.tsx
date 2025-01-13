"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarChartComponent = ({
  data,
  x_axis,
}: {
  data:
    | { project_name: string; total_hours: number }[]
    | { user_name: string; total_hours: number }[];
  x_axis: string;
}) => {
  return (
    <ResponsiveContainer width={500} height={300} className="border p-10">
      <BarChart
        width={150}
        height={40}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend
          layout="horizontal"
          wrapperStyle={{
            position: "absolute",
            display: "flex",
            justifyContent: "end",
            top: -25, // 20px from the top of the container
            right: -30, // 30px from the right
            fontSize: "14px", // Custom font size
            textAlign: "right",
          }}
        />
        <ReferenceLine y={0} stroke="#000" />
        <Bar
          dataKey={`total_hours`}
          fill="#AB7952"
          name="Opravljene ure"
          barSize={30}
        />
        <XAxis dataKey={`${x_axis}`} dy={10} />
        <YAxis dx={-10} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
