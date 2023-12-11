import { Activity } from 'src/common/enum/activity.enum';
import { Gender } from 'src/common/enum/gender.enum';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
	@PrimaryColumn()
	@Index()
	uid?: string;

	@Column({ type: 'int', nullable: false })
	height: number;

	@Column({ type: 'int', nullable: false })
	weight: number;

	@Column({ type: 'enum', enum: Activity, nullable: false })
	activity: Activity;

	@Column({ type: 'enum', enum: Gender, nullable: false })
	gender: Gender;

	@Column({ type: 'date', nullable: false })
	date_of_birth: Date;

	@Column({ type: 'date' })
	created_at?: Date;

	@Column({ type: 'date' })
	updated_at?: Date;
}
