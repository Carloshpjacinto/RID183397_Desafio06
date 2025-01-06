import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddIdProdutoEmPedidos1736143848365 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'pedidos',
            new TableColumn({
                name: 'id_produto',
                type: 'integer',
                isNullable: true,
            })
        )
                
        await queryRunner.createForeignKey(
            'pedidos',
            new TableForeignKey({
                name: 'PedidosProdutos',
                columnNames: ['id_produto'],
                referencedTableName: 'produtos',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('pedidos', 'PedidosProdutos');
        await queryRunner.dropColumn('pedidos', 'id_produto')
    }
}
