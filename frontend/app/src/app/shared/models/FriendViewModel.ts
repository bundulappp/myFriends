import { RelationshipStatusTypes } from './models/RelationshipStatusTypes';

export interface FriendViewModel {
  id: number;
  name: string;
  email: string;
  comment: string;
  favFood: string;
  relationshipStatus: RelationshipStatusTypes;
}
