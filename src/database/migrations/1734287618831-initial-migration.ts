import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1734287618831 implements MigrationInterface {
    name = 'InitialMigration1734287618831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`permission_resources\` DROP FOREIGN KEY \`FK_a04129bcb3c3b3c18e6c71e630d\``);
        await queryRunner.query(`ALTER TABLE \`resources\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`resources\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`resources\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`permission_resources\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`permission_resources\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`permission_resources\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`permission_resources\` DROP FOREIGN KEY \`FK_6464050847c8a47ee677b0c7bde\``);
        await queryRunner.query(`ALTER TABLE \`roles_permissions\` DROP FOREIGN KEY \`FK_337aa8dba227a1fe6b73998307b\``);
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`roles_permissions\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`roles_permissions\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`roles_permissions\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``);
        await queryRunner.query(`ALTER TABLE \`roles_permissions\` DROP FOREIGN KEY \`FK_7d2dad9f14eddeb09c256fea719\``);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permission_resources\` ADD CONSTRAINT \`FK_6464050847c8a47ee677b0c7bde\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permission_resources\` ADD CONSTRAINT \`FK_a04129bcb3c3b3c18e6c71e630d\` FOREIGN KEY (\`resource_id\`) REFERENCES \`resources\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_permissions\` ADD CONSTRAINT \`FK_7d2dad9f14eddeb09c256fea719\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_permissions\` ADD CONSTRAINT \`FK_337aa8dba227a1fe6b73998307b\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles_permissions\` DROP FOREIGN KEY \`FK_337aa8dba227a1fe6b73998307b\``);
        await queryRunner.query(`ALTER TABLE \`roles_permissions\` DROP FOREIGN KEY \`FK_7d2dad9f14eddeb09c256fea719\``);
        await queryRunner.query(`ALTER TABLE \`permission_resources\` DROP FOREIGN KEY \`FK_a04129bcb3c3b3c18e6c71e630d\``);
        await queryRunner.query(`ALTER TABLE \`permission_resources\` DROP FOREIGN KEY \`FK_6464050847c8a47ee677b0c7bde\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`roles_permissions\` ADD CONSTRAINT \`FK_7d2dad9f14eddeb09c256fea719\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_permissions\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`roles_permissions\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles_permissions\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`roles_permissions\` ADD CONSTRAINT \`FK_337aa8dba227a1fe6b73998307b\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permission_resources\` ADD CONSTRAINT \`FK_6464050847c8a47ee677b0c7bde\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permission_resources\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`permission_resources\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`permission_resources\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`resources\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`resources\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`resources\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`permission_resources\` ADD CONSTRAINT \`FK_a04129bcb3c3b3c18e6c71e630d\` FOREIGN KEY (\`resource_id\`) REFERENCES \`resources\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD PRIMARY KEY (\`id\`)`);
    }

}
