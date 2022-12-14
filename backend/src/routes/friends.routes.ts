import express from 'express';
import { friendController } from '../controllers/friendsController';

const friendsRouter = express.Router();

/**
 * @swagger
 * /api/friends:
 *  get:
 *      tags:
 *      - FRIENDS
 *      description: Get all Friends
 *      responses:
 *          200:
 *              description: Data provided
 *          500:
 *              description: Internal server error
 */
friendsRouter.get('', friendController.getAllFriends);

/**
 * @swagger
 * /api/friends/{friendId}:
 *  get:
 *      tags:
 *      - FRIENDS
 *      description: Get a friend data
 *      parameters:
 *          - in: path
 *            name: friendId
 *            description: ID of friend
 *            schema:
 *              type: number
 *              example: 1
 *      responses:
 *          200:
 *              description: Listing returned
 *          400:
 *              description: friendId missing
 *          404:
 *              description: Friend not found
 *          500:
 *              description: Internal server error
 */
friendsRouter.get('/:friendId', friendController.getFriend);

/**
 * @swagger
 * /api/friends:
 *  post:
 *      tags:
 *      - FRIENDS
 *      description: Add a new friend to the list
 *      parameters:
 *          - in: body
 *            name: friendDetails
 *            description: Provide the necessary details
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: John Wick
 *                email:
 *                  type: string
 *                  example: johnwick@example.com
 *                comment:
 *                  type: string
 *                  example: he likes his dog very much
 *                favFood:
 *                  type: string
 *                  example: Pizza
 *                relationshipStatus:
 *                  type: number
 *                  example: 1
 *      responses:
 *          200:
 *              description: New friend added to list
 *          400:
 *              description: Friend detail missing
 *          500:
 *              description: Internal server error
 */
friendsRouter.post('', friendController.addNewFriend);

/**
 * @swagger
 * /api/friends:
 *  put:
 *      tags:
 *      - FRIENDS
 *      description: Edit a friend details
 *      parameters:
 *          - in: body
 *            name: friendData
 *            description: Provide the details of the friend you'd like to edit
 *            schema:
 *              type: object
 *              properties:
 *                friendId:
 *                  type: number
 *                  example: 1
 *                name:
 *                  type: string
 *                  example: John Wick 2
 *                email:
 *                  type: string
 *                  example: jowhnwick2@example.com
 *                comment:
 *                  type: string
 *                  example: it's a great comment
 *                favFood:
 *                  type: string
 *                  example: Mac&Cheese
 *                relationshipStatus:
 *                  type: number
 *                  example: 1
 *      responses:
 *          200:
 *              description: Edited
 *          400:
 *              description: Bad request
 *          404:
 *              description: Not found
 *          500:
 *              description: Internal server error
 */
friendsRouter.put('', friendController.editFriend);

/**
 * @swagger
 * /api/friends/{friendId}:
 *  delete:
 *      tags:
 *      - FRIENDS
 *      description: Delete a Friend from the list
 *      parameters:
 *          - in: path
 *            name: friendId
 *            description: ID of a friend
 *            schema:
 *              type: number
 *              example: 1
 *      responses:
 *          200:
 *              description: Friend deleted from the list
 *          404:
 *              description: Friend is not found
 *          500:
 *              description: Internal server error
 */
friendsRouter.delete('/:friendId', friendController.deleteFriend);

/**
 * @swagger
 * /api/friends/photo:
 *  put:
 *      tags:
 *      - FRIENDS
 *      description: Edit a friend photo
 *      parameters:
 *          - in: body
 *            name: friendData
 *            description: Provide the details of the friend you'd like to edit
 *            schema:
 *              type: object
 *              properties:
 *                friendId:
 *                  type: number
 *                  example: 1
 *                photoUrl:
 *                  type: string
 *                  example: https://media.istockphoto.com/photos/barbary-macaque-picture-id824860820?k=20&m=824860820&s=612x612&w=0&h=W8783ZGcqMfDMJoXvBAyDFcSjnOWdKqKhgLGvf-VIuU=
 *      responses:
 *          200:
 *              description: Edited
 *          400:
 *              description: Bad request
 *          404:
 *              description: Not found
 *          500:
 *              description: Internal server error
 */
friendsRouter.put('/photo', friendController.editFriendPhoto);

export default friendsRouter;
