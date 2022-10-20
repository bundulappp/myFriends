import express from 'express';
import { friendController } from '../controllers/friendsController';

const friendsRouter = express.Router();

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
 *                  example: dog food
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

export default friendsRouter;
