const mongoose = require("mongoose");

mongoose.connect("mongodb://172.23.192.1:27017/hosting-app");

const appsSchema = {
    appName: String,
    port: Number,
    repo: String
}

const apps = mongoose.model("apps", appsSchema);
const ports = mongoose.model("ports", {});

export {
    apps,
    ports
}