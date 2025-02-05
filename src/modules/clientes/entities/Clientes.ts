import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../utils/EnumRole';

@Entity('clientes')
export class Cliente{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome_cliente: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role:Role

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column()
    logradouro: string;

    @Column()
    endereco: string;

    @Column()
    numero_endereco: number;

    @Column()
    cep: string;
};
