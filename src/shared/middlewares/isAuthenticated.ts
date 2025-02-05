import { Request, Response, NextFunction } from "express"
import AppError from "../errors/AppError";
import { Secret, verify } from "jsonwebtoken";
import { ITokenPayLoad } from "../models/ITokenPayload";

export default function isAuthenticated(

    req: Request,
    res: Response,
    next: NextFunction,
): void{

    const authHeader = req.headers.authorization;

    if(!authHeader) throw new AppError('JWT Token is missing.');

    const [, token] = authHeader.split(' ');

    try{

        const decodedToken = verify(token, process.env.APP_SECRET as Secret);

        const {id, role} = decodedToken as ITokenPayLoad;

        req.user = {

            id: id,
            role: role,
        };

        return next();

    }catch{

        throw new AppError('Invalid JWT Token.');
    }
}
