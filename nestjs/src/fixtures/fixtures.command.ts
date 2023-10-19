import { Console, Command } from 'nestjs-console';
import { DataSource } from 'typeorm';
import * as chalk from 'chalk';

@Console()
export class FixturesCommand {
  constructor(private dataSource: DataSource) {}

  @Command({
    command: 'fixtures',
    description: 'Seed data in database',
  })
  async command() {
    await this.clearTables();
    const bankFixtures = fixtures[process.env.BANK_CODE] as any[];
    for (const fixture of bankFixtures) {
      await this.createInDatabase(fixture.model, fixture.fields);
    }

    console.log(chalk.green('Data generated'));
  }

  async clearTables() {
    await this.dataSource.dropDatabase();
    await this.dataSource.synchronize();
  }

  async createInDatabase(model: any, data: any) {
    const repository = this.getRepository(model);
    const obj = repository.create(data);
    await repository.save(obj);
  }

  getRepository(model: any) {
    return this.dataSource.getRepository(model);
  }
}

const fixtures = {
  '001': [
    {
      model: 'BankAccount',
      fields: {
        id: '6e4635ce-88d1-4e58-9597-d13fc446ee47',
        account_number: '1111',
        owner_name: 'User BBX 1',
      },
    },
    {
      model: 'BankAccount',
      fields: {
        id: '51a720b2-5144-4d7f-921d-57023b1e24c1',
        account_number: '2222',
        owner_name: 'User BBX 2',
      },
    },
  ],
  '002': [
    {
      model: 'BankAccount',
      fields: {
        id: '103cc632-78e7-4476-ab63-d5ad3a562d26',
        account_number: '3333',
        owner_name: 'User CTER 1',
      },
    },
    {
      model: 'BankAccount',
      fields: {
        id: '463b1b2a-b5fa-4b88-9c31-e5c894a20ae3',
        account_number: '4444',
        owner_name: 'User CTER 2',
      },
    },
  ],
};
