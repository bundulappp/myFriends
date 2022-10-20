import { OkPacket } from 'mysql';
import { db } from '../data/connection';
import { RelationshipStatusTypes } from '../models/enums/RelationshipStatusTypes';
import { AddFriendRequestViewModel } from '../models/view/AddFriendRequestViewModel';

export const friendRepository = {
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
    friendId: number,
    name: string,
    email: string,
    comment: string,
    favFood: string,
    relationshipStatus: RelationshipStatusTypes,
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
    await db.query(query, [
      name,
      email,
      comment,
      favFood,
      relationshipStatus.toString(),
      friendId.toString(),
    ]);
  },
};
