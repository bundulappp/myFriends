import { AddFriendRequestModel } from '../models/request/AddFriendRequestModel';

export const friendService = {
  async addNewFriend(friendDetail: AddFriendRequestModel): Promise<number> {
    return await friendService.addNewFriend(friendDetail);
  },
};
