import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type TblDataDocument = HydratedDocument<Tbl_Data>;

@Schema()
export class Tbl_Data {
  @Prop()
  data: number;

  @Prop()
  input_data: number;

  @Prop()
  random_id: number;

  @Prop({ default: now() })
  createdAt: Date;
}

export const TblDataSchema = SchemaFactory.createForClass(Tbl_Data);
