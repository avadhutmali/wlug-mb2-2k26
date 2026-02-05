import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="floating-label-group">
        <input
          ref={ref}
          className={cn(
            "cyber-input w-full",
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

FloatingInput.displayName = "FloatingInput";

export default FloatingInput;
