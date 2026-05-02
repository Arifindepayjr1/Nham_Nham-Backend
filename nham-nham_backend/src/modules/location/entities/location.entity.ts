import { Entity , Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location{

    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({
        name: 'latitude',
        type: 'decimal',
        nullable: false,
    })
    latitude!: number;

    @Column({
        name: 'longitude',
        type: 'decimal',
        nullable: false,
    })
    longitude!: number;

    @Column({
        name: 'address',
        type: 'varchar',
        length: 255,
        nullable: true,
        default: null
    })
    address!: string;
}