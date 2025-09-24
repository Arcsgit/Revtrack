// Backend/app.js or server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/test", (req, res) => {
  res.json({ message: "Backend is working with DB connection!" });
});

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});

