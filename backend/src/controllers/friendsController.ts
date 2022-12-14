import { AddFriendRequestViewModel } from '../models/view/AddFriendRequestViewModel';
import { NextFunction, Request, Response } from 'express';
import { AddFriendViewModel } from '../models/view/AddFriendViewModel';
import { badRequestError } from '../services/generalErrorService';
import { friendService } from '../services/friendsService';
import { FriendDomainModel } from '../models/domain/FriendDomainModel';
import { foodService } from '../services/foodsService';
import { EditFriendRequestViewModel } from '../models/common/EditFriendRequestModel';
import { EditFriendPhotoRequestViewModel } from '../models/view/EditFriendPhotoRequestViewModel';

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

  async getFriend(
    req: Request,
    res: Response<FriendDomainModel>,
    next: NextFunction,
  ) {
    const { friendId } = req.params;

    if (isNaN(+friendId))
      return next(badRequestError('friendId needs to be a number!'));

    try {
      const result = await friendService.getFriendById(+friendId);
      res.status(200).send(result);
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
    req: Request<EditFriendRequestViewModel>,
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

    const requestData: EditFriendRequestViewModel = {
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

  async editFriendPhoto(
    req: Request<EditFriendPhotoRequestViewModel>,
    res: Response,
    next: NextFunction,
  ) {
    const { friendId, photoUrl } = req.body;

    if (!friendId || !photoUrl) {
      return next(badRequestError('friendId and photoUrl are all mandatory.'));
    }

    const requestData: EditFriendPhotoRequestViewModel = {
      friendId,
      photoUrl,
    };

    try {
      await friendService.editFriendPhoto(requestData);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },

  async deleteFriend(
    req: Request<EditFriendRequestViewModel>,
    res: Response,
    next: NextFunction,
  ) {
    const { friendId } = req.params;

    if (isNaN(+friendId)) {
      next(badRequestError('Friend id need to be a number'));
      return;
    }

    try {
      await friendService.deleteFriend(friendId);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },
};
