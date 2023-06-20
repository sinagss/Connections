import { forwardRef, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PropTypes from "prop-types";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackAlert = ({ alertType, message, open, close }) => {
  const handleClose = useCallback(() => {
    close(false);
  }, [close]);

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alertType} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

SnackAlert.propTypes = {
  alertType: PropTypes.oneOf(["error", "warning", "info", "success"])
    .isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default SnackAlert;
