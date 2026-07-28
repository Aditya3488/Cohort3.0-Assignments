import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  items: [], // { id, text, completed }
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.items.push(action.payload)
      },
      prepare(text) {
        return { payload: { id: nanoid(), text, completed: false } }
      },
    },
    toggleTodo(state, action) {
      const todo = state.items.find((t) => t.id === action.payload)
      if (todo) todo.completed = !todo.completed
    },
    updateTodo(state, action) {
      const { id, text } = action.payload
      const todo = state.items.find((t) => t.id === id)
      if (todo) {
        todo.text = text
      }
    },
    deleteTodo(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload)
    },
  },
})

export const { addTodo, toggleTodo, updateTodo, deleteTodo } = todoSlice.actions
export const selectAllTodos = (state) => state.todos.items
export default todoSlice.reducer