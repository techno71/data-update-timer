import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { CreateTableDataDto } from './base/dto/create-tabledata.dto';
import { TblDataDocument, Tbl_Data } from './base/shcemas/table.schema';
import axios from 'axios';

let isCounterFinished = false;
let isPostData = true;

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Tbl_Data.name) private tableDataModel: Model<Tbl_Data>,
  ) {}
  // isCounterFinished = false;

  async dataIncrement(x: number) {
    if (x < 2) {
      x = x + 0.02;
    }
    if (x >= 2 && x < 3) {
      x = x + 0.025;
    }
    if (x >= 3 && x < 6) {
      x = x + 0.05;
    }
    if (x >= 6) {
      x = x + 0.1;
    }

    return x;
  }
  async updateInputData(
    id: string,
    input_data: number,
    randomId: number,
  ): Promise<any> {
    try {
      return await this.tableDataModel.findOneAndUpdate(
        { _id: id },
        { input_data: input_data, random_id: randomId, createdAt: now() },
        { new: true },
      );
    } catch (error) {
      throw error;
    }
  }
  async updateTableData(id: string, data: number): Promise<any> {
    try {
      return await this.tableDataModel.findOneAndUpdate(
        { _id: id },
        { data: data, createdAt: now() },
        { new: true },
      );
    } catch (error) {
      throw error;
    }
  }

  async createData(createTableDataDto: CreateTableDataDto): Promise<any> {
    try {
      const tableDoc = await new this.tableDataModel({
        data: 1,
        input_data: createTableDataDto.input_data,
        random_id: createTableDataDto.random_id,
      });
      const newData: TblDataDocument = await tableDoc.save();

      return newData;
    } catch (error) {
      throw error;
    }
  }
  // timer for 100ms
  async timerCountUpdated(id: string, inputData: number, randomId: number) {
    try {
      const newDoc = await this.updateInputData(id, inputData, randomId);

      const firstIncrementValue = await this.dataIncrement(newDoc.data);
      let isFirstStep = true;
      let updatedData;
      if (isFirstStep) {
        updatedData = await this.updateTableData(id, firstIncrementValue);
        isFirstStep = false;
      }

      const myInterval = setInterval(async () => {
        // let i = 0;
        // console.log(
        //   'checking: data,',
        //   updatedData.data,
        //   'input_data',
        //   updatedData.input_data,
        // );

        const data2 = await this.dataIncrement(updatedData.data);
        updatedData = await this.updateTableData(id, data2);

        // console.log(
        //   'parseInt(updatedData.data) >= parseInt(updatedData.input_data) ',
        //   parseInt(updatedData.data) >= parseInt(updatedData.input_data),
        // );
        if (parseInt(updatedData.data) >= parseInt(updatedData.input_data)) {
          axios
            .post('https://signal.pazzol.com/api/rand-x-updae', {
              key_s: 'eyJ0eXAiOiJKV1Qidfg%!#%$%LCdf#*&*JhbGciOiJSUzI1NiJ9',
              status: 'finish',
              random_id: randomId,
            })
            .then(async (response) => {
              // console.log('axios response::::: ', response.data);
              if (response.data.status === 'success') {
                updatedData = this.updateTableData(id, 1);
                this.updateInputData(id, 0, randomId);
                isCounterFinished = true;
                isPostData = true;

                clearInterval(myInterval);
              } else {
                // console.log('start again: ' + ++i);
                // console.log('updatedData.input_data', updatedData.input_data);

                updatedData = await this.updateTableData(id, 1);

                // for the first step
                const firstIncrementValue = await this.dataIncrement(
                  updatedData.data,
                );
                let isFirstStepUpdated = true;

                if (isFirstStepUpdated) {
                  updatedData = await this.updateTableData(
                    id,
                    firstIncrementValue,
                  );
                  isFirstStepUpdated = false;
                }

                isPostData = true;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }, 100);

      return isCounterFinished
        ? {
            key_s: 'eyJ0eXAiOiJKV1Qidfg%!#%$%LCdf#*&*JhbGciOiJSUzI1NiJ9',
            status: 'finish',
            random_id: randomId,
            ...updatedData?._doc,
          }
        : {
            key_s: '',
            status: '',
            random_id: '',
            ...updatedData?._doc,
          };
    } catch (error) {
      throw error;
    }
  }

  // api methods below

  async createTableDataAPI(
    createTableDataDto: CreateTableDataDto,
  ): Promise<any> {
    try {
      isCounterFinished = false;
      // if there is a row
      if (isPostData) {
        const allData = await this.findAllTableData();
        if (allData.length) {
          isPostData = false;
          return await this.timerCountUpdated(
            allData[0]._id,
            createTableDataDto.input_data,
            createTableDataDto.random_id,
          );
        }

        // if new data insert
        const createNewData = await this.createData(createTableDataDto);
        if (createNewData) {
          isPostData = false;
          return await this.timerCountUpdated(
            createNewData._id,
            createTableDataDto.input_data,
            createTableDataDto.random_id,
          );
        }
        throw new InternalServerErrorException();
      }
      throw new BadRequestException(
        'Previous Data is on processing, try when it is done!',
      );
    } catch (error) {
      throw error;
    }
  }

  async findAllTableData(): Promise<any> {
    try {
      return await this.tableDataModel.find().select('-__v').exec();
    } catch (error) {
      throw error;
    }
  }
  async findOneTableData(): Promise<any> {
    try {
      const allData: any = await this.tableDataModel
        .find()
        .select('-__v -input_data')
        .sort({ createdAt: -1 })
        .exec();

      const data = allData.length
        ? {
            data: isCounterFinished
              ? {
                  ...allData[0]?._doc,
                  key_s: 'eyJ0eXAiOiJKV1Qidfg%!#%$%LCdf#*&*JhbGciOiJSUzI1NiJ9',
                  status: 'finish',
                }
              : {
                  ...allData[0]?._doc,
                  key_s: '',
                  status: '',
                },
          }
        : { data: {} };
      return data;
    } catch (error) {
      throw error;
    }
  }
}
