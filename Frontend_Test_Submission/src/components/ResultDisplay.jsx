import React from "react";
import { Box, Typography, Link } from "@mui/material";

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  return (
    <Box mt={3}>
      <Typography variant="subtitle1">
        Short Link:{" "}
        <Link href={result.shortLink} target="_blank" rel="noopener">
          {result.shortLink}
        </Link>
      </Typography>
      <Typography variant="body2">
        Expires at: {new Date(result.expiry).toLocaleString()}
      </Typography>
    </Box>
  );
};

export default ResultDisplay;