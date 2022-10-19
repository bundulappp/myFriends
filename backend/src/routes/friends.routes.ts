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

export default friendsRouter;
