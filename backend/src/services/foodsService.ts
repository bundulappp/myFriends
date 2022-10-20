import { AddNewFoodRequestModel } from '../models/common/AddNewFoodRequestModel';
import { foodRepository } from '../repositories/foods.repository';

export const foodService = {
  async addNewFood(foodDetails: AddNewFoodRequestModel): Promise<void> {
    await foodRepository.addNewFood(foodDetails);
  },
};
