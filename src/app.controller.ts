import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Post()
  // async postTableData(@Body() createTableDataDto: CreateTableDataDto) {
  //   try {
  //     const res = await this.appService.createTableDataAPI(createTableDataDto);
  //     return { data: res };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  @Get('add')
  async GetTableData(
    @Query('input_data', ParseIntPipe) input_data: number,
    @Query('random_id', ParseIntPipe) random_id: number,
  ) {
    try {
      const res = await this.appService.createTableDataAPI({
        input_data,
        random_id,
      });
      return { data: res };
    } catch (error) {
      throw error;
    }
  }

  @Get('result')
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
