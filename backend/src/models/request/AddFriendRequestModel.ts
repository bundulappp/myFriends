import { RelationshipStatusTypes } from '../enums/RelationshipStatusTypes';

export interface AddFriendRequestModel {
  name: string;
  email: string;
  comment: string;
  favFood: string;
  relationshipStatus: RelationshipStatusTypes;
}
