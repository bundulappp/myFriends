import { AddFriendRequestViewModel } from '../models/view/AddFriendRequestViewModel';
import { NextFunction, Request, Response } from 'express';
import { AddFriendViewModel } from '../models/view/AddFriendViewModel';
import { badRequestError } from '../services/generalErrorService';
import { friendService } from '../services/friendsService';
import { EditFriendRequestModel } from '../models/common/EditFriendRequestModel';
import { FriendDomainModel } from '../models/domain/FriendDomainModel';
import { foodService } from '../services/foodsService';

export const friendController = {
  async getAllFriends(
    req: Request,
    res: Response<FriendDomainModel[]>,
    next: NextFunction,
  ) {
    try {
      const friendsList = await friendService.getAllFriends();
      res.status(200).send(friendsList);
    } catch (err) {
      next(err);
    }
  },

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
      await foodService.addNewFood({ favFood, friendId });
      res.status(201).send({ friendId });
    } catch (err) {
      next(err);
    }
  },

  async editFriend(
    req: Request<EditFriendRequestModel>,
    res: Response,
    next: NextFunction,
  ) {
    const { friendId, name, email, comment, favFood, relationshipStatus } =
      req.body;

    if (!name || !email || !favFood || !relationshipStatus) {
      return next(
        badRequestError(
          'name, email, favoriteFood and relationshipStatus are all mandatory.',
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

    const requestData: EditFriendRequestModel = {
      friendId,
      name,
      email,
      comment,
      favFood,
      relationshipStatus,
    };

    try {
      await friendService.editFriend(requestData);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },

  async deleteFriend(
    req: Request<EditFriendRequestModel>,
    res: Response,
    next: NextFunction,
  ) {
    const { friendId } = req.body;
    try {
      await friendService.deleteFriend(friendId);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },
};
