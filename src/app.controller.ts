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
      const allData = await this.appService.findAllTableData();
      return allData;
    } catch (error) {
      throw error;
    }
  }
}
