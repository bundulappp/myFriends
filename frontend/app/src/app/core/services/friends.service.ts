import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FriendViewModel } from 'src/app/shared/models/FriendViewModel';
import { environment } from 'src/environments/environment';
import { map, Observable, tap } from 'rxjs';
import { AddNewFriendRequestViewModel } from 'src/app/shared/models/AddNewFriendViewModel';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(
    private http: HttpClient,
    private snackBarService: SnackbarService
  ) {}

  getAllFriends(): Observable<FriendViewModel[]> {
    return this.http.get<FriendViewModel[]>(`${environment.apiUrl}/friends`);
  }

  getFriendDetails(friendId: number): Observable<FriendViewModel> {
    return this.http.get<FriendViewModel>(
      `${environment.apiUrl}/friends/${friendId}`
    );
  }

  addNewFriend(
    newFriendObject: AddNewFriendRequestViewModel
  ): Observable<void> {
    return this.http
      .post<AddNewFriendRequestViewModel>(
        `${environment.apiUrl}/friends`,
        newFriendObject
      )
      .pipe(
        tap(() => {
          this.snackBarService.showSuccessMessage(
            'Adding new friend is successful!'
          );
        }),
        map(() => undefined)
      );
  }

  deleteFriend(friendId: number): Observable<void> {
    return this.http
      .delete<number>(`${environment.apiUrl}/friends/${friendId}`)
      .pipe(
        tap(() => {
          this.snackBarService.showSuccessMessage('Your friend is deleted!');
        }),
        map(() => undefined)
      );
  }
}
