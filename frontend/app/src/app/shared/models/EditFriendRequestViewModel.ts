import { RelationshipStatusTypes } from './RelationshipStatusTypes';

export interface EditFriendRequestViewModel {
  friendId: number | null;
  name: string | null;
  email: string | null;
  comment: string | null;
  favFood: string | null;
  relationshipStatus: RelationshipStatusTypes | null;
}
