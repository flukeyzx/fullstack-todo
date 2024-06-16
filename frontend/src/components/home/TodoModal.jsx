import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";

const BookModal = ({ todo, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[500px] max-w-full h-[350px] bg-gray-700 rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-blue-500 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-blue-400 rounded-lg mt-3">
          {todo.status}
        </h2>
        <h4 className="my-2 text-gray-500 flex justify-center items-center">
          {todo._id}
        </h4>
        <div className="flex justify-center items-center gap-x-2 mt-8 mb-4">
          <PiBookOpenTextLight className="text-blue-300 text-2xl" />
          <h2 className="my-1">{todo.title}</h2>
        </div>
        <div className="flex justify-center items-center gap-x-2">
          <h2 className="my-1">{todo.description} </h2>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
