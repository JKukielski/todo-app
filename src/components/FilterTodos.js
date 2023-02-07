import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFilterCategory,
  updateFilterStatus,
} from "../slices/filtersSlice";
import "../styles/filterTodos.css";
import TodoModal from "./TodoModal";

const FilterTodos = () => {
  const dispatch = useDispatch();
  const filterCategory = useSelector((state) => state.todo.filterCategory);

  const handleStatusChange = (e) => {
    dispatch(updateFilterStatus(e.target.value));
  };

  const handleCategoryChange = (e) => {
    dispatch(updateFilterCategory(e.target.value));
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="main-container">
        <button className="primary-btn" onClick={() => setOpenModal(true)}>
          Add Todo
        </button>
        <div className="filter-btn-container">
          <button
            className="primary-btn"
            value="all"
            onClick={handleStatusChange}
          >
            All
          </button>

          <button
            className="secondary-btn"
            value="complete"
            onClick={handleStatusChange}
            style={{ marginLeft: "10px" }}
          >
            Complete
          </button>
          <button
            className="secondary-btn"
            value="incomplete"
            onClick={handleStatusChange}
            style={{ margin: "0 10px" }}
          >
            Incomplete
          </button>

          <select
            id="category"
            value={filterCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">Select Category</option>
            <option value="all">All</option>
            <option value="Work">Work</option>
            <option value="Education">Education</option>
            <option value="Home">Home</option>
          </select>
        </div>
      </div>
      {openModal && (
        <TodoModal
          type="add"
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

export default FilterTodos;
