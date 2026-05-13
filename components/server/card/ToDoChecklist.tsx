import { Todo } from "@/types";
import { CheckCircle2, Circle } from "lucide-react";

interface TodoChecklist {
  todo: Todo;
}

export const TodoChecklist = ({ todo }: TodoChecklist) => {
  return (
    <div
      key={todo.id}
      className="flex items-center gap-3 p-3 rounded-lg border bg-muted/5 text-sm"
    >
      {todo.completed ? (
        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
      ) : (
        <Circle className="h-5 w-5 text-orange-400 shrink-0" />
      )}
      <span
        className={
          todo.completed ? "line-through text-muted-foreground" : "font-medium"
        }
      >
        {todo.title}
      </span>
    </div>
  );
};
