"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ports = exports.apps = void 0;
const mongoose = require("mongoose");
mongoose.connect("mongodb://172.23.192.1:27017/hosting-app");
const appsSchema = {
    appName: String,
    port: Number,
    repo: String
};
const apps = mongoose.model("apps", appsSchema);
exports.apps = apps;
const ports = mongoose.model("ports", {});
exports.ports = ports;
