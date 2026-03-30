import { useState } from "react";
import BookForm from "../Components/BookForm";
import BookCard from "../Components/BookCard";
import { createBook } from "../Interfaces/Book";

const SAMPLE = [
  createBook(1, "Suç ve Ceza", "Fyodor Dostoyevski", "1866"),
  createBook(2, "Simyacı", "Paulo Coelho", "1988"),
  createBook(3, "1984", "George Orwell", "1949"),
];

export default function HomePage() {
  const [books, setBooks]             = useState(SAMPLE);
  const [editingBook, setEditingBook] = useState(null);
  const [filter, setFilter]           = useState("all");

  const handleSubmit = ({ title, author, year }) => {
    if (editingBook) {
      setBooks((prev) =>
        prev.map((b) => b.id === editingBook.id ? { ...b, title, author, year } : b)
      );
      setEditingBook(null);
    } else {
      setBooks((prev) => [createBook(Date.now(), title, author, year), ...prev]);
    }
  };

  const handleDelete     = (id) => setBooks((prev) => prev.filter((b) => b.id !== id));
  const handleToggleRead = (id) => setBooks((prev) =>
    prev.map((b) => b.id === id ? { ...b, isRead: !b.isRead } : b)
  );

  const filtered = books.filter((b) =>
    filter === "read" ? b.isRead : filter === "unread" ? !b.isRead : true
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-indigo-700">📚 Kitap Listem</h1>
          <p className="text-gray-400 mt-1 text-sm">Okuduklarını ve okumak istediklerini takip et</p>
        </div>

        <BookForm
          onSubmit={handleSubmit}
          editingBook={editingBook}
          onCancel={() => setEditingBook(null)}
        />

        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {["all", "unread", "read"].map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`text-xs px-4 py-1.5 rounded-full font-medium transition ${
                  filter === f ? "bg-indigo-600 text-white" : "bg-white text-gray-500 hover:bg-indigo-50"
                }`}>
                {f === "all" ? "Tümü" : f === "read" ? "Okundu" : "Okunmadı"}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400">
            {books.filter((b) => b.isRead).length}/{books.length} okundu
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {filtered.length === 0
            ? <p className="text-center text-gray-400 py-12">Henüz kitap yok 📖</p>
            : filtered.map((book) => (
                <BookCard key={book.id} book={book}
                  onDelete={handleDelete}
                  onEdit={(b) => setEditingBook(b)}
                  onToggleRead={handleToggleRead}
                />
              ))
          }
        </div>

      </div>
    </div>
  );
}