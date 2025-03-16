// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { sendEmail } from "./utils/mail";


// Variables
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.error(error);
  }
});

app.post("/mail", async (req, res) => {
  try {
    const { naam, voornaam, geboortedatum, haarkleur, lengte, geslacht, opmerking } = req.body;
    const data = {
      naam,
      voornaam,
      geboortedatum,
      haarkleur,
      lengte,
      geslacht,
      opmerking,
      subject: "Nieuwe Formulier In"
    };
    await sendEmail(data);
    res.status(200).json({ message: "E-mail verzonden!" });
  } catch (error) {
    res.status(500).json({ message: "Fout bij verzenden van e-mail" });
  }
});

// Server Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
