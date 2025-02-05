import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

export const authorize = (allowedRoles: string[]) => {

    try{
        return (req: Request, res: Response, next: NextFunction): void => {

            if (!req.user || !allowedRoles.includes(req.user.role)) {
    
                res.status(403).json({ message: "Acesso negado" });
                return;
            }
    
            next();
    }

    }catch{

        throw new AppError('Erro')
    }
};
