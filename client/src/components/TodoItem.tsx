import type { TodoType } from "../types/todo";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

interface Props {
  todo: TodoType;
  onView: (todo: TodoType) => void;
}

export default function TodoItem({ todo, onView }: Props) {
  return (
    <div className="relative flex flex-col justify-between bg-gray-200 rounded-xl p-4 shadow w-full max-w-[220px]">

      <div className="absolute top-2 left-2">
        {todo.completed ? (
          <IoCheckmarkDoneCircleOutline
            className="text-green-500"
            size={22}
          />
        ) : (
          <IoCheckmarkDoneCircleOutline className="text-black" size={22} />
        )}
      </div>

      <div className="mt-6">
        <h2 className="font-semibold">{todo.title}</h2>
        <p className="text-sm text-gray-600 break-words text-left">
          {todo.description}
        </p>
      </div>

      <div className="mt-4">
        <button
          onClick={() => onView(todo)}
          className="bg-blue-600 text-white px-4 py-1 rounded w-full hover:bg-blue-700"
        >
          View
        </button>
      </div>
    </div>
  );
}