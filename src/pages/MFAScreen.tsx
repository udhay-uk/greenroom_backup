import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail as MailIcon,
  ArrowLeft as ArrowLeftIcon,
  RefreshCw as RefreshCwIcon,
} from "lucide-react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import CompanyInformation from "./CompanyInformation";
import PayrollDetails from "./PayrollDetails";

const MFAScreen: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 1 hour in seconds
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const [resendCountdown, setResendCountdown] = useState<number>(30);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationSuccess, setVerificationSuccess] =
    useState<boolean>(false);

  const inputRefs = Array(6)
    .fill(0)
    .map(() => useRef<HTMLInputElement>(null));

  // Handle timer for code expiration
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  // Handle timer for resend button
  useEffect(() => {
    if (resendCountdown > 0) {
      const resendTimer = setTimeout(
        () => setResendCountdown(resendCountdown - 1),
        1000
      );
      return () => clearTimeout(resendTimer);
    } else {
      setIsResendDisabled(false);
    }
  }, [resendCountdown]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (error) setError("");

    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        if (i < 6) newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);

      if (pastedData.length < 6) {
        inputRefs[pastedData.length]?.current?.focus();
      } else {
        inputRefs[5]?.current?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsVerifying(true);

    // Simulate API verification
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (otpValue === "123456") {
      setIsVerifying(false);
      setVerificationSuccess(true);
    } else {
      setError("Invalid verification code. Please try again.");
      setIsVerifying(false);
      setVerificationSuccess(false);
    }
  };

  const handleResendCode = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setIsResendDisabled(true);
    setResendCountdown(30);
    setTimeLeft(3600);
    inputRefs[0].current?.focus();
  };

  return (
    <>
      {verificationSuccess ? (
        <PayrollDetails />
      ) : (
        <Box sx={{ mx: "auto", width: "100%", maxWidth: "sm" }}>
          <Box textAlign="center">
            <Typography
              variant="h5"
              component="h1"
              fontWeight="bold"
              color="text.primary"
            >
              Verification Required
            </Typography>
            <Typography color="text.secondary" mt={2}>
              Enter the 6-digit code sent to your email
            </Typography>
          </Box>

          <Box
            mt={8}
            bgcolor="white"
            py={8}
            px={4}
            boxShadow={3}
            borderRadius={1}
            sx={{ sm: { px: 10 } }}
          >
            <Box bgcolor="blue.50" p={3} mb={6} borderRadius={1}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <MailIcon style={{ color: "#1976d2" }} />
                <Typography variant="body2" color="#1976d2">
                  A verification code has been sent to your email address. This
                  code will expire in{" "}
                  <Typography component="span" fontWeight="medium">
                    {formatTime(timeLeft)}
                  </Typography>
                  .
                </Typography>
              </Stack>
            </Box>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Typography
                  component="label"
                  htmlFor="otp"
                  fontWeight="medium"
                  color="text.primary"
                >
                  Verification Code
                </Typography>
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  onPaste={handlePaste}
                >
                  {otp.map((digit, index) => (
                    <TextField
                      key={index}
                      inputRef={inputRefs[index]}
                      type="text"
                      inputProps={{ maxLength: 1, inputMode: "numeric" }}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      sx={{
                        width: "calc(16.66% - 4px)",
                        textAlign: "center",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 1,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: error ? "error.main" : "grey.300",
                        },
                        "&:focus-within .MuiOutlinedInput-notchedOutline": {
                          borderColor: "primary.main",
                        },
                      }}
                    />
                  ))}
                </Box>
                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isVerifying}
                  sx={{ py: 2 }}
                  onClick={handleSubmit}
                >
                  {isVerifying ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Verify"
                  )}
                </Button>
              </Stack>
            </form>

            <Box mt={4}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button
                  startIcon={<ArrowLeftIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Back to login
                </Button>
                <Button
                  onClick={handleResendCode}
                  disabled={isResendDisabled}
                  startIcon={<RefreshCwIcon />}
                  sx={{
                    textTransform: "none",
                    color: isResendDisabled ? "grey.400" : "primary.main",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {isResendDisabled
                    ? `Resend code (${resendCountdown}s)`
                    : "Resend code"}
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default MFAScreen;
