import { RelationshipStatusTypes } from './RelationshipStatusTypes';

export interface AddNewFriendRequestViewModel {
  name: string | null;
  email: string | null;
  comment?: string | null;
  favFood: string | null;
  relationshipStatus: RelationshipStatusTypes | null;
}
