import { useNavigate } from "react-router-dom";
import { createTodo } from "../services/api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
type FormData = {
  title: string;
  description: string;
  completed: string;
};

export default function AddNewTodo() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const res = await createTodo({
      title: data.title,
      description: data.description,
      completed: data.completed === "true",
    });
    console.log(res) 
    if(res){
      toast.success("Todo added successfully!");
      navigate("/");
    }   
  };

  const inputClass = "w-80 p-3 rounded mb-1 text-black border border-[#d9d3d3] focus:outline-none";

  return (
    <div className="flex flex-col items-center mt-20 text-white">
      <h1 className="text-4xl font-bold mb-10">
        TODO <span className="text-blue-600">LIST</span>
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-4 text-left">
          <label htmlFor="title" className="text-black mb-2 block">
            Title
          </label>

          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            placeholder="TODO TITLE"
            className={inputClass}
          />

          {errors.title && (
            <p className="text-red-500 text-sm">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="mb-4 text-left">
          <label htmlFor="description" className="text-black mb-2 block">
            Description
          </label>

          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="DESCRIPTION"
            className={inputClass}
          />

          {errors.description && (
            <p className="text-red-500 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="mb-6 text-left">
          <label htmlFor="completed" className="text-black mb-2 block">
            Status
          </label>

          <select
            id="completed"
            {...register("completed")}
            defaultValue="false"
            className={inputClass}
          >
            <option value="false">Not Completed</option>
            <option value="true">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 px-10 py-3 rounded hover:bg-blue-700 cursor-pointer"
        >
          ADD
        </button>
      </form>
    </div>
  );
}