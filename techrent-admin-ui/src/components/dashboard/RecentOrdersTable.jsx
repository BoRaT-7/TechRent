// src/components/dashboard/RecentOrdersTable.jsx
import React, { useState } from "react";

const initialOrders = [
  { id: "#TR-1022", customer: "Imran Ali", rent: "বাড়ি ভাড়া", date: "Jan 09, 2026", amount: "$95", status: "Completed", location: "Dhaka" },
  { id: "#TR-1023", customer: "Rahim Uddin", rent: "দোকান ভাড়া", date: "Jan 10, 2026", amount: "$120", status: "Completed", location: "Chattogram" },
  { id: "#TR-1024", customer: "Nusrat Jahan", rent: "রুমমেট", date: "Jan 11, 2026", amount: "$80", status: "Pending", location: "Sylhet" },
  { id: "#TR-1025", customer: "Tanvir Hasan", rent: "বাড়ি ভাড়া", date: "Jan 12, 2026", amount: "$150", status: "Completed", location: "Rajshahi" },
  { id: "#TR-1026", customer: "Farzana Akter", rent: "হোস্টেল", date: "Jan 13, 2026", amount: "$110", status: "Canceled", location: "Khulna" },
  { id: "#TR-1027", customer: "Sabbir Hossain", rent: "অফিস ভাড়া", date: "Jan 14, 2026", amount: "$90", status: "Pending", location: "Barishal" },
  { id: "#TR-1028", customer: "Ayesha Rahman", rent: "বাড়ি ভাড়া", date: "Jan 15, 2026", amount: "$130", status: "Completed", location: "Cumilla" },
];

const statusStyles = {
  Pending: "bg-blue-50 text-blue-500",
  Completed: "bg-emerald-50 text-emerald-500",
  Canceled: "bg-rose-50 text-rose-500",
};

function RecentOrdersTable() {
  const [orders, setOrders] = useState(initialOrders);
  const [editingOrder, setEditingOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // total pages

  // Delete order
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  // Edit order
  const handleEdit = (order) => {
    setEditingOrder(order);
  };

  // Save edited order
  const handleSave = () => {
    setOrders(orders.map((o) => (o.id === editingOrder.id ? editingOrder : o)));
    setEditingOrder(null);
  };

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.rent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const ordersPerPage = 5; // show 5 orders per page
  const displayedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="mt-4 rounded-2xl w-full bg-white border border-slate-100 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Recent Orders</h2>
          <p className="text-xs text-slate-400">Latest rent bookings</p>
        </div>
        <div>
          <button className="bg-blue-400 text-white px-2 rounded hover:bg-blue-600">
            See All
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <input
          type="text"
          placeholder="Search by customer, rent type, or location"
          className="border rounded px-3 py-1 text-sm flex-1 min-w-[200px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border rounded px-3 py-1 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Customer</th>
              <th className="text-left py-2">Rent Type</th>
              <th className="text-left py-2">Location</th>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-right py-2">Status</th>
              <th className="text-right py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {displayedOrders.map((order) => (
              <tr key={order.id} className="text-slate-600">
                <td className="py-2">{order.id}</td>
                <td className="py-2">{order.customer}</td>
                <td className="py-2">{order.rent}</td>
                <td className="py-2">{order.location}</td>
                <td className="py-2">{order.date}</td>
                <td className="py-2">{order.amount}</td>
                <td className="py-2 text-right">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(order)}
                    className="text-blue-500 hover:underline text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="text-red-500 hover:underline text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-1">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded text-sm border ${
              currentPage === i + 1
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Edit Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Order</h3>
            <div className="space-y-2">
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-sm"
                value={editingOrder.customer}
                onChange={(e) =>
                  setEditingOrder({ ...editingOrder, customer: e.target.value })
                }
                placeholder="Customer Name"
              />
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-sm"
                value={editingOrder.rent}
                onChange={(e) =>
                  setEditingOrder({ ...editingOrder, rent: e.target.value })
                }
                placeholder="Rent Type"
              />
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-sm"
                value={editingOrder.location}
                onChange={(e) =>
                  setEditingOrder({ ...editingOrder, location: e.target.value })
                }
                placeholder="Location"
              />
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-sm"
                value={editingOrder.date}
                onChange={(e) =>
                  setEditingOrder({ ...editingOrder, date: e.target.value })
                }
                placeholder="Date"
              />
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-sm"
                value={editingOrder.amount}
                onChange={(e) =>
                  setEditingOrder({ ...editingOrder, amount: e.target.value })
                }
                placeholder="Amount"
              />
              <select
                className="w-full border rounded px-2 py-1 text-sm"
                value={editingOrder.status}
                onChange={(e) =>
                  setEditingOrder({ ...editingOrder, status: e.target.value })
                }
              >
                <option>Pending</option>
                <option>Completed</option>
                <option>Canceled</option>
              </select>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setEditingOrder(null)}
                className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecentOrdersTable;
