import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, User, Database, Settings, Rocket } from "lucide-react";
import FloatingInput from "./FloatingInput";
import FloatingTextarea from "./FloatingTextarea";
import CyberSelect from "./CyberSelect";
import OSSelector from "./OSSelector";
import HolographicCard from "./HolographicCard";
import { supabase } from "@/lib/supabase";


interface FormData {
  fullName: string;
  email: string;
  mobile: string;
  branch: string;
  prn: string;
  mission: string;
}


const initialData: FormData = {
  fullName: "",
  email: "",
  mobile: "",
  branch: "",
  prn: "",
  mission: "",
};

const branchOptions = [
  { value: "cse", label: "Computer Science" },
  { value: "it", label: "Information Technology" },
  { value: "ece", label: "Electronics & Communication" },
  { value: "eee", label: "Electrical Engineering" },
  { value: "mech", label: "Mechanical Engineering" },
  { value: "civil", label: "Civil Engineering" },
  { value: "ai_ds", label: "Robotics and Automation" },
  { value: "aiml", label: "AI & Machine Learning" },
  { value: "other", label: "Other" },
];


const RegistrationWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shakeCard, setShakeCard] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<FormData> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Required";
      if (!formData.email.trim()) newErrors.email = "Required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
      if (!formData.mobile.trim()) newErrors.mobile = "Required";
      else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ""))) newErrors.mobile = "Invalid mobile";
    }

  if (currentStep === 2) {
  if (!formData.branch) newErrors.branch = "Required";
  if (!formData.prn.trim()) newErrors.prn = "Required";
}

    if (currentStep === 3) {
      if (!formData.mission.trim()) newErrors.mission = "Required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShakeCard(true);
      setTimeout(() => setShakeCard(false), 500);
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
  // Final step validation (optional but recommended)
  if (!validateStep(3)) return;

  const { error } = await supabase
    .from("wlug_registrations")
    .insert([
  {
    full_name: formData.fullName,
    email: formData.email,
    mobile: formData.mobile,
    branch: formData.branch,
    prn: formData.prn,
    mission: formData.mission,
  },
]);

  if (error) {
    console.error("Supabase insert error:", error.message);
    alert("Registration failed. Please try again.");
    return;
  }

  // Success
  setIsSubmitted(true);
};


  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const stepIcons = [User, User, Database, Settings, Rocket];
  const StepIcon = stepIcons[step] || User;

if (isSubmitted) {
  return (
    <div className="flex justify-center">
      <div className="relative w-[360px]">
        {/* Soft glow */}
        <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl" />

        {/* Card */}
        <div className="relative rounded-2xl border border-primary/30 
                        bg-background/90 backdrop-blur-xl
                        px-6 py-7 text-center shadow-lg">

          {/* Icon */}
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center
                          rounded-full bg-primary/10 text-primary text-xl">
            ✅
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-primary">
            Registration Confirmed
          </h2>

          {/* Text */}
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Thank you,{" "}
            <span className="font-medium text-foreground">
              {formData.fullName}
            </span>
            <br />
            Your Registration has been successfully recorded.
          </p>

          {/* Divider */}
          <div className="my-4 h-px bg-primary/20" />

          {/* Footer */}
          <p className="text-xs text-muted-foreground">
            Stay Tuned 🚀
          </p>
        </div>
      </div>
    </div>
  );
}

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: shakeCard ? [0, -10, 10, -10, 10, 0] : 0,
      }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto overflow-hidden"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 border border-primary/30 rounded">
            <StepIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-wider uppercase font-display">
              WLUG MEMBER BOARD 2 REGISTRATION
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              STEP_{step}_OF_4
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 transition-all duration-300 ${s <= step ? "bg-primary" : "bg-white/10"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[280px] flex flex-col">
        <AnimatePresence mode="wait" custom={step}>

          {/* Step 1: Identity */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex-1 space-y-6"
            >
              <div className="mb-2">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Step 1: Identity Matrix
                </h2>
              </div>
              <FloatingInput
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                error={errors.fullName}
              />
              <FloatingInput
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                error={errors.email}
              />
              <FloatingInput
                label="Mobile Number"
                type="tel"
                value={formData.mobile}
                onChange={(e) => updateField("mobile", e.target.value)}
                error={errors.mobile}
              />
            </motion.div>
          )}

          {/* Step 2: Core Data */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex-1 space-y-6"
            >
              <div className="mb-2">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Step 2: Core Data
                </h2>
              </div>
              <CyberSelect
                label="Branch"
                value={formData.branch}
                onChange={(v) => updateField("branch", v)}
                options={branchOptions}
                error={errors.branch}
              />
              <FloatingInput
                label="PRN"
                value={formData.prn}
                onChange={(e) => updateField("prn", e.target.value)}
                error={errors.prn}
              />
            </motion.div>
          )}

          {/* Step 3: Protocol */}
          {step === 3 && (
            <motion.div
              key="step3"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex-1 space-y-6"
            >
              <div className="mb-2">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Step 3: Protocol Configuration
                </h2>
              </div>
              <FloatingTextarea
                label="State your mission (Why join WLUG?)"
                value={formData.mission}
                onChange={(e) => updateField("mission", e.target.value)}
                error={errors.mission}
              />
            </motion.div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <motion.div
              key="step4"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <div className="mb-4">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Step 4: Review Details
                </h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{formData.fullName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-muted-foreground">Mobile</span>
                  <span className="font-medium">{formData.mobile}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-muted-foreground">PRN</span>
                  <span className="font-medium">{formData.prn}</span>
                </div>
                          <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-muted-foreground">Branch</span>
              <span className="font-medium">
                {branchOptions.find((b) => b.value === formData.branch)?.label}
              </span>
            </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-white/10 flex justify-between mt-auto">
        {step > 1 ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 cyber-button py-2 px-4"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={handleSubmit} className="cyber-button-solid py-3 px-6">
            Execute Script
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default RegistrationWizard;
