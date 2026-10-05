import express from "express";
import bodyParser from "body-parser";
import { PORT } from "./config/envConfig.js";
const app = express();

const setupAndStartServer = () => {

   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended: true}));

    app.listen(PORT, ()=> {
       console.log(`server started at ${PORT}`);
    })
}
setupAndStartServer();