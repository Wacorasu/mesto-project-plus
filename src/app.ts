import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import routerUser from "./routes/user";
import routerCard from "./routes/card";
import { CustomError, CustomRequest } from "./services/types";
import { login, createUser } from "./controllers/user";
import auth from "./middlewares/auth";

const { PORT = 3000 } = process.env;
const app = express();




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb");

app.post('/login', login);
app.post('/signup', createUser);
app.use(auth)
app.use("/", routerUser);
app.use("/", routerCard);



app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
