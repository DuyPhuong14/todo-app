import type { Todo } from "./types";

// 14 task mẫu để thấy được phân trang (5 task/trang → 3 trang)
export const seedTodos: Todo[] = Array.from({ length: 14 }, (_, i) => ({
  id: crypto.randomUUID(),
  title: `This is an example of task #${i + 1}`,
  completed: i % 3 === 0,
  createdAt: Date.now() - i * 1000,
}));