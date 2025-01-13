import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Cliente } from "../../clientes/entities/Clientes";
import { Produto } from "../../produtos/entities/Produtos";

@Entity('pedidos')
export class Pedido{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cod_pedido: number;

    @Column()
    qtd_produto_pedido: number;

    @ManyToOne(() => Cliente)
    @JoinColumn({name: 'id_cliente'})
    cliente: Cliente;

    @ManyToOne(() => Produto)
    @JoinColumn({name: 'id_produto'})
    produto: Produto;

    @CreateDateColumn()
    data_pedido: Date;

    @UpdateDateColumn()
    data_pedido_update: Date;
};
