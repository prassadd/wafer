import axios from "axios";
import type { TodoType } from "../types/todo";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

export const getTodos = async (): Promise<TodoType[]> => {
  try {
    const res = await API.get("/todos");
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createTodo = async (todo: Partial<TodoType>) => {
  try {
    const res = await API.post("/todos", todo);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTodo = async (id: number) => {
  try {
    const res = await API.delete(`/todos/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateTodo = async (todo: TodoType) => {
  try {
    const res = await API.put(`/todos/${todo.id}`, {
      ...todo,
      completed: !todo.completed,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

