// src/components/charts/OrderStatusDonut.jsx
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

// 🔢 Raw values (percentage auto calculate হবে)
const data = [
  { name: "Pending", value: 15, color: "#3B82F6" },
  { name: "Rent Post", value: 30, color: "#6366F1" },
  { name: "Rent", value: 28, color: "#22C55E" },
  { name: "Canceled", value: 10, color: "#EF4444" },
];

// 🔢 Total for percentage calculation
const total = data.reduce((sum, item) => sum + item.value, 0);

// 🔢 Percentage label inside slice (accurate)
const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
  const percent = Math.round((value / total) * 100);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {percent}%
    </text>
  );
};

function OrderStatusDonut() {
  return (
    <div className="w-full h-80 rounded-2xl bg-white border border-slate-100 p-4">
      {/* Title */}
      <h2 className="mb-3 text-sm font-semibold text-slate-800">
        Total Status
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="48%"
            innerRadius={58}
            outerRadius={88}
            paddingAngle={2}
            dataKey="value"
            label={renderLabel}
            labelLine={false}
            stroke="#ffffff"
            strokeWidth={2}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>

          {/* Tooltip */}
          <Tooltip
            formatter={(value, name) => [
              `${Math.round((value / total) * 100)}%`,
              name,
            ]}
            contentStyle={{
              borderRadius: 12,
              borderColor: "#e2e8f0",
              fontSize: 12,
            }}
          />

          {/* Legend */}
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ paddingBottom: 30 }}
            formatter={(value) => (
              <span className="text-xs pb-10  text-black">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrderStatusDonut;
