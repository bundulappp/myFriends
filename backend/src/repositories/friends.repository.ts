import { OkPacket } from 'mysql';
import { db } from '../data/connection';
import { EditFriendRequestViewModel } from '../models/common/EditFriendRequestModel';
import { FriendDomainModel } from '../models/domain/FriendDomainModel';
import { AddFriendRequestViewModel } from '../models/view/AddFriendRequestViewModel';

export const friendRepository = {
  async getAllFriends(): Promise<FriendDomainModel[]> {
    const query = `SELECT * 
                 FROM
                  friends`;

    return await db.query<FriendDomainModel[]>(query);
  },

  async getFriendById(friendId: number): Promise<FriendDomainModel> {
    const query = `SELECT *
            FROM
              friends
            WHERE
              id=?`;

    const friendList = await db.query<FriendDomainModel[]>(query, [
      friendId.toString(),
    ]);

    return friendList[0];
  },

  async addNewFriend(
    friendDetails: AddFriendRequestViewModel,
  ): Promise<number> {
    const { name, email, comment, favFood, relationshipStatus } = friendDetails;

    const query = `INSERT INTO
                        friends
                        (name, email, comment, favFood, relationshipStatus)
                    VALUES
                        (?, ?, ?, ?, ?)`;

    const result = await db.query<OkPacket>(query, [
      name,
      email,
      comment,
      favFood,
      relationshipStatus.toString(),
    ]);

    return result.insertId;
  },

  async editFriendById(
    friendDetails: EditFriendRequestViewModel,
  ): Promise<void> {
    const query = `UPDATE
                friends
              SET
                name=?,
                email=?,
                comment=?,
                favFood=?,
                relationshipStatus=?
              WHERE
                id=?`;
    await db.query<void>(query, [
      friendDetails.name,
      friendDetails.email,
      friendDetails.comment,
      friendDetails.favFood,
      friendDetails.relationshipStatus.toString(),
      friendDetails.friendId.toString(),
    ]);
  },

  async deleteFriend(friendId: number): Promise<void> {
    const query = `DELETE 
                   FROM 
                    friends 
                   WHERE 
                    id = ?`;

    await db.query<void>(query, [friendId.toString()]);
  },
};
