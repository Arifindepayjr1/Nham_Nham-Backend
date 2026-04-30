import { Location } from 'src/common/embedded/entities/location.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DeliveryPerson{
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name!: string;

    @Column({
        name: 'phone_number',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    phoneNumber!: string; 

    @OneToOne((type) => Location , {
      eager: false,
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    @JoinColumn({
      name: 'current_location',
      referencedColumnName: 'id',
    })
    currentLocation!: Location;
    
    
    
}