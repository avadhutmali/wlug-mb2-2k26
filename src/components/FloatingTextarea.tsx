import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FloatingTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="floating-label-group">
        <textarea
          ref={ref}
          className={cn(
            "cyber-input w-full resize-none min-h-[100px]",
            error && "border-destructive focus:border-destructive",
            className
          )}
          placeholder=" "
          {...props}
        />
        <label className={cn("floating-label", error && "text-destructive")}>
          {label}
        </label>
        {error && (
          <span className="text-xs text-destructive mt-1 block">{error}</span>
        )}
      </div>
    );
  }
);

FloatingTextarea.displayName = "FloatingTextarea";

export default FloatingTextarea;
