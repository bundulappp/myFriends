import { OkPacket } from 'mysql';
import { db } from '../data/connection';
import { AddFriendRequestModel } from '../models/request/AddFriendRequestModel';

export const friendRepository = {
  async addNewFriend(friendDetails: AddFriendRequestModel): Promise<number> {
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
};
