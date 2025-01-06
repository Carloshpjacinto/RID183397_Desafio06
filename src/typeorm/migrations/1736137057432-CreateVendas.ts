import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVendas1736137057432 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'vendas',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'cod_venda',
                        type: 'integer',
                    },
                    {
                        name: 'desconto_produto',
                        type: 'integer',
                    },
                    {
                        name: 'valor_venda',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: 'qtd_vendida',
                        type: 'integer',
                    },
                    {
                        name: 'data_venda',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'data_venda_update',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vendas')
    }
}
