import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import Donation from '@modules/donations/Infra/typeorm/entities/Donation';

@Entity('suppliers')
class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  postCode: string;

  @Column()
  UF: string;

  @Column()
  city: string;

  @Column()
  line: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => Donation, donation => donation.supplier)
  @JoinColumn()
  donation: Donation;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Supplier;
