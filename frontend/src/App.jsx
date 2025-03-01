import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Box,
  Grid,
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "JavaScript", value: 40 },
  { name: "Python", value: 30 },
  { name: "Java", value: 15 },
  { name: "C++", value: 10 },
  { name: "Go", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

function App() {
  const [language, setLanguage] = useState("");
  const [date, setDate] = useState("");
  const [topics, setTopics] = useState("");

  const handleGenerateQuestion = () => {
    console.log("Generating question for:", { language, date, topics });
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 5 }}>
        {/* Left: Form Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              Daily Code Tracker
            </Typography>
            <Box component="form" sx={{ mt: 3 }}>
              <TextField
                select
                label="Select Language"
                fullWidth
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                sx={{ mb: 2 }}
              >
                {["JavaScript", "Python", "Java", "C++", "Go"].map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {lang}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Select Date"
                type="date"
                fullWidth
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Interested Topics"
                fullWidth
                placeholder="e.g., Algorithms, Data Structures"
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
                sx={{ mb: 3 }}
              />

              <Grid container justifyContent="center">
                <Button variant="contained" color="primary" onClick={handleGenerateQuestion}>
                  Get Coding Question
                </Button>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Right: Analytics Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              Language Usage Analytics
            </Typography>
            <PieChart width={300} height={300}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
