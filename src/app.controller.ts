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
      return allData[0]
        ? {
            data:
              allData[0].input_data !== 0
                ? {
                    ...allData[0]?._doc,
                    key_s: '',
                    status: '',
                  }
                : {
                    ...allData[0]?._doc,
                    key_s:
                      'eyJ0eXAiOiJKV1Qidfg%!#%$%LCdf#*&*JhbGciOiJSUzI1NiJ9',
                    status: 'finish',
                  },
          }
        : { data: {} };
    } catch (error) {
      throw error;
    }
  }
}
