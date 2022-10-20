import { RelationshipStatusTypes } from '../enums/RelationshipStatusTypes';

export interface EditFriendRequestModel {
  friendId: number;
  name: string;
  email: string;
  comment: string;
  favFood: string;
  relationshipStatus: RelationshipStatusTypes;
}
