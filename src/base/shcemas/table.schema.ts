import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TblDataDocument = HydratedDocument<Tbl_Data>;

@Schema()
export class Tbl_Data {
  @Prop()
  data: number;

  @Prop()
  input_data: number;
}

export const TblDataSchema = SchemaFactory.createForClass(Tbl_Data);
