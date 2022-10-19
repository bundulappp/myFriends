import { AddFriendRequestViewModel } from '../models/view/AddFriendRequestViewModel';
import { NextFunction, Request, Response } from 'express';
import { AddFriendViewModel } from '../models/view/AddFriendViewModel';
import { badRequestError } from '../services/generalErrorService';
import { friendService } from '../services/friendService';

export const friendController = {
  async addNewFriend(
    req: Request<AddFriendRequestViewModel>,
    res: Response<AddFriendViewModel>,
    next: NextFunction,
  ) {
    const { name, email, comment, favFood, relationshipStatus } = req.body;

    if (!name || !email || !comment || !favFood || !relationshipStatus) {
      return next(
        badRequestError(
          'name, description, image URL and price are all required!',
        ),
      );
    }

    const friendDetails = {
      name,
      email,
      comment,
      favFood,
      relationshipStatus,
    };

    try {
      const friendId = await friendService.addNewFriend(friendDetails);
      res.status(201).send({ friendId });
    } catch (err) {
      next(err);
    }
  },
};
