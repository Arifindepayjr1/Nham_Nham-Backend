import { Location } from 'src/modules/location/entities/location.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({
        name: 'user_name',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    userName!: string;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 255,
        nullable: false,
        unique: true,
    })
    email!: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: 255,
        nullable: false,
        select: false,
    })
    password!: string;

    @Column({
        name: 'phone_number',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    phoneNumber!: string;

    @CreateDateColumn({
        name: 'create_at',
        type: 'timestamp',
        precision: 3,
    })
    createAt?: Date;

    @OneToOne((_) => Location, {
        eager: false,
        cascade: true,
        onDelete: 'CASCADE',
        nullable: true,
    })
    @JoinColumn({
        name: 'location_id',
        referencedColumnName: 'id',
    })
    location!: Location | null;
}