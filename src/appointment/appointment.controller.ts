import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  async getAppointments() {
    return this.appointmentService.getAllAppointments();
  }

  @Get(':id')
  async getAppointmentById(@Param('id') id: string) {
    return this.appointmentService.getAppointmentById(id);
  }

  @Post()
  async createAppointment(@Body() dto: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(dto);
  }

  @Put(':id')
  async updateAppointment(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.appointmentService.updateAppointment(id, dto);
  }

  @Patch(':id')
  async patchAppointment(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.appointmentService.patchAppointment(id, dto);
  }

  @Delete(':id')
  async deleteAppointment(@Param('id') id: string) {
    return this.appointmentService.deleteAppointment(id);
  }
}