import express from "express";
import AuthRouter from "./AuthRoutes/Auth.router";

export const  routes=(dependencies:any)=>{
    const routes = express.Router()
    routes.use('/auth',AuthRouter(dependencies))
    
    return routes
}