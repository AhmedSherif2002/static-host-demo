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
exports.deploy = void 0;
const models_1 = require("./models");
const { exec } = require("child_process");
const fs = require("fs");
const deploy = (repo, app, cb) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // const found = await apps.find({appName: app});
        // if(found.length !== 0){
        //     console.log(found);
        //     throw("Application name is already used");
        // }
        const maxPort = (_a = (yield models_1.apps.find({}).sort({ port: -1 }))[0]) === null || _a === void 0 ? void 0 : _a.port;
        const port = maxPort ? maxPort + 1 : 3500;
        console.log(maxPort, port);
        cloneRepo(repo, app, port, cb);
    }
    catch (err) {
        cb(err);
        console.log(err);
    }
});
exports.deploy = deploy;
const cloneRepo = (repo, appName, port, cb) => {
    const cloneRepo = exec(`git clone ${repo} /var/www/${appName}`);
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
            nginxConf(appName, port, cb);
            update(repo, appName, port);
        }
        else
            cb(code);
    });
};
const update = (repo, appName, port) => __awaiter(void 0, void 0, void 0, function* () {
    const inserted = yield models_1.apps.create({ appName, repo, port });
    console.log(inserted);
});
const nginxConf = (app, port, cb) => {
    const content = `
    server {
        listen ${port};
        listen [::]:${port};

        server_name example.ubuntu.com;

        root /var/www/${app};
        # index index.html;

        location / {
                try_files $uri $uri/ =404;
        }
    }
    `;
    fs.appendFile("/etc/nginx/sites-enabled/conf", content, (e) => {
        if (e) {
            return console.log(e);
        }
        const reset = exec("service nginx restart");
        reset.on("close", (code) => {
            if (code !== 0)
                return cb(code);
            cb(null, port);
        });
    });
};
/*
    - Make a directory for the application.
    - Deploy the application in that directory.
    - Map this application to a specific port using nginx.
    Optional:
    - Make dummy domain name and map it to that port (nginx).
*/ 
