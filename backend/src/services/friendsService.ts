import { AddFriendRequestViewModel } from '../models/view/AddFriendRequestViewModel';
import { friendRepository } from '../repositories/friends.repository';

export const friendService = {
  async addNewFriend(friendDetail: AddFriendRequestViewModel): Promise<number> {
    return await friendRepository.addNewFriend(friendDetail);
  },
};
