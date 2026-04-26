import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from "../components/TodoList";
import type { TodoType } from "../types/todo";
import { getTodos, deleteTodo as deleteTodoApi, updateTodo } from "../services/api";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function TodoPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [selected, setSelected] = useState<TodoType | null>(null);
  const [showAll, setShowAll] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const navigate = useNavigate();

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
    setLoading(false)
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (id: number) => {
    const res = await deleteTodoApi(id);
    if (res) {
      toast.success("Todo deleted successfully!");
      fetchTodos();
      setSelected(null);
    }
  };

  const toggleTodo = async (todo: TodoType) => {
    const res = await updateTodo(todo);
    if (res) {
      toast.success("Todo status updated successfully!");
      fetchTodos();
      setSelected(null);
    }

  };

  const filteredTodos = todos
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => {
      if (statusFilter === "completed") return t.completed;
      if (statusFilter === "incomplete") return !t.completed;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "status") {
        return Number(a.completed) - Number(b.completed);
      }
      return 0;
    });
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">

      <h1 className="text-5xl font-bold mb-6">
        <span className="text-white">TODO</span>{" "}
        <span className="text-blue-600">LIST</span>
      </h1>

      <div className="flex gap-4 w-full max-w-3xl mb-6">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search todo..."
          className="flex-1 p-3 rounded text-white border"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-3 rounded text-white border"
        >
          <option value="all" className="text-black">All</option>
          <option value="completed" className="text-black">Complete</option>
          <option value="incomplete" className="text-black">Incomplete</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-3 rounded text-white border"
        >
          <option value="name" className="text-black">Sort by Name</option>
          <option value="status" className="text-black">Sort by Status</option>
        </select>

      </div>

      {!showAll && (
        <div className="w-full max-w-xl space-y-4">
          {filteredTodos.slice(0, 4).map((t) => (
            <div
              key={t.id}
              className="flex justify-between items-center bg-gray-200 text-black p-4 rounded-xl"
            >
              <div>{t.title}</div>

              <div className="flex gap-2 items-center">
                {t.completed ? (
                  <IoCheckmarkDoneCircleOutline
                    className="text-green-500"
                    size={24}
                  />
                ) : (
                  <IoCheckmarkDoneCircleOutline
                    size={24}
                    className="text-black"
                  />
                )}

                <button
                  onClick={() => setSelected(t)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAll && (
        <div className="w-full">
          <TodoList todos={filteredTodos} onView={setSelected} />
        </div>
      )}
      {loading && <div>Loading...</div>}
      {!showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-6 underline"
        >
          View All
        </button>
      )}

      <button
        onClick={() => navigate("/add")}
        className="mt-6 bg-blue-600 px-6 py-3 rounded"
      >
        Add Todo
      </button>

      {selected && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white text-black p-6 rounded-lg w-96 relative shadow-xl"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-3 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-3">
              {selected.title}
            </h2>

            <p className="mb-4 text-gray-700">
              {selected.description}
            </p>

            <p className="mb-4 text-gray-700">
              Status:{" "}
              <span>
                {selected.completed ? "Completed" : "Not Completed"}
              </span>
            </p>

            <button
              onClick={() => toggleTodo(selected)}
              className={`bg-blue-600 text-white w-full py-2 mb-2 mt-2 rounded ${!selected.completed
                ? "hover:bg-green-700"
                : "hover:bg-red-500"
                } cursor-pointer`}
            >
              Mark as{" "} {!selected.completed ? 'Completed' : 'Not Completed'}
            </button>

            <button
              onClick={() => deleteTodo(selected.id)}
              className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}