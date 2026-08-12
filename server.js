import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the compiled files from the 'dist' folder
app.use(express.static(path.join(__dirname, "dist")));

// Send all requests to index.html so React Router works
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio running on http://localhost:${PORT}`);
});