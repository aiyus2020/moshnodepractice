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
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(details[0].message);

  let course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/course/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("the course is not valid");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.get("/api/course/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("the course is not valid");
  res.send(course);
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port 3000.. or ${port}`);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

app.delete("/api/course/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("the course is not valid");

  let index = courses.indexOf(course);
  courses.splice(index);
  res.send(course);
});
