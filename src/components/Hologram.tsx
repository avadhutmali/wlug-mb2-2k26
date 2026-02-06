import { motion } from "framer-motion";
import { Shield, CheckCircle } from "lucide-react";

interface HologramProps {
  name: string;
}

const Hologram = ({ name }: HologramProps) => {
  const memberId = `WLUG-${Date.now().toString(36).toUpperCase()}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="mt-10 flex justify-center"
    >
      <div className="w-[320px] glass-card holographic border-glow rounded-xl px-6 py-5 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-[10px] tracking-widest uppercase text-primary font-semibold">
              WLUG PASS
            </span>
          </div>
          <CheckCircle className="w-5 h-5 text-green-400" />
        </div>

        {/* Name */}
        <div className="mb-3">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Member Name
          </p>
          <p className="text-lg font-bold truncate">{name}</p>
        </div>

        {/* Member ID */}
        <div className="mb-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Member ID
          </p>
          <p className="text-xs font-mono text-primary">{memberId}</p>
        </div>

        {/* Status + QR */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            VERIFIED
          </span>

          <div className="bg-white rounded-md p-1 w-16 h-16">
            <img
              src="/wlugqr.jpeg"
              alt="WLUG QR"
              className="w-full h-full object-contain rounded"
            />
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground text-center mt-4">
          WLUG • Member Board 2 Recruitment
        </p>

        <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default Hologram;
