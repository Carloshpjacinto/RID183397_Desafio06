import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Estoque } from "../../estoque/entities/Estoque";

@Entity('produtos')
export class Produto{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome_produto: string;

    @Column()
    categoria: string;

    @OneToOne(() => Estoque)
    @JoinColumn({name: 'id_estoque'})
    estoque: Estoque;

    @Column()
    preco: number;

    @Column()
    desconto: string;
}
