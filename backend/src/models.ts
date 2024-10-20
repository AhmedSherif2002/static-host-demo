import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/hosting-app");

const appsSchema = new mongoose.Schema({
    appName: String,
    port: Number,
    repo: String
});

const apps = mongoose.model("apps", appsSchema);

export {
    apps
}