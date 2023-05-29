const express = require("express");
const mongoose = require("mongoose");
const BloodTable = require("./model");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home page");
});

app.post("/postData", async (req, res) => {
  try {
    const data = await BloodTable.create(req.body);
    res.status(201).send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/getData", async (req, res) => {
  try {
    const data = await BloodTable.find({}).sort({ age: 1 });
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// app.post('/getFilterData', async (req, res) => {
//     try {
//         const filterData = req.body;
//         const query = {};

//         if (filterData.name) {
//             query.name = { $regex: filterData.name, $options: 'i' }; // Add name filter to the query
//         }

//         const data = await BloodTable.find(query).sort({ 'age': 1 }); // Apply the query and sort by age
//         res.status(200).send(data);
//     } catch (err) {
//         res.status(400).send(err.message);
//     }
// });


// Filter data passed through body
app.post("/getFilterData", async (req, res) => {
  try {
    const nameData = req.body.name; // Assuming the name is passed in the request body
    const filteredData = await BloodTable.find({ name: nameData }); // Call the findByName method to filter the data by name
    res.status(200).send(filteredData);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

mongoose
  .connect(
    "mongodb+srv://ganpat:ganpat@cluster0.yleqvvq.mongodb.net/YT-CRUD?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connection Successful");
    app.listen(port, () => {
      console.log("Server listening on port " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
