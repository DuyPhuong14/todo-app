import { useState } from "react";
import type { Todo } from "../types";

export function useTodos(initial: Todo[] = []) {
  const [todos, setTodos] = useState<Todo[]>(initial);

  // C - Create: thêm vào đầu danh sách
  const addTodo = (title: string) =>
    setTodos((prev) => [
      { id: crypto.randomUUID(), title, completed: false, createdAt: Date.now() },
      ...prev,
    ]);

  // U - Update: đổi tên task có đúng id
  const updateTodo = (id: string, title: string) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));

  // Đảo trạng thái hoàn thành
  const toggleTodo = (id: string) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  // D - Delete: giữ lại mọi task trừ task có id này
  const deleteTodo = (id: string) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  const remaining = todos.filter((t) => !t.completed).length;

  return { todos, addTodo, updateTodo, toggleTodo, deleteTodo, remaining };
}