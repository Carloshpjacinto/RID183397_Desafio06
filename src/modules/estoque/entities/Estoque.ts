import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('estoque')
export class Estoque{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    qtd_estoque: number;
};
