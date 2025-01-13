import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddIdEstoqueEmProdutos1736143736775 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'produtos',
            new TableColumn({
                name: 'id_estoque',
                type: 'integer',
                isNullable: true,
            })
        )

        await queryRunner.createForeignKey(
            'produtos',
            new TableForeignKey({
                name: 'ProdutosEstoque',
                columnNames: ['id_estoque'],
                referencedTableName: 'estoque',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL'
            })
        )
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('produtos', 'ProdutosEstoque');
        await queryRunner.dropColumn('produtos', 'id_estoque')
    };
};
