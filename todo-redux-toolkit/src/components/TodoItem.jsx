import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleTodo, updateTodo, deleteTodo } from '../features/todos/todoSlice'

export default function TodoItem({ todo }) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)

  function saveEdit() {
    const trimmed = draft.trim()
    if (trimmed) {
      dispatch(updateTodo({ id: todo.id, text: trimmed }))
    }
    setIsEditing(false)
  }

  return (
    <li className="flex items-center gap-3 py-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
        className="h-4 w-4 accent-indigo-600 shrink-0"
      />

      {isEditing ? (
        <input
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
          className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={`flex-1 text-sm cursor-pointer ${
            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {todo.text}
        </span>
      )}

      <button
        onClick={() => setIsEditing(true)}
        className="text-gray-400 hover:text-indigo-600 text-sm"
        title="Edit"
      >
        ✏️
      </button>
      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        className="text-gray-400 hover:text-red-600 text-sm"
        title="Delete"
      >
        🗑️
      </button>
    </li>
  )
}