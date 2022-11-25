import { ApiProperty } from '@nestjs/swagger';
import { Cart } from 'src/carts/entities/cart.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  price: number;

  @Column()
  @ApiProperty()
  types: string;

  @Column()
  @ApiProperty()
  picture: string;

  @Column({ default: true })
  @ApiProperty()
  available: boolean;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ApiProperty()
  @OneToMany(() => Cart, (cart) => cart.id)
  cart: Cart[];

  @BeforeInsert()
  @BeforeUpdate()
  async normalizeAndUpperCase() {
    this.name =
      this.name[0].toUpperCase() +
      this.name
        .slice(1)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
  }
}
