/** @format */

const express = require('express');
const dotenv = require('dotenv');
const hospitals = require('./routes/hospitals');
const auth = require('./routes/auth');
const appointments = require('./routes/appointments');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const cors = require('cors');

//load env vars
dotenv.config({ path: './config/config.env' });

const app = express();
app.use(cors());

//body parser
app.use(express.json());

//connect DB
connectDB();

app.use('/api/v1/hospitals', hospitals);
app.use('/api/v1/appointments', appointments);
app.use('/api/v1/auth', auth);
app.use(cookieParser());

// app.get("/", (req, res) => {
//   //1.
//   //res.send("<h1>Hello from express</h1>");
//   //2.
//   //res.send({ name: "Brad" });
//   //3.
//   //res.json({ name: "Brad" });
//   //4.
//   //res.sendStatus(400);
//   //5.
//   //res.status(400).json({ success: false });
//   res.status(200).json({ success: true, data: { id: 1 } });
// });

const PORT = process.env.PORT || 5002;
const server = app.listen(
  PORT,
  console.log(
    'Server running in ',
    process.env.NODE_ENV,
    ' made on port ',
    PORT
  )
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);

  server.close(() => process.exit(1));
});
