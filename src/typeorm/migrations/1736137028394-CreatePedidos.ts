import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePedidos1736137028394 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'pedidos',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'cod_pedido',
                        type: 'integer',
                    },
                    {
                        name: 'qtd_produto_pedido',
                        type: 'integer',
                    },
                    {
                        name: 'data_pedido',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'data_pedido_update',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ]
            })
        );
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pedidos');
    };
};
