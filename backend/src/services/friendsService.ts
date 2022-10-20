import { EditFriendRequestModel } from '../models/common/EditFriendRequestModel';
import { FriendDomainModel } from '../models/domain/FriendDomainModel';
import { AddFriendRequestViewModel } from '../models/view/AddFriendRequestViewModel';
import { friendRepository } from '../repositories/friends.repository';
import { notFoundError } from './generalErrorService';

export const friendService = {
  async getAllFriends(): Promise<FriendDomainModel[]> {
    return await friendRepository.getAllFriends();
  },

  async addNewFriend(friendDetail: AddFriendRequestViewModel): Promise<number> {
    return await friendRepository.addNewFriend(friendDetail);
  },

  async editFriend(friendDetails: EditFriendRequestModel): Promise<void> {
    const { friendId } = friendDetails;

    if (!(await friendRepository.getFriendById(friendId))) {
      throw notFoundError('Cannot edit friend, friendId not found in db!');
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
