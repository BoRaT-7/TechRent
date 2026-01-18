// src/components/charts/RevenueLineChart.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "জানু", rent: 320, rentPost: 260 },
  { month: "ফেব", rent: 450, rentPost: 300 },
  { month: "মার্চ", rent: 520, rentPost: 380 },
  { month: "এপ্রি", rent: 680, rentPost: 420 },
  { month: "মে", rent: 610, rentPost: 440 },
  { month: "জুন", rent: 720, rentPost: 500 },
  { month: "জুলা", rent: 840, rentPost: 560 },
];

// ✨ Premium Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white/90 backdrop-blur-md shadow-lg px-4 py-2 text-xs">
        <p className="font-semibold text-slate-700 mb-1">{label}</p>
        <p className="text-sky-600">
          ● Rent: <span className="font-semibold">{payload[0].value}</span>
        </p>
        <p className="text-indigo-600">
          ● Rent Post:{" "}
          <span className="font-semibold">{payload[1].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

function RevenueLineChart() {
  return (
    <div className="relative w-full h-80 rounded-3xl border border-white/40 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-5 shadow-xl backdrop-blur-xl">
      
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-800">
            Revenue Analytics
          </h2>
          <p className="text-xs text-slate-400">
            Rent & Rent Post performance
          </p>
        </div>

        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-600">
          Monthly
        </span>
      </div>

      {/* Chart */}
      <ResponsiveContainer 
      width="100%" 
      height="100%"
      minWidth = {0}
      minHeight={200}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: -15, bottom: 0 }}
        >
          <defs>
            {/* Gradient */}
            <linearGradient id="rentGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.2} />
            </linearGradient>

            <linearGradient id="postGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            className="stroke-slate-200/60"
          />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "#64748b" }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "#64748b" }}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* Rent Line */}
          <Line
            type="monotone"
            dataKey="rent"
            stroke="url(#rentGradient)"
            strokeWidth={3}
            dot={{ r: 4, fill: "#0ea5e9", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 7 }}
          />

          {/* Rent Post Line */}
          <Line
            type="monotone"
            dataKey="rentPost"
            stroke="url(#postGradient)"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-6 text-xs font-medium">
        <div className="flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sky-700">
          <span className="h-2.5 w-2.5 rounded-full bg-sky-500"></span>
          Rent 
        </div>

        <div className="flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-indigo-700">
          <span className="h-2.5 w-2.5 rounded-full bg-indigo-500"></span>
          Rent Post
        </div>
      </div>
    </div>
  );
}

export default RevenueLineChart;
