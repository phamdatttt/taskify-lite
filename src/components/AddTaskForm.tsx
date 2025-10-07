import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Task } from "../types/task";

// Props nhận từ App.tsx
type Props = {
  onAdd: (t: Task) => void;
  onClearCompleted: () => void;
};

// Kiểu dữ liệu của form
type FormValues = {
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
};

export default function AddTaskForm({ onAdd, onClearCompleted }: Props) {
  // useForm tạo toàn bộ "bộ điều khiển form"
  const {
    register,            // dùng để liên kết input
    handleSubmit,        // xử lý submit form
    reset,               // reset form sau khi thêm
    setFocus,            // focus lại input đầu tiên
    formState: { errors, isSubmitting, isValid }, // trạng thái form
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { title: "", description: "", priority: "low" },
  });

  // Khi form load, focus ngay vào ô tiêu đề
  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  // Hàm xử lý khi submit hợp lệ
  const onSubmit = (values: FormValues) => {
    const task: Task = {
      id: crypto.randomUUID(),
      title: values.title.trim(),
      description: values.description?.trim() || undefined,
      priority: values.priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    onAdd(task);   // Gọi hàm thêm task từ App.tsx
    reset();       // Xóa dữ liệu form
    setFocus("title"); // Focus lại để nhập nhanh
  };

  return (
    <>
      {/* Form nhập công việc */}
      <form className="new-row" onSubmit={handleSubmit(onSubmit)} noValidate>
        <input
          className="title-input"
          placeholder="Tiêu đề công việc…"
          {...register("title", {
            required: "Vui lòng nhập tiêu đề",
            minLength: { value: 2, message: "Tối thiểu 2 ký tự" },
            maxLength: { value: 60, message: "Tối đa 60 ký tự" },
            validate: (v) =>
              v.trim().length > 0 || "Không được chỉ nhập khoảng trắng",
          })}
          aria-invalid={!!errors.title}
        />

        <select
          {...register("priority", { required: "Chọn mức ưu tiên" })}
          aria-invalid={!!errors.priority}
        >
          <option value="low">Ưu tiên thấp</option>
          <option value="medium">Ưu tiên trung bình</option>
          <option value="high">Ưu tiên cao</option>
        </select>

        <button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Đang thêm…" : "Thêm"}
        </button>
      </form>

      {/* Hiển thị lỗi dưới input */}
      {errors.title && <p className="err">{errors.title.message}</p>}
      {errors.priority && <p className="err">{errors.priority.message}</p>}

      {/* Mô tả công việc */}
      <textarea
        className="desc-input"
        placeholder="Mô tả chi tiết (tùy chọn)…"
        rows={2}
        {...register("description", {
          maxLength: { value: 200, message: "Mô tả tối đa 200 ký tự" },
        })}
        aria-invalid={!!errors.description}
      />
      {errors.description && <p className="err">{errors.description.message}</p>}

      {/* Nút xóa task hoàn thành */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "6px 0 10px",
        }}
      >
        <button type="button" className="clear-btn" onClick={onClearCompleted}>
          Xóa công việc đã hoàn thành
        </button>
      </div>
    </>
  );
}
