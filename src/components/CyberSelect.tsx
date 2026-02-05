import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface CyberSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
}

const CyberSelect = ({ label, value, onChange, options, error }: CyberSelectProps) => {
  return (
    <div className="relative">
      <label className="text-xs text-primary mb-2 block uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full bg-transparent border-0 border-b-2 border-white/30 rounded-none px-0 py-3 text-foreground appearance-none cursor-pointer focus:border-primary focus:ring-0 focus:outline-none transition-colors duration-300",
            error && "border-destructive focus:border-destructive"
          )}
        >
          <option value="" className="bg-background text-muted-foreground">
            Select {label}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-background">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
      </div>
      {error && (
        <span className="text-xs text-destructive mt-1 block">{error}</span>
      )}
    </div>
  );
};

export default CyberSelect;
