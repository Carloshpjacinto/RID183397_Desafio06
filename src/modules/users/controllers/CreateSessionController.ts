import { container } from "tsyringe";
import CreateSessionsService from "../services/CreateSessionService";
import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";

export default class SessionsController{

    public async create(req: Request, res: Response): Promise<Response>{

        try{
            const {email, senha} = req.body;

            const createSession = container.resolve(CreateSessionsService);
    
            const user = await createSession.execute({
                email,
                senha,
            });
    
            return res.json(instanceToInstance(user));

        }catch(error){

            console.error('Erro no login:', error);
            return res.status(401).json({ mensagem: 'Erro interno no servidor.'});
        }
    }
}
