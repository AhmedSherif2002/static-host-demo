const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/hosting-app");

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