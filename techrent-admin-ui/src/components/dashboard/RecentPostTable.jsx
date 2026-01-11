// src/components/dashboard/RecentPostTable.jsx
import React, { useState } from "react";

const initialPosts = [
  { id: "#RP-1001", customer: "Imran Ali", ভাড়ারমাস: "Jan, 2026", ভাড়া: "$95", যোগাযোগ: "01774102889", status: "Completed", location: "Dhaka" },
  { id: "#RP-1002", customer: "Rahim Uddin", ভাড়ারমাস: "Feb, 2026", ভাড়া: "$120", যোগাযোগ: "01812345678", status: "Pending", location: "Chattogram" },
  { id: "#RP-1003", customer: "Nusrat Jahan", ভাড়ারমাস: "Mar, 2026", ভাড়া: "$80", যোগাযোগ: "01987654321", status: "Completed", location: "Sylhet" },
  { id: "#RP-1004", customer: "Tanvir Hasan", ভাড়ারমাস: "Apr, 2026", ভাড়া: "$150", যোগাযোগ: "01611223344", status: "Canceled", location: "Rajshahi" },
  { id: "#RP-1005", customer: "Farzana Akter", ভাড়ারমাস: "May, 2026", ভাড়া: "$110", যোগাযোগ: "01799887766", status: "Pending", location: "Khulna" },
  { id: "#RP-1006", customer: "Sabbir Hossain", ভাড়ারমাস: "Jun, 2026", ভাড়া: "$90", যোগাযোগ: "01566778899", status: "Completed", location: "Barishal" },
  { id: "#RP-1007", customer: "Ayesha Rahman", ভাড়ারমাস: "Jul, 2026", ভাড়া: "$130", যোগাযোগ: "01833445566", status: "Completed", location: "Cumilla" },
];

const statusStyles = {
  Pending: "bg-blue-50 text-blue-500",
  Completed: "bg-emerald-50 text-emerald-500",
  Canceled: "bg-rose-50 text-rose-500",
};

function RecentPostTable() {
  const [posts, setPosts] = useState(initialPosts);
  const [editingPost, setEditingPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // total pages

  // Delete post
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  // Edit post
  const handleEdit = (post) => {
    setEditingPost(post);
  };

  // Save edited post
  const handleSave = () => {
    setPosts(posts.map((p) => (p.id === editingPost.id ? editingPost : p)));
    setEditingPost(null);
  };

  // Filtered posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || post.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const postsPerPage = 5; // you can change this
  const displayedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-6 rounded-2xl w-full bg-white border border-slate-100 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Recent Posts</h2>
          <p className="text-xs text-slate-400">Latest rent posts</p>
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
          placeholder="Search by customer or location"
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
              <th className="text-left py-2">Post ID</th>
              <th className="text-left py-2">Customer</th>
              <th className="text-left py-2">ভাড়ার মাস</th>
              <th className="text-left py-2">ভাড়া</th>
              <th className="text-left py-2">যোগাযোগ</th>
              <th className="text-left py-2">Location</th>
              <th className="text-right py-2">Status</th>
              <th className="text-right py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {displayedPosts.map((post) => (
              <tr key={post.id} className="text-slate-600">
                <td className="py-2">{post.id}</td>
                <td className="py-2">{post.customer}</td>
                <td className="py-2">{post.ভাড়ারমাস}</td>
                <td className="py-2">{post.ভাড়া}</td>
                <td className="py-2">{post.যোগাযোগ}</td>
                <td className="py-2">{post.location}</td>
                <td className="py-2 text-right">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${
                      statusStyles[post.status]
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="py-2 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-blue-500 hover:underline text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
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
      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Post</h3>
            <div className="space-y-2">
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-sm"
                value={editingPost.customer}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, customer: e.target.value })
                }
                placeholder="Customer Name"
              />
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-sm"
                value={editingPost.ভাড়ারমাস}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, ভাড়ারমাস: e.target.value })
                }
                placeholder="ভাড়ার মাস"
              />
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-sm"
                value={editingPost.ভাড়া}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, ভাড়া: e.target.value })
                }
                placeholder="ভাড়া"
              />
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-sm"
                value={editingPost.যোগাযোগ}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, যোগাযোগ: e.target.value })
                }
                placeholder="যোগাযোগ"
              />
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-sm"
                value={editingPost.location}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, location: e.target.value })
                }
                placeholder="Location"
              />
              <select
                className="w-full border rounded px-2 py-1 text-sm"
                value={editingPost.status}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, status: e.target.value })
                }
              >
                <option>Pending</option>
                <option>Completed</option>
                <option>Canceled</option>
              </select>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setEditingPost(null)}
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

export default RecentPostTable;
