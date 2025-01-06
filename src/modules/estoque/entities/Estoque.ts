import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('estoque')
class Estoque{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    qtd_estoque: number;
}

export default Estoque
