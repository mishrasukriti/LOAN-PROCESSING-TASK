const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 4050;

//IMPORT ROUTES


//SETTING MIDDLEWARE

app.use(express.json(), cors());
app.use(cors()) 

const bankManagerRoute = require("./routes/bankManagerAuth/bankManagerAuth");
const bankManagerActivityRoute = require("./routes/bankManagerAuth/bankManagerActivity");

const crManagerRoute = require("./routes/crManagerAuth/crManagerAuth");
const crmActivityRoute = require("./routes/crManagerAuth/crmActivity");

const userRoute = require("./routes/userAuth/userAuth");
const userActivityRoute = require("./routes/userAuth/userActivity");

dotenv.config();

//CONNECTION TO DATABASE

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db  ")
);



//ROUTE MIDDLEWARE

app.use("/api/bankManager", bankManagerRoute);
app.use("/api/bankManagerActivity", bankManagerActivityRoute);

app.use("/api/crManager", crManagerRoute);
app.use("/api/crmActivity", crmActivityRoute);

app.use("/api/user", userRoute);
app.use("/api/userActivity", userActivityRoute);

app.listen(PORT, () => console.log(`server up and running at  ${PORT}`));


