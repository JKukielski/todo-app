//container for all todos
import React from "react";
import TodoItem from "./TodoItem";
import "../styles/todoContainer.css";
import { useSelector } from "react-redux";

const TodosContainer = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const { filterStatus, filterCategory } = useSelector((state) => state.filter);

  const filteredTodos = todoList.filter((todo) => {
    let statusMatch = true;
    let categoryMatch = true;

    if (filterStatus !== "all") {
      statusMatch = todo.status === filterStatus;
    }

    if (filterCategory !== "all") {
      categoryMatch = todo.category === filterCategory;
    }

    return statusMatch && categoryMatch;
  });

  return (
    <div className="todo-container">
      {filteredTodos && filteredTodos.length > 0 ? (
        filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            title={todo.title}
            description={todo.description}
            dueDate={todo.dueDate}
            category={todo.category}
            todo={todo}
          />
        ))
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
};

export default TodosContainer;
