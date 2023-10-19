import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TblDataSchema, Tbl_Data } from './base/shcemas/table.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/tableDataDB'),
    MongooseModule.forFeature([{ name: Tbl_Data.name, schema: TblDataSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
