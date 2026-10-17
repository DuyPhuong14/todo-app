import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { todoSchema, type TodoFormValues } from "../schemas/todo.schema";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTitle?: string;
  onSubmit: (title: string) => void;
}

export function TodoFormModal({
  open,
  onOpenChange,
  initialTitle = "",
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: { title: initialTitle },
  });

  // Mỗi lần mở modal: nạp lại giá trị, tránh dính chữ của lần trước
  useEffect(() => {
    if (open) reset({ title: initialTitle });
  }, [open, initialTitle, reset]);

  const isEdit = initialTitle !== "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Sửa công việc" : "Thêm công việc"}</DialogTitle>
          <DialogDescription className="sr-only">
            Nhập nội dung công việc rồi bấm Lưu
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={handleSubmit((values) => {
            onSubmit(values.title);
            onOpenChange(false);
          })}
        >
          <div>
            <Input
              placeholder="Nhập công việc..."
              aria-invalid={!!errors.title}
              {...register("title")}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit">Lưu</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}