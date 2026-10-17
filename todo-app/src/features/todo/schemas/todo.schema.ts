import { z } from "zod";

export const todoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập nội dung công việc")
    .max(100, "Tối đa 100 ký tự"),
});

export type TodoFormValues = z.infer<typeof todoSchema>;