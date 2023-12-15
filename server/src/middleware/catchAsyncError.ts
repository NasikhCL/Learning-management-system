import { NextFunction, Request, Response } from "express";

interface IFunction {
    (req: Request, res: Response, next: NextFunction): Promise<unknown>;
  }

const catchAsyncError = (theFunc:IFunction) => ( req:Request, res:Response, next:NextFunction)=>{
    Promise.resolve(theFunc(req, res, next)).catch(next);
}

export default catchAsyncError;