import { useSelector } from 'react-redux'
import { selectAllTodos } from '../features/todos/todoSlice'
import TodoItem from './TodoItem'

export default function TodoList() {
  const todos = useSelector(selectAllTodos)

  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-400 text-sm py-6">
        No todos yet. Add your first task above!
      </p>
    )
  }

  return (
    <ul className="divide-y divide-gray-100">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}