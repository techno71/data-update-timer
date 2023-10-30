import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TblDataSchema, Tbl_Data } from './base/shcemas/table.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.sotzkcj.mongodb.net/${process.env.DB_NAME}`,
    ),
    // MongooseModule.forRoot(`mongodb://localhost:27017/${process.env.DB_NAME}`),
    MongooseModule.forFeature([{ name: Tbl_Data.name, schema: TblDataSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
