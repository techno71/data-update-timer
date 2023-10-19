import { ApiProperty } from '@nestjs/swagger';

export class CreateTableDataDto {
  @ApiProperty({ default: 10 })
  input_data: number;
}
