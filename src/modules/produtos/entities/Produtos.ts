import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Estoque } from "../../estoque/entities/Estoque";

@Entity('produtos')
export class Produto{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome_produto: string;

    @Column()
    categoria: string;

    @ManyToMany(() => Estoque)
    @JoinColumn({name: 'id_estoque'})
    estoque: Estoque;

    @Column()
    preco: number;

}
