const express = require("express");
const app = express();
app.use(express.json());
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];
app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/api/course", (req, res) => {
  res.send(courses);
});

app.post("/api/course", (req, res) => {
  let course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port 3000.. or ${port}`);
});
