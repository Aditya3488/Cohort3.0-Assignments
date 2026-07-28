import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📝 Todo App
        </h1>
        <AddTodo />
        <TodoList />
      </div>
    </div>
  )
}