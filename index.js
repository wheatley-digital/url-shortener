import express from "express";
import axios from "axios";
import "dotenv/config";

// Define Variables
const port = process.env.PORT;
const token = process.env.TOKEN;
const groupGuid = process.env.GROUPGUID;
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

// Use express framework
const app = express();

// Serve public folder to server
app.use(express.static("public"));

// Use express middleware
app.use(express.urlencoded({ extended: true }));

// Listen for requests on specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/get-shortened-url", async (req, res) => {
  const longURL = req.body["longURL"];
  const data = { group_guid: groupGuid, domain: "bit.ly", long_url: longURL };
  const result = await axios.post(
    "https://api-ssl.bitly.com/v4/shorten",
    data,
    config
  );
  res.render("index.ejs", { content: result.data.link });
});
