// src/components/AddTaskForm.tsx
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { Task } from "../types/task";

// 1) Schema
const schema = yup.object({
  title: yup
    .string()
    .trim()
    .min(2, "Tối thiểu 2 ký tự")
    .max(60, "Tối đa 60 ký tự")
    .required("Vui lòng nhập tiêu đề"),
  // optional => field có thể vắng mặt, khi có thì là string; lúc submit ta chuyển về undefined nếu rỗng
  description: yup.string().trim().max(200, "Mô tả tối đa 200 ký tự").optional(),
  priority: yup
    .mixed<"low" | "medium" | "high">()
    .oneOf(["low", "medium", "high"], "Chọn mức ưu tiên")
    .required("Chọn mức ưu tiên"),
});

// 2) Lấy type từ schema để KHỚP 100%
type FormValues = yup.InferType<typeof schema>;

type Props = { onAdd: (t: Task) => void; onClearCompleted: () => void };

export default function AddTaskForm({ onAdd, onClearCompleted }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { title: "", description: "", priority: "low" },
    resolver: yupResolver(schema),
  });

  useEffect(() => { setFocus("title"); }, [setFocus]);

  // 3) Khai rõ SubmitHandler cho khỏi bị TS2345
  const onSubmit: SubmitHandler<FormValues> = (v) => {
    const task: Task = {
      id: crypto.randomUUID(),
      title: v.title.trim(),
      description: v.description?.trim() || undefined,
      priority: v.priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    onAdd(task);
    reset();
    setFocus("title");
  };

  return (
    <>
      <form className="new-row" onSubmit={handleSubmit(onSubmit)} noValidate>
        <input className="title-input" placeholder="Tiêu đề công việc…" {...register("title")} aria-invalid={!!errors.title}/>
        <select {...register("priority")} aria-invalid={!!errors.priority}>
          <option value="low">Ưu tiên thấp</option>
          <option value="medium">Ưu tiên trung bình</option>
          <option value="high">Ưu tiên cao</option>
        </select>
        <button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Đang thêm…" : "Thêm"}
        </button>
      </form>

      {errors.title && <p className="err">{errors.title.message}</p>}
      {errors.priority && <p className="err">{errors.priority.message}</p>}

      <textarea className="desc-input" placeholder="Mô tả chi tiết (tùy chọn)…"
        rows={2} {...register("description")} aria-invalid={!!errors.description}/>
      {errors.description && <p className="err">{errors.description.message}</p>}

      <div style={{ display: "flex", justifyContent: "flex-end", margin: "6px 0 10px" }}>
        <button type="button" className="clear-btn" onClick={onClearCompleted}>Xóa công việc đã hoàn thành</button>
      </div>
    </>
  );
}
