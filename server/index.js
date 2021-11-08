require("dotenv").config();
const express = require("express");
const cors = require("cors");
const formidable = require("express-formidable");
const database = require("./config/database");
const routes = require("./routes/routes");

const app = express();

//*
//***
//middlewares
app.use(express.json()); //read requests' body, which are json.
app.use(express.urlencoded({ extended: true })); //read requests' body which are as string.
app.use(formidable()); //read requst body if it is the type of form.
app.use(cors({ origin: "http://localhost:3000" }));

// *
// * *
// Routes

app.use(routes);

const port = 9000;
app.listen(port, () => {
  console.log(`sever running on port ${port}`);
});
