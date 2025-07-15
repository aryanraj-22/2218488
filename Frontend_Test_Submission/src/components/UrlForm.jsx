import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const UrlForm = ({ onSubmit }) => {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!url.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    setError("");
    onSubmit({
      url,
      validity: validity ? parseInt(validity) : undefined,
      shortcode: shortcode || undefined,
    });

    setUrl("");
    setValidity("");
    setShortcode("");
  };

  return (
    <Box mt={2}>
      <TextField
        fullWidth
        label="Original Long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Validity (in minutes)"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
        type="number"
        margin="normal"
      />
      <TextField
        fullWidth
        label="Custom Shortcode"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
        margin="normal"
      />
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Box mt={2}>
        <Button variant="contained" onClick={handleSubmit}>
          Shorten URL
        </Button>
      </Box>
    </Box>
  );
};

export default UrlForm;