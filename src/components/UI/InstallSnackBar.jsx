import { useState, useEffect } from "react";
import { Button, Snackbar } from "@mui/material";
import useStrings from "../../hooks/useStrings";
import { InstallMobile } from "@mui/icons-material";

const InstallSnackBar = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const commonStrings = useStrings().common;
  const alertStrings = useStrings().alerts;

  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();
    setDeferredPrompt(event);
    setShowSnackbar(true);
  };

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setShowSnackbar(false);
      });
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  return (
    <Snackbar
      severity="info"
      open={showSnackbar}
      autoHideDuration={10000}
      onClose={handleCloseSnackbar}
      message={alertStrings.installAppMessage}
      action={
        <Button color="secondary" size="small" onClick={handleInstall}>
          <InstallMobile />
          {commonStrings.installButton}
        </Button>
      }
    />
  );
};

export default InstallSnackBar;
