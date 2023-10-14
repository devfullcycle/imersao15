import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'bank_accounts' })
export class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  account_number: string;

  @Column()
  owner_name: string;

  @Column({ default: 0 })
  balance: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
