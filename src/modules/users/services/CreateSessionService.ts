import { ClienteRepository } from "../../clientes/repositories/ClienteRepository"
import { IRequest } from "../models/IRequest";
import AppError from "../../../shared/errors/AppError";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IResponse } from "../models/IResponse";

export default class CreateSessionsService{

    public async execute({email, senha}: IRequest): Promise<IResponse>{

        const user = await ClienteRepository.findByEmail(email);

        if(!user) throw new AppError('incorrect email/password combination.', 401);

        const passwordConfirmed = await compare(senha, user.senha);

        if(!passwordConfirmed) throw new AppError('incorrect email/password combination.', 401);

        const token = sign({id: user.id, role: user.role}, process.env.APP_SECRET as string, {
            expiresIn: '1d',
        });

        return {user, token};
    }
}
