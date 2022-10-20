import { db } from '../data/connection';
import { AddNewFoodRequestModel } from '../models/common/AddNewFoodRequestModel';

export const foodRepository = {
  async addNewFood(foodDetails: AddNewFoodRequestModel): Promise<void> {
    const query = `INSERT INTO
                            foods
                            (name, friendId)
                        VALUES 
                            (?,?)`;

    const result = await db.query<void>(query, [
      foodDetails.favFood,
      foodDetails.friendId.toString(),
    ]);
  },
};
