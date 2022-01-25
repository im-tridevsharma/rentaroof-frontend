import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Bar1 = ({ yeardata }) => {
  let colors = [{ dataKey: "earnings", fill: "var(--blue)" }];
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = Array.from(Array(12).keys()).map((i) => {
    return {
      name: labels[i],
      earnings: yeardata ? yeardata[labels[i]] : 0,
    };
  });

  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          <XAxis dataKey="name" axisLine={false} tickLine={true} />
          <YAxis axisLine={true} tickLine={true} width={30} />
          <Tooltip cursor={{ fill: "transparent" }} />
          {colors.map((color, i) => (
            <Bar
              key={i}
              barSize={20}
              dataKey={color.dataKey}
              fill={color.fill}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bar1;
