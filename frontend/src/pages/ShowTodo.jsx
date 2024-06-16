import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import BackButton from "../components/BackButton.jsx";

const ShowTodo = () => {
  const [todo, setTodo] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/${id}`)
      .then((response) => {
        console.log(response.data.todo);
        setTodo(response.data.todo);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">todo Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{todo._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{todo.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Description</span>
            <span>{todo.description}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Created Time</span>
            <span>{new Date(todo.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{new Date(todo.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowTodo;
