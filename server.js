const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const users = [{ id: 1, name: "Naraa", age: 20 }];

app.get("/users", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const obData = JSON.parse(data);
  console.log("data", data);
  res.status(200).json({ users: obData.employees });
});

// app.get("/about", (req, res) => {
//   res.send("Hello ami");
// });

app.post("/users", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { employees } = JSON.parse(data);
  console.log("Body", req.body);
  const newUsers = {
    eid: `${employees.length + 1}`,
    ...req.body,
  };
  employees.push(newUsers);
  fs.writeFileSync("./users.json", JSON.stringify({ employees }));
  res.status(201).json({ user: newUsers });
});

app.put("/users/:userId", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { employees } = JSON.parse(data);
  const findIndex = employees.findIndex((user) => {
    return user.eid === req.params.id;
  });
  if (findIndex > -1) {
    users[findIndex].name = req.body.name;
    fs.writeFileSync("./users.json", JSON.stringify({ employees }));

    res.status(200).json({ user: users[findIndex] });
  } else {
    res.status(400).json({ message: "Not found user id" });
  }
});

app.delete("/users/:id", (req, res) => {
  console.log("delete", req.params.id);
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { employees } = JSON.parse(data);
  const findIndex = employees.findIndex((user) => {
    return user.eid === req.params.id;
  });
  if (findIndex > -1) {
    const deletedUser = employees.splice(findIndex, 1);
    fs.writeFileSync("./users.json", JSON.stringify({ employees }));
    res.status(200).json({ user: deletedUser[0] });
  } else {
    res.status(400).json({ message: "Not found user id" });
  }
});

app.listen(8000, () => {
  console.log("Server is runnig at localhost:8000");
});
