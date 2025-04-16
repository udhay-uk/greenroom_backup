import React, { useState, useRef, useEffect } from "react";
import {
  Save,
  Info,
  AlertCircle,
  FileCheck,
  Upload,
  X,
  Check,
  PenTool,
  Image as ImageIcon,
} from "lucide-react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  Paper,
  Avatar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface SignatureData {
  file?: File;
  preview?: string;
}

interface FormErrors {
  signaturePolicy?: string;
  signatureDraw?: string;
  signatureUpload?: string;
}

const SignatureCanvas = styled("canvas")({
  width: "100%",
  height: "200px",
  cursor: "crosshair",
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "6px",
});

const UploadArea = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  border: "2px dashed",
  borderColor: theme.palette.grey[400],
  backgroundColor: theme.palette.grey[50],
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.grey[100],
  },
}));

const SignaturePreview = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  "& img": {
    maxHeight: "160px",
    objectFit: "contain",
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: "6px",
    padding: theme.spacing(1),
  },
}));

const SignatureSetup: React.FC = () => {
  const [signaturePolicy, setSignaturePolicy] = useState<string>("");
  const [signatureMethod, setSignatureMethod] = useState<"draw" | "upload">(
    "draw"
  );
  const [drawnSignature, setDrawnSignature] = useState<string | null>(null);
  const [uploadedSignature, setUploadedSignature] =
    useState<SignatureData | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  // For signature drawing
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentLine, setCurrentLine] = useState<number[][]>([]);
  const [lines, setLines] = useState<number[][][]>([]);

  const signaturePolicyOptions = [
    { value: "single", label: "Single Signature" },
    { value: "double", label: "Double Signature" },
  ];

  const handleSignaturePolicyChange = (event: SelectChangeEvent) => {
    setSignaturePolicy(event.target.value);

    // Clear specific error when field is changed
    if (errors.signaturePolicy) {
      setErrors({ ...errors, signaturePolicy: undefined });
    }
  };

  const handleMethodChange = (method: "draw" | "upload") => {
    setSignatureMethod(method);

    // Reset signatures when switching methods
    if (method === "draw") {
      setUploadedSignature(null);
      clearCanvas();
    } else {
      setDrawnSignature(null);
    }
  };

  const handleSignatureUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      // Validate file type (only images)
      if (!file.type.startsWith("image/")) {
        setErrors({
          ...errors,
          signatureUpload: "Please upload an image file (JPG, PNG, GIF)",
        });
        return;
      }

      // For demo, we'll just store the file object and create a preview URL
      setUploadedSignature({
        file,
        preview: URL.createObjectURL(file),
      });

      // Clear error if previously set
      if (errors.signatureUpload) {
        setErrors({ ...errors, signatureUpload: undefined });
      }
    }
  };

  const removeUploadedSignature = () => {
    if (uploadedSignature?.preview) {
      URL.revokeObjectURL(uploadedSignature.preview);
    }
    setUploadedSignature(null);
  };

  // Drawing functionality
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setCurrentLine([[x, y]]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentLine([...currentLine, [x, y]]);

    // Clear canvas and redraw all lines
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all previous lines
    lines.forEach((line) => {
      if (line.length < 2) return;

      ctx.beginPath();
      ctx.moveTo(line[0][0], line[0][1]);

      for (let i = 1; i < line.length; i++) {
        ctx.lineTo(line[i][0], line[i][1]);
      }

      ctx.stroke();
    });

    // Draw current line
    if (currentLine.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(currentLine[0][0], currentLine[0][1]);

    for (let i = 1; i < currentLine.length; i++) {
      ctx.lineTo(currentLine[i][0], currentLine[i][1]);
    }

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    setIsDrawing(false);

    // Add current line to lines array
    if (currentLine.length > 1) {
      setLines([...lines, currentLine]);
      saveDrawnSignature();
    }

    setCurrentLine([]);
  };

  const saveDrawnSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get signature as data URL
    const signatureDataURL = canvas.toDataURL("image/png");
    setDrawnSignature(signatureDataURL);

    // Clear error if previously set
    if (errors.signatureDraw) {
      setErrors({ ...errors, signatureDraw: undefined });
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setLines([]);
    setCurrentLine([]);
    setDrawnSignature(null);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!signaturePolicy) {
      newErrors.signaturePolicy = "Please select a signature policy";
    }

    // Validate signature based on method
    if (signatureMethod === "draw" && !drawnSignature) {
      newErrors.signatureDraw = "Please draw your signature";
    } else if (signatureMethod === "upload" && !uploadedSignature) {
      newErrors.signatureUpload = "Please upload a signature image";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSaving(true);

      // Simulate API call
      setTimeout(() => {
        setSaveSuccess(true);
        setIsSaving(false);

        // Reset success message after a delay
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);

        console.log("Form submitted with data:", {
          signaturePolicy,
          signatureMethod,
          signature:
            signatureMethod === "draw" ? drawnSignature : uploadedSignature,
        });
      }, 1500);
    }
  };

  // Initialize canvas after component mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000";
      }
    }
  }, []);

  return (
    <Box sx={{ backgroundColor: "grey.50", minHeight: "100vh" }}>
      <Box
        component="header"
        sx={{ backgroundColor: "background.paper", boxShadow: 1 }}
      >
        <Box
          sx={{
            maxWidth: "7xl",
            mx: "auto",
            px: { xs: 2, sm: 3, lg: 4 },
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Greenroom Payroll
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
              JS
            </Avatar>
          </Box>
        </Box>
      </Box>

      <Box
        component="main"
        sx={{
          maxWidth: "3xl",
          mx: "auto",
          px: { xs: 2, sm: 3, lg: 4 },
          py: 4,
        }}
      >
        {/* <Box sx={{ mb: 3 }}>
          <Button 
            href="/dashboard" 
            startIcon={<ChevronLeft size={20} />}
            sx={{ textTransform: 'none' }}
          >
            Back to Dashboard
          </Button>
        </Box> */}

        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "primary.light" }}>
                <FileCheck color="#2563eb" />
              </Avatar>
            }
            title="Signature Setup"
            subheader="Add signatures for checks and documents"
            sx={{ borderBottom: "1px solid", borderColor: "divider" }}
          />

          <CardContent>
            <Alert severity="info" icon={<Info size={20} />} sx={{ mb: 3 }}>
              Your signature will be used on checks and official payroll
              documents. You can choose to have one signature or require two
              signatures for added security.
            </Alert>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ "& > * + *": { mt: 3 } }}
            >
              {/* Signature Policy */}
              <FormControl fullWidth error={!!errors.signaturePolicy}>
                <InputLabel id="signaturePolicy-label">
                  Signature Policy *
                </InputLabel>
                <Select
                  labelId="signaturePolicy-label"
                  id="signaturePolicy"
                  value={signaturePolicy}
                  label="Signature Policy *"
                  onChange={handleSignaturePolicyChange}
                >
                  <MenuItem value="">
                    <em>-- Select Signature Policy --</em>
                  </MenuItem>
                  {signaturePolicyOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.signaturePolicy && (
                  <FormHelperText>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <AlertCircle size={16} />
                      <span>{errors.signaturePolicy}</span>
                    </Stack>
                  </FormHelperText>
                )}
                <FormHelperText>
                  Single Signature: One signature required on checks and
                  documents.
                  <br />
                  Double Signature: Two signatures required for enhanced
                  security.
                </FormHelperText>
              </FormControl>

              {/* Signature Method Selection */}
              <Stack spacing={2}>
                <Typography variant="body1" fontWeight="medium">
                  Add Your Signature *
                </Typography>

                <Stack direction="row" spacing={2}>
                  <Button
                    variant={
                      signatureMethod === "draw" ? "contained" : "outlined"
                    }
                    startIcon={<PenTool size={16} />}
                    onClick={() => handleMethodChange("draw")}
                    sx={{ textTransform: "none" }}
                  >
                    Draw Signature
                  </Button>
                  <Button
                    variant={
                      signatureMethod === "upload" ? "contained" : "outlined"
                    }
                    startIcon={<ImageIcon size={16} />}
                    onClick={() => handleMethodChange("upload")}
                    sx={{ textTransform: "none" }}
                  >
                    Upload Image
                  </Button>
                </Stack>

                {/* Signature Draw Panel */}
                {signatureMethod === "draw" && (
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <SignatureCanvas
                      ref={canvasRef}
                      width={500}
                      height={200}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={1}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Draw your signature using your mouse or touchpad
                      </Typography>
                      <Button
                        size="small"
                        onClick={clearCanvas}
                        sx={{ textTransform: "none" }}
                      >
                        Clear
                      </Button>
                    </Stack>

                    {errors.signatureDraw && (
                      <Alert
                        severity="error"
                        icon={<AlertCircle size={16} />}
                        sx={{ mt: 1 }}
                      >
                        {errors.signatureDraw}
                      </Alert>
                    )}
                  </Paper>
                )}

                {/* Signature Upload Panel */}
                {signatureMethod === "upload" && (
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    {!uploadedSignature ? (
                      <>
                        <label htmlFor="signatureUpload">
                          <UploadArea elevation={0}>
                            <Upload
                              size={40}
                              color="#9ca3af"
                              style={{ marginBottom: "8px" }}
                            />
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              gutterBottom
                            >
                              Drag and drop your signature image, or click to
                              browse
                            </Typography>
                            <Button
                              variant="outlined"
                              component="span"
                              sx={{ textTransform: "none" }}
                            >
                              Select File
                            </Button>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              mt={1}
                            >
                              Supported formats: JPG, PNG, GIF (max 2MB)
                            </Typography>
                          </UploadArea>
                        </label>
                        <input
                          type="file"
                          id="signatureUpload"
                          name="signatureUpload"
                          accept="image/*"
                          onChange={handleSignatureUpload}
                          style={{ display: "none" }}
                        />
                      </>
                    ) : (
                      <SignaturePreview>
                        <img
                          src={uploadedSignature.preview}
                          alt="Uploaded Signature"
                        />
                        <IconButton
                          size="small"
                          onClick={removeUploadedSignature}
                          sx={{
                            position: "absolute",
                            top: -8,
                            right: -8,
                            bgcolor: "error.light",
                            color: "error.main",
                            "&:hover": {
                              bgcolor: "error.light",
                            },
                          }}
                        >
                          <X size={16} />
                        </IconButton>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          textAlign="center"
                          mt={1}
                        >
                          {uploadedSignature.file?.name}
                        </Typography>
                      </SignaturePreview>
                    )}

                    {errors.signatureUpload && (
                      <Alert
                        severity="error"
                        icon={<AlertCircle size={16} />}
                        sx={{ mt: 1 }}
                      >
                        {errors.signatureUpload}
                      </Alert>
                    )}
                  </Paper>
                )}
              </Stack>

              {/* Success Message */}
              {saveSuccess && (
                <Alert severity="success" icon={<Check size={20} />}>
                  Signature settings saved successfully
                </Alert>
              )}

              {/* Form Actions */}
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={2}
                pt={3}
                sx={{ borderTop: 1, borderColor: "divider" }}
              >
                <Button variant="outlined" sx={{ textTransform: "none" }}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSaving}
                  startIcon={isSaving ? null : <Save size={16} />}
                  sx={{ textTransform: "none" }}
                >
                  {isSaving ? (
                    <>
                      <CircularProgress size={16} sx={{ mr: 1 }} />
                      Saving...
                    </>
                  ) : (
                    "Save Signature"
                  )}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SignatureSetup;
