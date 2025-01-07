import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Pedido } from "../../pedidos/entities/Pedidos";

@Entity('vendas')
export class Venda{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cod_venda: number;

    @Column()
    desconto_produto: number;

    @Column()
    valor_venda: number;

    @OneToOne(() => Pedido)
    @JoinColumn({name: 'id_pedido'})
    pedido: Pedido;

    @Column()
    qtd_vendida: number;

    @CreateDateColumn()
    data_venda: Date;

    @UpdateDateColumn()
    data_venda_update: Date;
}
