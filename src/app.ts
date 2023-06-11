import express, { NextFunction, Request, Response } from "express";
import mongoose, { Error } from "mongoose";
import routerUser from "./routes/user";
import routerCard from "./routes/card";
import { CustomError, CustomRequest } from "./services/types";

const { PORT = 3000 } = process.env;
const app = express();

app.use((req: CustomRequest, res, next) => {
  req.user = {
    _id: "6485fa9efee39c61daa02602",
  };

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use("/", routerUser);
app.use("/", routerCard);

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;
  //console.log(err)
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
