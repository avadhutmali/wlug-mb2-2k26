import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import BootLoader from "@/components/BootLoader";
import LandingPage from "@/components/LandingPage";
import RegistrationModal from "@/components/RegistrationModal";

const Index = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
  }, []);

  const handleOpenRegistration = useCallback(() => {
    setIsRegistrationOpen(true);
  }, []);

  const handleCloseRegistration = useCallback(() => {
    setIsRegistrationOpen(false);
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isRegistrationOpen) {
        handleCloseRegistration();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRegistrationOpen, handleCloseRegistration]);

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Texture overlays */}
      <div className="scanline-overlay" />
      <div className="noise-overlay" />

      {/* Boot Loader */}
      <AnimatePresence mode="wait">
        {isBooting && <BootLoader onComplete={handleBootComplete} />}
      </AnimatePresence>

      {/* Main Landing Page */}
      {!isBooting && (
        <LandingPage
          onOpenRegistration={handleOpenRegistration}
          isBlurred={isRegistrationOpen}
        />
      )}

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={handleCloseRegistration}
      />
    </div>
  );
};

export default Index;
