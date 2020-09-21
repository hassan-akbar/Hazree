import * as express from "express";
import { Application } from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { router } from "./router";
import * as acl from "./hazree.config";

require("dotenv").config();

const PORT = process.env.PORT || process.env.SERVER_PORT;
const app: Application = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(router(acl));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

mongoose.connect(
  `${process.env.MONGO_PATH}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log("DB connected");
    }
  }
);
