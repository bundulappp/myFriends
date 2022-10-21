import { RelationshipStatusTypes } from './RelationshipStatusTypes';

export interface FriendViewModel {
  id: number;
  name: string;
  email: string;
  comment?: string;
  favFood: string;
  relationshipStatus: RelationshipStatusTypes | string;
}
