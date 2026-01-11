// src/pages/Dashboard.jsx
import RevenueLineChart from "../components/charts/RevenueLineChart";
import OrderStatusDonut from "../components/charts/OrderStatusDonut";
import StatCards from "../components/dashboard/StatCards";
import RecentOrdersTable from "../components/dashboard/RecentOrdersTable";
import RecentPostTable from "../components/dashboard/RecentPostTable";

function Dashboard() {
  return (
    <div className="space-y-4">
      <StatCards></StatCards>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-4">
        <RevenueLineChart />
        <OrderStatusDonut />
        
      </div>
      <RecentOrdersTable></RecentOrdersTable>
      <RecentPostTable></RecentPostTable>
    </div>
  );
}

export default Dashboard;
