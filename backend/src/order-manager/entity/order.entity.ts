import { CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { PartQuantity } from "./part-quantity.entity";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
    id: number;

  @CreateDateColumn()
    orderDate: string;

  @ManyToOne(() => User, (client: User) => client.orders, { eager: true })
    client: User;

  @JoinTable()
  @ManyToMany(() => PartQuantity, (partQuantity: PartQuantity) => partQuantity.orders, { cascade: true, eager: true })
    partQuantities: PartQuantity[];
}