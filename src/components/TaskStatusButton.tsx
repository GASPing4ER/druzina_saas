"use client";

import { updateTaskStatus } from "@/actions/tasks";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

const TaskStatusButton = ({ task, user }: { task: TaskProps; user: User }) => {
  const router = useRouter();
  const handleStatusChange = async (e: MouseEvent) => {
    e.stopPropagation();
    await updateTaskStatus(task);
    router.refresh();
  };
  return (
    <button
      onClick={handleStatusChange}
      className={`h-6 w-6 rounded-full border flex items-center justify-center ${
        task.status === "assigned"
          ? "border-black bg-gray-100 disabled:border-gray-400"
          : task.status === "done"
          ? "border-orange-400 bg-gray-100 disabled:border-orange-200"
          : task.status === "checked"
          ? "border-green-400 bg-gray-100 disabled:border-green-200"
          : "border-green-400 bg-green-400"
      }`}
      disabled={
        (task.status === "assigned" && user.id !== task.employee_id) ||
        (task.status === "done" && user.id !== task.assigner_id) ||
        (task.status === "checked" &&
          user.user_metadata.role !== "superadmin") ||
        task.status === "completed"
      }
    >
      <span className={`${task.status !== "completed" ? "hidden" : "block"}`}>
        ✔️
      </span>
    </button>
  );
};

export default TaskStatusButton;
