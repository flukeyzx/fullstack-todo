import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import TodoModal from "./TodoModal.jsx";
import DeleteModal from "./DeleteModal.jsx";

const TodoSingleCard = ({ todo, todos, setTodos }) => {
  const [currentStatus, setCurrentStatus] = useState(todo.status);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const statusHandler = async () => {
    const newStatus =
      currentStatus === "incomplete" ? "complete" : "incomplete";
    setCurrentStatus(newStatus);

    const updatedTodo = {
      title: todo.title,
      description: todo.description,
      status: newStatus,
    };

    try {
      await axios.put(`http://localhost:3000/${todo._id}`, updatedTodo);
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };
  return (
    <div className="border-2  border-white rounded-lg px-4 py-2 m-4 relative hover:shadow-white-xl">
      <div className="flex justify-center items-center w-full gap-x-4 py-4 px-2">
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
          <h2 className="my-1">{todo.title}</h2>
        </div>

        <h2
          onClick={statusHandler}
          className={`px-4 py-1 rounded-lg cursor-pointer ${
            currentStatus === "incomplete" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {currentStatus}
        </h2>
      </div>

      <div className="flex justify-between items-center gap-x-2  p-4">
        <BiShow
          className="text-3xl text-blue-800 hover:text-black cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Link to={`todo/${todo._id}`}>
          <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
        </Link>
        <Link to={`update/${todo._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
        </Link>
        <Link>
          <MdOutlineDelete
            className="text-2xl text-red-600 hover:text-black"
            onClick={() => setDeleteModal(true)}
          />
        </Link>
      </div>
      {showModal && (
        <TodoModal todo={todo} onClose={() => setShowModal(false)} />
      )}
      {deleteModal && (
        <DeleteModal
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          onClose={() => setDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default TodoSingleCard;
