import { getColor } from "../../functions/colors";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    let { name, Verified, NotVerified } = { ...payload[0].payload };
    return (
      <div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white shadow-lg rounded-lg p-2 text-xs">
        <div className="font-bold">{name}</div>
        <div>
          <span className="font-bold">Verified: </span>
          <span className="font-normal">{Verified}</span>
        </div>
        <div>
          <span className="font-bold">Not Verified: </span>
          <span className="font-normal">{NotVerified}</span>
        </div>
      </div>
    );
  }
  return null;
};

export const Line1 = ({ payload }) => {
  let colors = [
    { dataKey: "Verified", stroke: getColor("bg-green-400") },
    { dataKey: "NotVerified", stroke: getColor("bg-red-400") },
  ];
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
  const data = Array.from(labels).map((i) => {
    return {
      name: i,
      Verified: payload?.verified ? payload?.verified[i] : 0,
      NotVerified: payload?.notverified ? payload?.notverified[i] : 0,
    };
  });

  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} width={30} />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} iconType="circle" />
          {colors.map((color, i) => (
            <Line
              key={i}
              type="monotone"
              dataKey={color.dataKey}
              stroke={color.stroke}
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
