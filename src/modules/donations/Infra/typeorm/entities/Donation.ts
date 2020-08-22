import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/Infra/typeorm/entities/User';
import Supplier from '@modules/suppliers/Infra/typeorm/entities/Supplier';

@Entity('donations')
class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.donation, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  supplier_id: string;

  @ManyToOne(() => Supplier, supplier => supplier.donation, { eager: true })
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Donation;
