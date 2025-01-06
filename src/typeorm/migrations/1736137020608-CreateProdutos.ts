import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProdutos1736137020608 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'produtos',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'nome_produto',
                        type: 'varchar',
                    },
                    {
                        name: 'categoria',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'preco',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('produtos');
    }
}
