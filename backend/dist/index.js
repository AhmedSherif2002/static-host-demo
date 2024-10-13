"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const express = require("express");
const app = express();
// const bodyParser = require("body-parser")
app.use(express.json());
app.listen(3000, () => {
    console.log("Server is Running on port", 3000);
});
app.get("/", (req, res) => {
    console.log(req.body);
    const repo = req.body.repo_url;
    const appname = req.body.appname;
    (0, controller_1.deploy)(repo, appname, (err, port) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                message: "Error"
            });
        }
        res.json({
            success: true,
            message: "App was deployed",
            port: port
        });
    });
});
