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
  const { users } = JSON.parse(data);
  console.log("Body", req.body);
  const newUsers = {
    id: `${users.length + 1}`,
    name: req.body.name,
    age: req.body.age,
  };
  users.push(newUsers);
  fs.writeFileSync("./users.json", JSON.stringify({ users }));
  res.status(201).json({ user: newUsers });
});

app.put("/users/:userId", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data);
  const findIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.userId)
  );
  if (findIndex > -1) {
    users[findIndex].name = req.body.name;
    fs.writeFileSync("./users.json", JSON.stringify({ users }));

    res.status(200).json({ user: users[findIndex] });
  } else {
    res.status(400).json({ message: "Not found user id" });
  }
});

app.delete("/users/:id", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data);
  const findIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  if (findIndex > -1) {
    const deletedUser = users.splice(findIndex, 1);
    fs.writeFileSync("./users.json", JSON.stringify({ users }));
    res.status(200).json({ user: deletedUser[0] });
  } else {
    res.status(400).json({ message: "Not found user id" });
  }
});

app.listen(8000, () => {
  console.log("Server is runnig at localhost:8000");
});
