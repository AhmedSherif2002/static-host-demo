"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(bodyParser());
app.listen(3000, () => {
    console.log("Server is Running on port", 3000);
});
app.post("/uploadProject", (req, res) => {
    console.log(req.body);
    const repo = req.body.url;
    const appname = req.body.projectName;
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
