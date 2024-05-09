import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @ApiProperty({ description: 'Product id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({ example: 'iPad', description: 'Product name' })
  @Column('character varying')
  name: string;
  @ApiProperty({ example: 120.15, description: 'Product price' })
  @Column('float')
  price: number;
  @ApiProperty({ example: 20, description: 'Product count' })
  @Column('integer')
  count: number;

  constructor(name: string, price: number, count: number) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
}
