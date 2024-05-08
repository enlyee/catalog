import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('character varying')
  name: string;
  @Column('float')
  price: number;
  @Column('integer')
  count: number;

  constructor(name: string, price: number, count: number) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
}
