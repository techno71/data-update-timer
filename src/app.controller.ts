import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTableDataDto } from './base/dto/create-tabledata.dto';

@Controller('data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async postTableData(@Body() createTableDataDto: CreateTableDataDto) {
    try {
      const res = await this.appService.createTableDataAPI(createTableDataDto);
      return { data: res };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getData() {
    try {
      return await this.appService.findOneTableData();
    } catch (error) {
      throw error;
    }
  }
  @Get('check')
  async checkHealth() {
    try {
      return 'Hello world. Health check';
    } catch (error) {
      throw error;
    }
  }
}
