import { apps, ports } from "./models";
const { exec } = require("child_process");
const fs = require("fs");

const deploy = async (repo:string, app:string, cb:any)=>{
    try{
        // const found = await apps.find({appName: app});
        // if(found.length !== 0){
        //     console.log(found);
        //     throw("Application name is already used");
        // }
        const maxPort = (await apps.find({}).sort({ port: -1 }))[0]?.port;
        const port = maxPort?maxPort+1:3500;
        console.log(maxPort,port);
        cloneRepo(repo, app, port, cb);
    }catch(err){
        cb(err);
        console.log(err);
    }
} 

const cloneRepo = (repo:string, appName:string,port:Number, cb:any)=>{
    const cloneRepo = exec(`git clone ${repo} /var/www/${appName}`);
    cloneRepo.stdout.on("data", (data:any)=>{
        console.log(data);
    })
    cloneRepo.stderr.on("data", (error:any)=>{
        console.error(error);
    })
    cloneRepo.on("close", (code:any)=>{
        console.log(`Process exited with code ${code}`);
        if(code === 0){
            console.log("done")
            nginxConf(appName, port, cb);
            update(repo,appName,port);
        }else cb(code);
    })
}


const update = async (repo:String, appName:String, port:Number) =>{
    const inserted = await apps.create({ appName, repo, port});
    console.log(inserted);

}

const nginxConf = (app:string,port:Number, cb:any)=>{
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
    fs.appendFile("/etc/nginx/sites-enabled/conf", content, (e:any)=>{
        if(e){
            return console.log(e);
        }
        const reset = exec("service nginx restart");
        reset.on("close",(code:number)=>{
            if(code !== 0) return cb(code);
            cb(null,port);
        })
    })
}

// deploy("https://github.com/AhmedSherif2002/statictest.git","app",()=>0);
// deploy("https://github.com/AhmedSherif2002/statictest.git","app");

export { deploy };


/*  
    - Make a directory for the application.
    - Deploy the application in that directory.
    - Map this application to a specific port using nginx.
    Optional:
    - Make dummy domain name and map it to that port (nginx).
*/