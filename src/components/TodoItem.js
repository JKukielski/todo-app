import React, { useEffect, useState } from "react";
import "../styles/todoItem.css";
import { CgFlagAlt } from "react-icons/cg";
import { BiTrash } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import TodoModal from "./TodoModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, updateTodo } from "../slices/todoSlice";
import { updateFilterStatus } from "../slices/filtersSlice";

const TodoItem = ({ title, description, dueDate, category, todo }) => {
  const dispatch = useDispatch();
  const [updateModal, setUpdateModal] = useState(false);
  const [checkedFlag, setCheckedFlag] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    if (todo.status === "complete") {
      setCheckbox(true);
    } else {
      setCheckbox(false);
    }
  }, [todo.status]);

  const handleDeleteClick = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEditClick = () => {
    setUpdateModal(true);
  };

  const handleFlagClick = () => {
    setCheckedFlag(!checkedFlag);
  };

  const handleCheck = () => {
    setCheckbox(!checkbox);
    dispatch(
      updateTodo({
        ...todo,
        status: checkbox ? "incomplete" : "complete",
      })
    );
    console.log(checkbox);
  };

  return (
    <>
      <div className="todo-item">
        <label className="checkbox-container">
          <input
            type="checkbox"
            name=""
            id=""
            onClick={handleCheck}
            checked={checkbox}
          />
          <div className="checkmark"></div>
        </label>
        <div className="todo-info-container">
          <div className="title-description-container">
            <p className={checkbox ? "title-completed" : "title"}>
              {title && title.substring(0, 20)}
              {title && title.length > 21 ? "..." : ""}
            </p>
            <p className={checkbox ? "description-completed" : "description"}>
              {" "}
              {description && description.substring(0, 20)}
              {description && description.length > 21 ? "..." : ""}
            </p>
          </div>
          <div className="date-cat-icons-container">
            <div className="date-cat-container">
              <p className={checkbox ? "date-completed" : "date"}>
                Due date: {dueDate}
              </p>
              <p className="category">{category}</p>
            </div>
            <div className="icons-container">
              <div className="icon">
                <CgFlagAlt
                  onClick={handleFlagClick}
                  color={checkedFlag ? "#f5b642" : "#000"}
                  cursor="pointer"
                />
              </div>
              <div className="icon">
                <BiTrash onClick={handleDeleteClick} cursor="pointer" />
              </div>
              <div className="icon">
                {" "}
                <GrEdit onClick={handleEditClick} cursor="pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="todo-item-container">
        <div className="todo-inner-container">
          <div className="label-info">
            <label className="todo-checkbox">
              <input
                type="checkbox"
                name=""
                id=""
                onClick={handleCheck}
                checked={checkbox}
              />
              <span className="checkbox"></span>
            </label>
            <div className="todo-info-container">
              <p className={checkbox ? "todo-title-completed" : "todo-title"}>
                {title && title.substring(0, 20)}
                {title && title.length > 21 ? "..." : ""}
              </p>
              <p
                className={
                  checkbox ? "todo-description-completed" : "todo-description"
                }
              >
                {description && description.substring(0, 20)}
                {description && description.length > 21 ? "..." : ""}
              </p>
            </div>
          </div>
          <div className="date-options">
            <p className={checkbox ? "todo-date-completed" : "todo-date"}>
              Due date: {dueDate}
            </p>
            <div className="todo-options-container">
              <div className="todo-category-background">
                <div className="todo-category">{category}</div>
              </div>
              <div className="todo-options">
                <div className="todo-option-background">
                  <CgFlagAlt
                    onClick={handleFlagClick}
                    color={checkedFlag ? "#f5b642" : "#000"}
                    cursor="pointer"
                  />
                </div>
                <div className="todo-option-background">
                  <BiTrash onClick={handleDeleteClick} cursor="pointer" />
                </div>
                <div className="todo-option-background">
                  <GrEdit onClick={handleEditClick} cursor="pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {updateModal && (
        <TodoModal
          type="edit"
          todo={todo}
          updateModal={updateModal}
          setUpdateModal={setUpdateModal}
        />
      )}
    </>
  );
};

export default TodoItem;
