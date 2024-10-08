const a:any = 10000;
console.log(a)

const deploy = (repo:string, app:string)=>{
    console.log(repo, app);
} 

deploy("r","a");

export {};


/*  
    - Make a directory for the application.
    - Deploy the application in that directory.
    - Map this application to a specific port using nginx.
    Optional:
    - Make dummy domain name and map it to that port (nginx).
*/