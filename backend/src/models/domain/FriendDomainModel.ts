import { RelationshipStatusTypes } from '../enums/RelationshipStatusTypes';

export interface FriendDomainModel {
  id: number;
  name: string;
  email: string;
  comment: string;
  favFood: string;
  relationshipStatus: RelationshipStatusTypes;
}
