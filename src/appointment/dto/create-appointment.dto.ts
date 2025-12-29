import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  Matches,
} from 'class-validator';

export class CreateAppointmentDto {
  /** Selected provider from dropdown */
  @IsMongoId()
  @IsNotEmpty()
  providerId: string;

  /** Appointment type (e.g. Consultation, Follow-up) */
  @IsString()
  @IsNotEmpty()
  appointmentType: string;

  /** Date in YYYY-MM-DD format */
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format',
  })
  date: string;

  /** Start time (HH:mm or hh:mm AM/PM depending on frontend) */
  @IsString()
  @IsNotEmpty()
  startTime: string;

  /** End time (HH:mm or hh:mm AM/PM) */
  @IsString()
  @IsNotEmpty()
  endTime: string;

  /** Optional notes */
  @IsString()
  @IsOptional()
  notes?: string;
}
