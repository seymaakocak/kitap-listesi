export default function BookCard({ book, onDelete, onEdit, onToggleRead }) {
  return (
    <div className={`flex items-center justify-between bg-white rounded-2xl shadow px-6 py-4 transition ${book.isRead ? "opacity-60" : ""}`}>
      <div className="flex items-center gap-4">
        <input
          type="checkbox" checked={book.isRead}
          onChange={() => onToggleRead(book.id)}
          className="w-4 h-4 accent-indigo-600 cursor-pointer"
        />
        <div>
          <p className={`font-semibold text-gray-800 ${book.isRead ? "line-through" : ""}`}>
            {book.title}
          </p>
          <p className="text-sm text-gray-400">
            {book.author} {book.year && `· ${book.year}`}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onEdit(book)}
          className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-700 px-3 py-1.5 rounded-lg transition">
          Düzenle
        </button>
        <button onClick={() => onDelete(book.id)}
          className="text-xs bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1.5 rounded-lg transition">
          Sil
        </button>
      </div>
    </div>
  );
}