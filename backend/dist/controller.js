"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const { exec } = require("child_process");
const deploy = (repo, app) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const found = yield models_1.apps.find({ name: app });
        if (found.length !== 0) {
            console.log(found);
            throw ("Application name is already used");
        }
        const maxPort = (_a = (yield models_1.apps.find({}).sort({ port: -1 }))[0]) === null || _a === void 0 ? void 0 : _a.port;
        const port = maxPort ? maxPort + 1 : 3500;
        console.log(maxPort, port);
        cloneRepo(repo, app, port);
    }
    catch (err) {
        console.log(err);
    }
});
const cloneRepo = (repo, appName, port) => {
    const cloneRepo = exec(`git clone ${repo} ~/static-apps/${appName}`);
    cloneRepo.stdout.on("data", (data) => {
        console.log(data);
    });
    cloneRepo.stderr.on("data", (error) => {
        console.error(error);
    });
    cloneRepo.on("close", (code) => {
        console.log(`Process exited with code ${code}`);
        if (code === 0) {
            console.log("done");
            update(repo, appName, port);
        }
    });
};
const update = (repo, appName, port) => __awaiter(void 0, void 0, void 0, function* () {
    const inserted = yield models_1.apps.create({ appName, repo, port });
    console.log(inserted);
});
deploy("https://github.com/AhmedSherif2002/statictest.git", "app2");
/*
    - Make a directory for the application.
    - Deploy the application in that directory.
    - Map this application to a specific port using nginx.
    Optional:
    - Make dummy domain name and map it to that port (nginx).
*/ 
