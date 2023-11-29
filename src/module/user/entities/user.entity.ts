import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn()
	@PrimaryColumn()
	@Index()
	UID: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
	email: string;

	@Column({ type: 'int', nullable: false })
	height: number;

	@Column({ type: 'int', nullable: false })
	weight: number;

	@Column({ type: 'int', nullable: false })
	activity: number;

	@Column({ type: 'int', nullable: false })
	gender: number; // ganti ke enum (laki-laki & perempuan)

	@Column({ type: 'date', nullable: false })
	date_of_birth: Date;

	@Column({ type: 'date', nullable: false })
	timestamp: Date;
}
