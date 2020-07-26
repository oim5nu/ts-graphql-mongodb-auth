import { Request, Response } from 'express';
import mongoose from 'mongoose';

export interface Context {
    request:Request,
    response:Response,
    dbConn: mongoose.Connection
}