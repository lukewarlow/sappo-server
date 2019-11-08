import express from "express";
import {AccountController} from "./controllers/AccountController";
import mongoose from "mongoose";
import {MessagesController} from "./controllers/MessagesController";

// Create Express server
const app = express();

//Connect to mongoose
mongoose.connect("mongodb://localhost/db?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(con => {
        con.connection.db.dropDatabase()
    });

// Express configuration
app.set("port", process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({limit: '50mb', extended: true}));

new AccountController().registerRoutes(app);
new MessagesController().registerRoutes(app);

export default app;
