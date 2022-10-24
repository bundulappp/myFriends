import { EditFriendRequestViewModel } from '../models/common/EditFriendRequestModel';
import { FriendDomainModel } from '../models/domain/FriendDomainModel';
import { AddFriendRequestViewModel } from '../models/view/AddFriendRequestViewModel';
import { friendRepository } from '../repositories/friends.repository';
import { notFoundError } from './generalErrorService';

export const friendService = {
  async getAllFriends(): Promise<FriendDomainModel[]> {
    return await friendRepository.getAllFriends();
  },

  async getFriendById(friendId: number): Promise<FriendDomainModel> {
    const friend = await friendRepository.getFriendById(friendId);

    if (!friend) {
      throw notFoundError('FriendId not found in db!');
    }

    return friend;
  },

  async addNewFriend(friendDetail: AddFriendRequestViewModel): Promise<number> {
    return await friendRepository.addNewFriend(friendDetail);
  },

  async editFriend(friendDetails: EditFriendRequestViewModel): Promise<void> {
    const friend = await friendRepository.getFriendById(friendDetails.friendId);

    if (!friend) {
      throw notFoundError('FriendId not found in db!');
    }

    await friendRepository.editFriendById(friendDetails);
  },

  async deleteFriend(friendId: number): Promise<void> {
    if (!(await friendRepository.getFriendById(friendId))) {
      throw notFoundError('Cannot delete friend, friendId not found in db!');
    }

    await friendRepository.deleteFriend(friendId);
  },
};
