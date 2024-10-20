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

app.post("/uploadProject", async (req: Request, res: Response)=>{
    console.log(req.body);
    const repo = req.body.url;  
    const appname = req.body.projectName;
    try {
        const port = await deploy(repo, appname);
        res.json({
            success: true,
            message: "App was deployed",
            port: port 
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        });
    }
})