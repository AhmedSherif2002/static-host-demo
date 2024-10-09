import { apps, ports } from "./models";
const { exec } = require("child_process");

const deploy = async (repo:string, app:string)=>{
    try{
        const found = await apps.find({name: app});
        if(found.length !== 0){
            console.log(found);
            throw("Application name is already used");
        }
        const maxPort = (await apps.find({}).sort({ port: -1 }))[0]?.port;
        const port = maxPort?maxPort+1:3500;
        console.log(maxPort,port);
        cloneRepo(repo, app, port);
    }catch(err){
        console.log(err);
    }
} 

const cloneRepo = (repo:string, appName:string,port:Number)=>{
    const cloneRepo = exec(`git clone ${repo} ~/static-apps/${appName}`);
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
            update(repo,appName,port);
        }
    })
}


const update = async (repo:String, appName:String, port:Number) =>{
    const inserted = await apps.create({ appName, repo, port});
    console.log(inserted);

}


deploy("https://github.com/AhmedSherif2002/statictest.git","app2");
// deploy("https://github.com/AhmedSherif2002/statictest.git","app");

export { };


/*  
    - Make a directory for the application.
    - Deploy the application in that directory.
    - Map this application to a specific port using nginx.
    Optional:
    - Make dummy domain name and map it to that port (nginx).
*/