import { ApiProperty } from '@nestjs/swagger';

export class CreateTableDataDto {
  @ApiProperty({ default: 20 })
  input_data: number;
  @ApiProperty({ default: 49573124 })
  random_id: number;
}
