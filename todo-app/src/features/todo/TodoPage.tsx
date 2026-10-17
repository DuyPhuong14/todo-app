import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTodos } from "./hooks/useTodos";
import { useDebounce } from "./hooks/useDebounce";
import { usePagination } from "./hooks/usePagination";
import { TodoToolbar } from "./components/TodoToolbar";
import { TodoList } from "./components/TodoList";
import { TodoPagination } from "./components/TodoPagination";
import { TodoFormModal } from "./components/TodoFormModal";
import { ConfirmDeleteDialog } from "./components/ConfirmDeleteDialog";
import { seedTodos } from "./seed";
import type { StatusFilter, Todo } from "./types";

const PAGE_SIZE = 5;

export default function TodoPage() {
  // 1) Dữ liệu gốc + CRUD
  const { todos, addTodo, updateTodo, toggleTodo, deleteTodo, remaining } =
    useTodos(seedTodos);

  // 2) Search + Filter
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    const keyword = debouncedSearch.trim().toLowerCase();
    return todos.filter((t) => {
      const okStatus =
        status === "all" || (status === "done" ? t.completed : !t.completed);
      const okSearch = t.title.toLowerCase().includes(keyword);
      return okStatus && okSearch;
    });
  }, [todos, status, debouncedSearch]);

  // 3) Phân trang (làm sau khi đã lọc)
  const { page, setPage, totalPages, pagedItems } = usePagination(
    filtered,
    PAGE_SIZE
  );

  // Đổi bộ lọc/từ khóa thì quay về trang 1
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const handleStatusChange = (value: StatusFilter) => {
    setStatus(value);
    setPage(1);
  };

  // 4) State điều khiển modal
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Todo | null>(null); // null = đang thêm mới
  const [deleting, setDeleting] = useState<Todo | null>(null);

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (todo: Todo) => {
    setEditing(todo);
    setFormOpen(true);
  };
  const handleSave = (title: string) => {
    if (editing) updateTodo(editing.id, title);
    else addTodo(title);
  };
  const handleConfirmDelete = () => {
    if (deleting) deleteTodo(deleting.id);
    setDeleting(null);
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto w-full max-w-md rounded-xl bg-white p-5 shadow-sm sm:max-w-xl sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Your To Do</h1>
          <Button size="icon" aria-label="Thêm công việc" onClick={openAdd}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <TodoToolbar
          search={search}
          onSearchChange={handleSearchChange}
          status={status}
          onStatusChange={handleStatusChange}
        />

        <div className="mt-4">
          <TodoList
            todos={pagedItems}
            onToggle={toggleTodo}
            onEdit={openEdit}
            onDelete={setDeleting}
          />
        </div>

        <TodoPagination page={page} totalPages={totalPages} onPageChange={setPage} />

        <p className="mt-4 text-xs font-medium">
          Your remaining todos : {remaining}
        </p>
      </div>

      <TodoFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        initialTitle={editing?.title ?? ""}
        onSubmit={handleSave}
      />

      <ConfirmDeleteDialog
        open={!!deleting}
        title={deleting?.title}
        onOpenChange={(open) => {
          if (!open) setDeleting(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}