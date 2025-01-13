import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddIdClienteEmPedidos1736143814932 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'pedidos',
            new TableColumn({
                name: 'id_cliente',
                type: 'integer',
                isNullable: true,
            })
        )
        
        await queryRunner.createForeignKey(
            'pedidos',
            new TableForeignKey({
                name: 'PedidosClientes',
                columnNames: ['id_cliente'],
                referencedTableName: 'clientes',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL'
            })
        )
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('pedidos', 'PedidosClientes');
        await queryRunner.dropColumn('pedidos', 'id_cliente')
    };
};
