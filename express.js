const Joi = require("joi");
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
  const schema = {
    name: Joi.string().min(3).required(),
  };
  let result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  let course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/course/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("the course is not valid");

  const schema = {
    name: Joi.string().min(3).required(),
  };
  let result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});

app.get("/api/course/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("the course is not valid");
  res.send(course);
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port 3000.. or ${port}`);
});
