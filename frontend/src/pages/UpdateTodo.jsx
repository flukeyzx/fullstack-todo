import { useState, useEffect } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${id}`)
      .then((response) => {
        setTitle(response.data.todo.title);
        setDescription(response.data.todo.description);
        setStatus(response.data.todo.status);
      })
      .catch((error) => {
        alert("Something went wrong check the console.");
        console.log(error.message);
      });
  }, []);

  const handleSubmit = () => {
    if (status === "") {
      enqueueSnackbar("Please select the status field", { variant: "error" });
      return;
    }
    const todo = {
      title,
      description,
      status,
    };

    axios
      .put(`http://localhost:3000/${id}`, todo)
      .then(() => {
        enqueueSnackbar("Task updated successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        enqueueSnackbar("Error updating a task", { variant: "error" });
        console.log(error.message);
      });
  };

  return (
    <div className="p-4 flex justify-center items-center w-full h-screen text-slate-900">
      <div className="flex flex-col justify-center items-center gap-8 border-2 broder-white rounded-lg p-4 w-96 h-96">
        <input
          type="text"
          placeholder="Enter the title"
          className="px-2 py-1 rounded-md focus:outline-none text-lg font-semibold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="4"
          cols="22"
          placeholder="Enter the description"
          className="px-2 py-1 rounded-md focus:outline-none text-lg font-semibold"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="gap-4">
          <label className="text-white pr-4 max-sm:hidden">Status</label>
          <select
            className="px-3 py-1 rounded-md focus:outline-none text-lg font-semibold"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="incomplete">incomplete</option>
            <option value="complete">complete</option>
          </select>
        </div>

        <button
          className="bg-sky-400 px-4 py-2 w-full rounded-lg text-lg font-semibold hover:bg-sky-600"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateTodo;
