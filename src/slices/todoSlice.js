import { createSlice } from "@reduxjs/toolkit";

const getTodosfromStorage = () => {
  const todoList = window.localStorage.getItem("todoList");
  if (todoList) {
    return JSON.parse(todoList);
  }
  window.localStorage.setItem("todoList", JSON.stringify([]));
  return [];
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: getTodosfromStorage(),
  },
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({ ...action.payload });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem(
          "todoList",
          JSON.stringify(...action.payload)
        );
      }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (action.payload.id === todo.id) {
            todo.title = action.payload.title;
            todo.description = action.payload.description;
            todo.dueDate = action.payload.dueDate;
            todo.category = action.payload.category;
            todo.status = action.payload.status;
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
