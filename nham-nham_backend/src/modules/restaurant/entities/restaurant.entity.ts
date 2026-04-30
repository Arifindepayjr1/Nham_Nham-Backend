import { Location } from 'src/common/embedded/entities/location.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Restaurant{
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
        name: 'description',
        type: 'varchar',
        length: 500,
        nullable: false,
    })
    description!: string;

    @Column({
        name: 'rating',
        type: 'decimal',
        nullable: false,
        default: 0.0,
        scale: 1,
    })
    rating!: number;

    @Column({
        name: 'banner_url',
        type: 'varchar',
        length: 1000,
        nullable: false,
    })
    bannerUrl!: string;

    @Column({
        name: 'icon_url',
        type: 'varchar',
        length: 1000,
        nullable: false,
    })
    iconUrl!: string;

    @Column({
        name: 'cover_url',
        type: 'varchar',
        length: 1000,
        nullable: false,
    })
    coverUrl!: string;

    @CreateDateColumn({
        name: 'create_at',
        type: 'timestamp',
        precision: 3,
    })
    createAt!: Date;

    @OneToOne((type) => Location, {
      eager: false,
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    @JoinColumn({
      name: 'location_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_name'
    })
    location!: Location;

    @OneToMany((type) => Category, (category) => category.restaurant, {
      eager: false,
      cascade: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    categories!: Category[];    
}