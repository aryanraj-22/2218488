import React, { useState } from "react";
import axios from "axios";
import { Container, Paper, Typography } from "@mui/material";
import UrlForm from "../components/UrlForm";
import ResultDisplay from "../components/ResultDisplay";

const API_BASE = "http://192.168.56.1:3001";

const ShortenerPage = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleShorten = async (data) => {
    try {
      const res = await axios.post(`${API_BASE}/shorturls, data`);
      setResult(res.data);
      setError("");
    } catch (err) {
      setResult(null);
      setError(err.response?.data?.message || "Error occurred.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          AffordMed URL Shortener
        </Typography>
        <UrlForm onSubmit={handleShorten} />
        {error && (
          <Typography color="error" variant="body2" mt={2}>
            {error}
          </Typography>
        )}
        <ResultDisplay result={result} />
      </Paper>
    </Container>
  );
};

export default ShortenerPage;