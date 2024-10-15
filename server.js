const express = require("express");
const app = express();
const { events } = require("./data");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/events", (req, res) => {
  const newEvents = events.map((event) => {
    const { id, name, image, date } = event;
    return { id, name, image, date };
  });
  res.json(newEvents);
});

app.get("/api/events/:eventID", (req, res) => {
  const { eventID } = req.params;
  const singleEvent = events.find((event) => event.id === Number(eventID));
  if (!singleEvent) {
    return res.status(404).send("Event Does Not Exist");
  }
  res.json(singleEvent);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000....");
});
