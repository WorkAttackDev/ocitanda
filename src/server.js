import { config } from "dotenv";
import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import session from "express-session";
import passport from "passport";
import FileStore from "session-file-store";
import initStrategy from "./passport";

config();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
const app = express();
const sfs = FileStore(session);

app.use(express.urlencoded({ extended: false }));

initStrategy(passport);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new sfs({
      ttl: 60 * 60 * 24,
      path: "./src/sessions",
      minTimeout: 1000,
      maxTimeout: 5000,
    }),
  })
);

app.use(compression({ threshold: 0 }));
app.use(sirv("static", { dev }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  return sapper.middleware({
    session: () => {
      return {
        isAuth: req.isAuthenticated(),
        user: req.user,
      };
    },
  })(req, res, next);
});

app.listen(PORT, () => console.log(`ocitanda listening`));
