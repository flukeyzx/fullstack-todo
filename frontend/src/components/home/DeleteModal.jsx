import { enqueueSnackbar } from "notistack";
import axios from "axios";

const DeleteModal = ({ todo, todos, setTodos, onClose }) => {
  const deleteTodo = () => {
    axios
      .delete(`http://localhost:3000/${todo._id}`)
      .then((_) => {
        setTodos(todos.filter((item) => item._id !== todo._id));
        onClose();
        enqueueSnackbar("Task deleted successfully", { variant: "success" });
      })
      .catch((error) => {
        console.log(error.message);
        onClose();
      });
  };
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[300px] max-w-full h-[160px] bg-gray-700 rounded-xl p-4 flex flex-col relative"
      >
        <h1 className="font-bold pb-1">Confirm Deletion</h1>
        <p className="pb-2 mx-0">
          Are you sure you want to delete "{todo.title}"?
        </p>
        <div className="flex justify-center gap-x-8 items-center">
          <button
            className="px-8 py-2 bg-white text-slate-900 font-semibold hover:opacity-75 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-8 py-2 bg-red-500 font-semibold hover:opacity-75 text-slate-100 rounded-lg"
            onClick={deleteTodo}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
