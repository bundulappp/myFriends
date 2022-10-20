import { AddNewFoodRequestModel } from '../models/common/AddNewFoodRequestModel';
import { foodRepository } from '../repositories/foods.repository';

export const foodService = {
  async addNewFood(foodDetails: AddNewFoodRequestModel): Promise<number> {
    return await foodRepository.addNewFood(foodDetails);
  },
};
