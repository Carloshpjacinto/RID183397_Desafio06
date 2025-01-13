import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clientes')
export class Cliente{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome_cliente: string;

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
