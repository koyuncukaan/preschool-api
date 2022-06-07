require("express-async-errors");
require("dotenv").config();
require("express-async-errors");

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Connect to MongoDB
const connectDB = require("./db/connect");

//routers
const authRouter = require("./routes/authRoutes");

//middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const players = require("./routes/player");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  // console.log(req.cookies);
  console.log(req.signedCookies);
  res.send("preschool api");
});
app.use("/api/v1/players", players);
app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
