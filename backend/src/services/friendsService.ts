import { AddFriendRequestViewModel } from '../models/view/AddFriendRequestViewModel';

export const friendService = {
  async addNewFriend(friendDetail: AddFriendRequestViewModel): Promise<number> {
    return await friendService.addNewFriend(friendDetail);
  },
};
