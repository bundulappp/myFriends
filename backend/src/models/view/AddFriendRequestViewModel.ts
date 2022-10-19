import { RelationshipStatusTypes } from '../enums/RelationshipStatusTypes';

export interface AddFriendRequestViewModel {
  name: string;
  email: string;
  comment: string;
  favFood: string;
  relationshipStatus: RelationshipStatusTypes;
}
