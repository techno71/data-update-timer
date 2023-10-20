import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TblDataSchema, Tbl_Data } from './base/shcemas/table.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://techno71online:s8Stsgvyn5RCZTyC@cluster0.sotzkcj.mongodb.net/tableDataDB',
    ),
    MongooseModule.forFeature([{ name: Tbl_Data.name, schema: TblDataSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
