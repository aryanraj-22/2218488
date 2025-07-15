import React, { useState } from "react";
import axios from "axios";
import { Container, Paper, TextField, Button, Typography, Box } from "@mui/material";
import StatsTable from "../components/StatsTable";

const API_BASE = "http://192.168.56.1:3001";

const StatisticsPage = () => {
  const [shortcode, setShortcode] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const handleFetchStats = async () => {
    try {
      const res = await axios.get(`${API_BASE}/shorturls/${shortcode}`);
      setStats(res.data.clicks || []);
      setError("");
    } catch (err) {
      setStats(null);
      setError("Could not fetch statistics.");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          URL Statistics
        </Typography>
        <Box display="flex" gap={2} mb={3}>
          <TextField
            fullWidth
            label="Enter Shortcode"
            value={shortcode}
            onChange={(e) => setShortcode(e.target.value)}
          />
          <Button variant="contained" onClick={handleFetchStats}>
            Get Stats
          </Button>
        </Box>
        {error && <Typography color="error">{error}</Typography>}
        <StatsTable stats={stats} />
      </Paper>
    </Container>
  );
};

export default StatisticsPage;