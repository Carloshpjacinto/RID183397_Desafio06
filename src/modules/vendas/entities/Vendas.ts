import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Pedido from "../../pedidos/entities/Pedidos";

@Entity('Vendas')
class Venda{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cod_venda: number;

    @Column()
    desconto_produto: number;

    @Column()
    valor_venda: number;

    @ManyToMany(() => Pedido)
    @JoinColumn({name: 'id_pedido'})
    pedido: Pedido;

    @Column()
    qtd_pedido: number;

    @CreateDateColumn()
    data_venda: Date;

    @UpdateDateColumn()
    data_venda_update: Date;
}

export default Venda
