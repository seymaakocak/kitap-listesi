import { useState, useEffect } from "react";

export default function BookForm({ onSubmit, editingBook, onCancel }) {
  const [title, setTitle]   = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear]     = useState("");

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setYear(editingBook.year);
    } else {
      setTitle(""); setAuthor(""); setYear("");
    }
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    onSubmit({ title: title.trim(), author: author.trim(), year: year.trim() });
    setTitle(""); setAuthor(""); setYear("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        {editingBook ? "✏️ Kitabı Güncelle" : "➕ Yeni Kitap Ekle"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text" placeholder="Kitap adı *" value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text" placeholder="Yazar *" value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="number" placeholder="Yıl" value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <div className="flex gap-3 mt-4">
        <button type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-6 py-2 rounded-xl transition">
          {editingBook ? "Güncelle" : "Ekle"}
        </button>
        {editingBook && (
          <button type="button" onClick={onCancel}
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium px-6 py-2 rounded-xl transition">
            İptal
          </button>
        )}
      </div>
    </form>
  );
}