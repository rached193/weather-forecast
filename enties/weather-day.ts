import { Entity, Column, Index, PrimaryGeneratedColumn } from "typeorm";
import {
  ArrayMinSize, IsArray, IsDateString, IsDefined, IsInt,
} from 'class-validator';

@Entity()
@Index(["date", "city"], { unique: true })
export class WeatherDay {

  @PrimaryGeneratedColumn()
  id: number;

  @IsDateString()
  @IsDefined()
  @Column()
  date: Date

  @Column()
  @IsDefined()
  city: string;

  @IsInt()
  @IsDefined()
  @Column()
  max: number;

  @IsInt()
  @IsDefined()
  @Column()
  min: number;

  @IsInt()
  @IsDefined()
  @Column()
  state: number;

  @IsDefined()
  @IsArray()
  @ArrayMinSize(16)
  @Column({ array: true })
  temperatureHours: number;


}