import { useState, useEffect } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import TodoSingleCard from "../components/home/TodoSingleCard.jsx";
import Spinner from "../components/Spinner.jsx";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/")
      .then((response) => {
        setTodos(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-between px-6 items-center w-full">
          <h1 className="text-3xl">Taskify</h1>
          <Link to="/create">
            <MdOutlineAddBox className="text-indigo-500 text-4xl"></MdOutlineAddBox>
          </Link>
        </div>
        <div className="p-4 mt-4">
          {isLoading ? (
            <Spinner />
          ) : todos.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {todos.map((todo) => (
                <TodoSingleCard
                  key={todo._id}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                />
              ))}
            </div>
          ) : (
            <h3 className="text-white h-96 w-full flex justify-center items-center">
              No tasks
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
