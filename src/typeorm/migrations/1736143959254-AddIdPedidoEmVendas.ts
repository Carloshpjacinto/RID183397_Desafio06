import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddIdPedidoEmVendas1736143959254 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'vendas',
            new TableColumn({
                name: 'id_pedido',
                type: 'integer',
                isNullable: true,
            })
        )
                        
        await queryRunner.createForeignKey(
            'vendas',
            new TableForeignKey({
                name: 'VendasPedidos',
                columnNames: ['id_pedido'],
                referencedTableName: 'pedidos',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('vendas', 'VendasPedidos');
        await queryRunner.dropColumn('vendas', 'id_pedido')
    }
}
