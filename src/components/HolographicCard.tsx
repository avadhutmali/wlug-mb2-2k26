// import { motion } from "framer-motion";
// // import { QRCodeSVG } from "qrcode.react";
// import { Shield, CheckCircle } from "lucide-react";

// interface HolographicCardProps {
//   name: string;
//   email: string;
// }

// const HolographicCard = ({ name, email }: HolographicCardProps) => {
//   const memberId = `WLUG-${Date.now().toString(36).toUpperCase()}`;

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
//       animate={{ opacity: 1, scale: 1, rotateY: 0 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       className="w-full max-w-md mx-auto"
//     >
//       <div className="glass-card holographic border-glow p-8 relative overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-2">
//             <Shield className="w-6 h-6 text-primary" />
//             <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
//               Registration
//             </span>
//           </div>
//           <CheckCircle className="w-6 h-6 text-green-400" />
//         </div>

//         {/* Member Info */}
//         <div className="flex gap-6">
//           <div className="flex-1 space-y-4">
//             <div>
//               <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
//                 Applicant Name
//               </p>
//               <p className="text-xl font-bold text-glow">{name}</p>
//             </div>
//             <div>
//               <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
//                 Access ID
//               </p>
//               <p className="text-sm font-mono text-primary">{memberId}</p>
//             </div>
//             <div>
//               <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
//                 Status
//               </p>
//               <span className="inline-flex items-center gap-1 text-sm text-green-400">
//                 <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                 VERIFIED
//               </span>
//             </div>
//           </div>
//           {/* QR Code Container
//           <div className="flex-shrink-0">
//             <div className="p-2 bg-white rounded-lg w-32 h-32 flex items-center justify-center">
//               <img
//                 src="/wlugqr.jpeg"
//                 alt="WLUG QR Code"
//                 className="w-full h-full object-contain rounded"
//               />
//             </div>
//           </div>
//         </div> */}

//         {/* Footer */}
//         <div className="mt-6 pt-4 border-t border-white/10">
//           <p className="text-xs text-muted-foreground text-center">
//             Member Board 2 Recruitment • {new Date().toLocaleDateString()}
//           </p>
//         </div>

//         {/* Decorative elements */}
//         <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent pointer-events-none" />
//         <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyber-violet/30 to-transparent pointer-events-none" />
//       </div>

//       <motion.p
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5 }}
//         className="text-center text-muted-foreground text-sm mt-6"
//       >
//         Registration complete.
//       </motion.p>
//     </motion.div>
//   );
// };

// export default HolographicCard;





import { motion } from "framer-motion";
import { Shield, CheckCircle } from "lucide-react";

const HolographicCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-md mx-auto"
    >
      <div className="glass-card holographic border-glow p-8 relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[300px]">
        
        {/* Top Icon */}
        {/* <div className="absolute top-6 left-6 flex items-center gap-2">
           <Shield className="w-5 h-5 text-cyan-400" />
        </div> */}

        {/* Main Success Message */}
        <div className="flex flex-col items-center gap-6 my-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 10 }}
            className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50 shadow-[0_0_30px_rgba(74,222,128,0.3)]"
          >
            <CheckCircle className="w-10 h-10 text-green-400" />
          </motion.div>
          
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wider mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              REGISTRATION DONE
            </h2>
            <p className="text-cyan-400/80 text-sm font-mono tracking-widest">
              SYSTEM ACCESS GRANTED
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full mt-auto pt-6 border-t border-white/10">
          <p className="text-xs text-muted-foreground text-center uppercase tracking-widest font-mono">
            Member Board 2 Recruitment • {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Decorative Background Gradients */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/20 to-transparent pointer-events-none blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/20 to-transparent pointer-events-none blur-2xl" />
      </div>
    </motion.div>
  );
};

export default HolographicCard;