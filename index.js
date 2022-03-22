const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const errorMiddleware = require("./middleware/error");

var cors = require("cors");
const bodyParser = require("body-parser");





const domainsFromEnv = process.env.CORS_DOMAINS || "http://localhost:3000"

console.log(domainsFromEnv);

const whitelist = domainsFromEnv.split(",").map(item => item.trim())
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./routes/user");
const serviceRoute = require("./routes/service")
const appointmentRoute = require("./routes/appoinment")

app.use("/api", userRoute);
app.use("/api", serviceRoute);
app.use("/api", appointmentRoute);


// mongodb
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}
)
.then(res=>console.log("MongDb connected") );


//Handle Uncaught error

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise`);
  process.exit(1);
});

console.log(process.env.MONGODB_URI);




// Middleware for Error
app.use(errorMiddleware);



const server = app.listen(port, () => {
  console.log(`This server is running on ${port}`);
});

// Unhandled promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise`);
  server.close(() => {
    process.exit(1);
  });
});
