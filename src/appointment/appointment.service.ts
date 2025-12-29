import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment, AppointmentDocument } from './appointment.schema';
import { Model } from 'mongoose';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>,
  ) {}

  async createAppointment(createDto: CreateAppointmentDto): Promise<Appointment> {
    const created = new this.appointmentModel(createDto);
    return created.save();
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return this.appointmentModel.find().populate('providerId').exec();
  }

  async getAppointmentById(id: string): Promise<Appointment | null> {
    return this.appointmentModel.findById(id).populate('providerId').exec();
  }

  async updateAppointment(id: string, dto: UpdateAppointmentDto): Promise<Appointment | null> {
    return this.appointmentModel.findByIdAndUpdate(id, dto, { new: true }).populate('providerId').exec();
  }

  async patchAppointment(id: string, dto: UpdateAppointmentDto): Promise<Appointment | null> {
    return this.appointmentModel.findByIdAndUpdate(id, dto, { new: true }).populate('providerId').exec();
  }

  async deleteAppointment(id: string): Promise<Appointment | null> {
    return this.appointmentModel.findByIdAndDelete(id).exec();
  }
}