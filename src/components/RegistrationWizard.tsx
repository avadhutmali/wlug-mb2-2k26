import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, User, Database, Settings, Rocket } from "lucide-react";
import FloatingInput from "./FloatingInput";
import FloatingTextarea from "./FloatingTextarea";
import CyberSelect from "./CyberSelect";
import Hologram from "./Hologram";
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
  { value: "aiml", label: "AI & Machine Learning" },
  { value: "other", label: "Other" },
];

const RegistrationWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const validateStep = (s: number) => {
    const e: Partial<FormData> = {};

    if (s === 1) {
      if (!formData.fullName) e.fullName = "Required";
      if (!formData.email) e.email = "Required";
      if (!formData.mobile) e.mobile = "Required";
    }

    if (s === 2) {
      if (!formData.branch) e.branch = "Required";
      if (!formData.prn) e.prn = "Required";
    }

    if (s === 3) {
      if (!formData.mission) e.mission = "Required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    const { error } = await supabase.from("wlug_registrations").insert([
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
      alert("Registration failed");
      return;
    }

    setIsSubmitted(true);
  };

  const stepIcons = [User, User, Database, Settings, Rocket];
  const StepIcon = stepIcons[step] || User;

  return (
    <>
      <motion.div className="w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 border border-primary/30 rounded">
              <StepIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-base font-bold uppercase">
                WLUG MEMBER BOARD 2 REGISTRATION
              </h1>
              <p className="text-xs text-muted-foreground">
                STEP {step} OF 4
              </p>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="1" className="space-y-4">
              <FloatingInput label="Full Name" value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)} error={errors.fullName} />
              <FloatingInput label="Email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} error={errors.email} />
              <FloatingInput label="Mobile" value={formData.mobile} onChange={(e) => updateField("mobile", e.target.value)} error={errors.mobile} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="2" className="space-y-4">
              <CyberSelect label="Branch" value={formData.branch} onChange={(v) => updateField("branch", v)} options={branchOptions} error={errors.branch} />
              <FloatingInput label="PRN" value={formData.prn} onChange={(e) => updateField("prn", e.target.value)} error={errors.prn} />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="3">
              <FloatingTextarea label="Why join WLUG?" value={formData.mission} onChange={(e) => updateField("mission", e.target.value)} error={errors.mission} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          {step > 1 && <button onClick={() => setStep(step - 1)}>Back</button>}
          {step < 4 ? (
            <button onClick={() => validateStep(step) && setStep(step + 1)}>
              Continue
            </button>
          ) : (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </motion.div>

      {/* ✅ HOLOGRAM CARD BELOW FORM */}
      {isSubmitted && <Hologram name={formData.fullName} />}
    </>
  );
};

export default RegistrationWizard;
