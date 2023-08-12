import React from "react";
import { Icon } from "react-icons-kit";
import { trash } from "react-icons-kit/feather/trash";
import { edit2 } from "react-icons-kit/feather/edit2";

export const IndividualTodo = ({ individualTodo, deleteTodo, editModal }) => {
  const handleDelete = () => {
    deleteTodo(individualTodo);
  };

  const handleEditModal = () => {
    editModal(individualTodo);
  };

  return (
    <div className="todo">
      <div>
        <h3>{individualTodo.Todo}</h3>
      </div>
      <div>
        <p>{individualTodo.description}</p>
        <div className="actions-div">
          <div onClick={handleEditModal}>
            <Icon size={18} icon={edit2} />
          </div>
          <div className="delete-btn" onClick={handleDelete}>
            <Icon size={18} icon={trash} />
          </div>
        </div>
      </div>
    </div>
  );
};
