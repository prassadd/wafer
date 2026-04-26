import type { TodoType } from "../types/todo";
import TodoItem from "./TodoItem";

interface Props {
  todos: TodoType[];
  onView: (todo: TodoType) => void;
}

export default function TodoList({ todos, onView }: Props) {
  return (
    <div className="mt-6 grid grid-cols-5 gap-10 justify-items-center">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onView={onView} />
      ))}
    </div>
  );
}