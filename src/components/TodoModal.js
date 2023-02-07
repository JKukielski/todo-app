import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../styles/todoModal.css";
import { v4 as uuid } from "uuid";
import { addTodo, updateTodo } from "../slices/todoSlice";
import { toast, Toaster } from "react-hot-toast";

const TodoModal = ({ type, todo, setOpenModal, setUpdateModal, openModal }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("incomplete");

  useEffect(() => {
    if (type === "edit" && todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setDueDate(todo.dueDate);
      setCategory(todo.category);
      setStatus(todo.status);
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setCategory("");
      setStatus("incomplete");
    }
  }, [type, todo, openModal]);

  const handleCloseClick = () => {
    if (type === "add") {
      setOpenModal(false);
    } else if (type === "edit") {
      setUpdateModal(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      title === "" ||
      description === "" ||
      dueDate === "" ||
      category === ""
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (title && description && dueDate && category && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            description,
            dueDate,
            category,
            status,
            time: new Date().toLocaleDateString(),
          })
        );
        toast.success("Todo added successfully!");
        setOpenModal(false);
      }
      if (type === "edit") {
        if (
          todo.title !== title ||
          todo.description !== description ||
          todo.dueDate !== dueDate ||
          todo.category !== category ||
          todo.status !== status
        ) {
          dispatch(
            updateTodo({
              ...todo,
              title,
              description,
              dueDate,
              category,
              status,
            })
          );
          setUpdateModal(false);
        } else {
          toast.error("No changes made.");
          return;
        }
      }
    }
  };

  return (
    <div className="todo-modal-background">
      <div className="todo-modal">
        <form className="todo-form" onSubmit={handleSubmit}>
          <label htmlFor="title">
            Title:
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="description">
            Description:
            <textarea
              type="text"
              name="description"
              id="description"
              placeholder="Write a note..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label htmlFor="due-date">
            Due date:
            <input
              type="date"
              name="due-date"
              id="due-date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
          <label htmlFor="status">
            Status:
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="incomplete">Incomplete</option>
              <option value="complete">Completed</option>
            </select>
          </label>
          <label htmlFor="category">
            Category:
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value=""></option>
              <option value="Work">Work</option>
              <option value="Education">Education</option>
              <option value="Home">Home</option>
            </select>
          </label>
          <div className="form-btn-container">
            <button
              type="submit"
              className="primary-btn"
              style={{ marginRight: "5px" }}
            >
              {type === "add" ? "Add" : "Edit"} Todo
            </button>
            <button
              type="button"
              onClick={handleCloseClick}
              className="secondary-btn"
              style={{ marginLeft: "5px" }}
            >
              Close
            </button>
          </div>
        </form>
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
};

export default TodoModal;
