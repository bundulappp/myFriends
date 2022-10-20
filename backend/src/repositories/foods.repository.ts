import { OkPacket } from 'mysql';
import { db } from '../data/connection';
import { AddNewFoodRequestModel } from '../models/common/AddNewFoodRequestModel';

export const foodRepository = {
  async addNewFood(foodDetails: AddNewFoodRequestModel): Promise<number> {
    const query = `INSERT INTO
                            foods
                            (name, friendId)
                        VALUES 
                            (?,?)`;

    const result = await db.query<OkPacket>(query, [
      foodDetails.name,
      foodDetails.friendId.toString(),
    ]);

    return result.insertId;
  },
};
