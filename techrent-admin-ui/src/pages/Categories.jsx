// src/pages/Categories.jsx
import React, { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoryApi";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ ক্যাটাগরি লিস্ট লোড
  const loadCategories = async () => {
    try {
      const res = await getCategories();
      // Swagger রেসপন্স: { code, message, body: [...] }
      setCategories(res.data?.body || []);
    } catch (err) {
      console.error("Category list load error", err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // ✅ Create / Update সাবমিট
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description || "");

    try {
      setLoading(true);

      if (editId) {
        await updateCategory(editId, formData);
      } else {
        await createCategory(formData);
      }

      setName("");
      setDescription("");
      setEditId(null);
      await loadCategories();
    } catch (err) {
      console.error("Category save error:", err.response?.data || err);
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit বাটনে data ফর্মে বসানো
  const handleEdit = (cat) => {
    setEditId(cat.id);
    setName(cat.name);
    setDescription(cat.description);
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteCategory(id);
      await loadCategories();
    } catch (err) {
      console.error("Category delete error", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Categories</h1>

      {/* 🔹 Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          className="border p-2 w-full"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          {editId ? "Update" : "Create"}
        </button>
      </form>

      {/* 🔹 Table */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td className="border p-2">{cat.id}</td>
              <td className="border p-2">{cat.name}</td>
              <td className="border p-2">{cat.description}</td>
              <td className="border p-2 space-x-2">
                <button
                  className="bg-yellow-500 px-2 py-1 text-white"
                  onClick={() => handleEdit(cat)}
                  type="button"
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 px-2 py-1 text-white"
                  onClick={() => handleDelete(cat.id)}
                  type="button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
