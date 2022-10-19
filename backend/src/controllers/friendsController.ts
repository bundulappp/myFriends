import { AddFriendRequestViewModel } from '../models/view/AddFriendRequestViewModel';
import { NextFunction, Request, Response } from 'express';
import { AddFriendViewModel } from '../models/view/AddFriendViewModel';
import { badRequestError } from '../services/generalErrorService';
import { friendService } from '../services/friendsService';

export const friendController = {
  async addNewFriend(
    req: Request<AddFriendRequestViewModel>,
    res: Response<AddFriendViewModel>,
    next: NextFunction,
  ) {
    const { name, email, comment, favFood, relationshipStatus } = req.body;

    if (!name || !email || !favFood || !relationshipStatus) {
      return next(
        badRequestError(
          'name, email, favoriteFood and relationshipStatus are all required!',
        ),
      );
    }

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      next(badRequestError('Must use a valid email address'));
      return;
    }

    if (name.length < 4) {
      next(badRequestError('Name must be at least 4 characters.'));
      return;
    }

    if (comment.length > 30) {
      next(badRequestError('Comment can not be longer than 30 characters.'));
      return;
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
