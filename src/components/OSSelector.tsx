import { cn } from "@/lib/utils";
import { Monitor } from "lucide-react";

interface OSSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const osOptions = [
  { value: "linux", label: "Linux", icon: "🐧" },
  { value: "windows", label: "Windows", icon: "🪟" },
  { value: "macos", label: "macOS", icon: "🍎" },
];

const OSSelector = ({ value, onChange, error }: OSSelectorProps) => {
  return (
    <div>
      <label className="text-xs text-primary mb-4 block uppercase tracking-wider">
        Primary OS Preference
      </label>
      <div className="grid grid-cols-3 gap-3">
        {osOptions.map((os) => (
          <button
            key={os.value}
            type="button"
            onClick={() => onChange(os.value)}
            className={cn(
              "p-4 border-2 rounded-lg transition-all duration-300 flex flex-col items-center gap-2",
              value === os.value
                ? "border-primary bg-primary/10 border-glow"
                : "border-white/20 hover:border-white/40"
            )}
          >
            <span className="text-2xl">{os.icon}</span>
            <span className={cn(
              "text-sm font-medium",
              value === os.value ? "text-primary text-glow" : "text-foreground"
            )}>
              {os.label}
            </span>
          </button>
        ))}
      </div>
      {error && (
        <span className="text-xs text-destructive mt-2 block">{error}</span>
      )}
    </div>
  );
};

export default OSSelector;
