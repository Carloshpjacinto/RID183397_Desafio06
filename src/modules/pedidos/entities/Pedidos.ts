import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cliente } from "../../clientes/entities/Clientes";
import { Produto } from "../../produtos/entities/Produtos";

@Entity('pedidos')
export class Pedido{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cod_pedido: number;

    @ManyToMany(() => Cliente)
    @JoinColumn({name: 'id_cliente'})
    cliente: Cliente;

    @ManyToMany(() => Produto)
    @JoinColumn({name: 'id_produto'})
    produto: Produto;

    @CreateDateColumn()
    data_pedido: Date;

    @UpdateDateColumn()
    data_pedido_update: Date;
}
