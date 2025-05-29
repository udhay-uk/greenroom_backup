import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { Upload as UploadIcon } from '@mui/icons-material';

interface DocumentUploadProps {
  onFileUpload: (file: File) => void;
  onFileRemove: () => void;
  file: File | null;
  required?: boolean;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ 
  onFileUpload, 
  onFileRemove, 
  file, 
  required = false 
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <Box>
      {!file ? (
        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
          <input
            accept=".pdf,.jpg,.jpeg,.png"
            style={{ display: 'none' }}
            id="document-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="document-upload">
            <Button 
              variant="outlined" 
              component="span" 
              startIcon={<UploadIcon />}
            >
              Upload Document
            </Button>
          </label>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Accepted formats: PDF, JPG, PNG
          </Typography>
          {required && (
            <Typography variant="caption" color="error" display="block">
              * Required
            </Typography>
          )}
        </Paper>
      ) : (
        <Paper variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>{file.name}</Typography>
          <Button 
            color="error" 
            size="small" 
            onClick={onFileRemove}
          >
            Remove
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default DocumentUpload;