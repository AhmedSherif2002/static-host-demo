import { deploy } from "./controller";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser());

app.listen(3000, ()=>{
    console.log("Server is Running on port", 3000);
})

app.post("/uploadProject",(req: Request, res: Response)=>{
    console.log(req.body);
    const repo = req.body.url;  
    const appname = req.body.projectName;
    deploy(repo, appname, (err:any, port?: number)=>{
        if(err){
            console.log(err);
            res.json({
                success: false,
                message: "Error"
            });
            return;
        }
        res.json({
            success: true,
            message: "App was deployed",
            port: port 
        });
    })
})