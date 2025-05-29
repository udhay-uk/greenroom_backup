import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

interface Union {
  id: number;
  name: string;
  description: string;
  localNumber: string;
  contactEmail: string;
}

const UnionSettings = () => {
  const [unions, _setUnions] = useState<Union[]>([
    {
      id: 1,
      name: "Local 123",
      description: "Electricians Union",
      localNumber: "123",
      contactEmail: "electric@union.org",
    },
    {
      id: 2,
      name: "Local 456",
      description: "Plumbers Union",
      localNumber: "456",
      contactEmail: "XXXXXXXXXXXXXXX",
    },
  ]);

  const [_newUnion, setNewUnion] = useState({
    name: "",
    description: "",
    localNumber: "",
    contactEmail: "",
  });

  const [editId, _setEditId] = useState<number | null>(null);
  const [editUnion, setEditUnion] = useState<Partial<Union>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    forEdit = false
  ) => {
    const { name, value } = e.target;
    if (forEdit) {
      setEditUnion((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewUnion((prev) => ({ ...prev, [name]: value }));
    }
  };
  return (
    <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "#1976d2",
          color: "#fff",
          p: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h5">Union Settings</Typography>
          <Typography variant="subtitle1">
            Manages the list of unions applicable to the production.
          </Typography>
          <Typography variant="body2">
            Add unions to the company so union members can be properly
            onboarded.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2, pb: 0 }}>
        <Button
          variant="contained"
          sx={{
            color: "#fff",
            bgcolor: "#1976d2",
            fontWeight: "bold",
            boxShadow: 2,
            "&:hover": { bgcolor: "#1976d8" },
          }}
        >
          + Add Union
        </Button>
      </Box>
      {/* Content */}
      <Box sx={{ p: 4 }}>
        {/* Union List */}
        <List>
          {unions.map((union) => (
            <Box key={union.id}>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  editId === union.id ? (
                    <>
                      <IconButton>
                        <SaveIcon />
                      </IconButton>
                      <IconButton>
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )
                }
              >
                <ListItemText
                  primary={
                    editId === union.id ? (
                      <>
                        <TextField
                          label="Union Name"
                          name="name"
                          value={editUnion.name}
                          onChange={(e) => handleChange(e, true)}
                          sx={{ mr: 2, width: "45%" }}
                        />
                        <TextField
                          label="Local Number"
                          name="localNumber"
                          value={editUnion.localNumber}
                          onChange={(e) => handleChange(e, true)}
                          sx={{ width: "45%" }}
                        />
                      </>
                    ) : (
                      `${union.name} (Local ${union.localNumber})`
                    )
                  }
                  secondary={
                    editId === union.id ? (
                      <>
                        <TextField
                          label="Description"
                          name="description"
                          fullWidth
                          value={editUnion.description}
                          onChange={(e) => handleChange(e, true)}
                          sx={{ mb: 1 }}
                        />
                        <TextField
                          label="Contact Email"
                          name="contactEmail"
                          fullWidth
                          value={editUnion.contactEmail}
                          onChange={(e) => handleChange(e, true)}
                        />
                      </>
                    ) : (
                      <>
                        {union.description}
                        <br />
                        Contact: {union.contactEmail}
                      </>
                    )
                  }
                />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default UnionSettings;
