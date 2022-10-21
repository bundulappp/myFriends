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

  addNewFriend(newItemObject: AddNewFriendRequestViewModel): Observable<void> {
    return this.http
      .post<AddNewFriendRequestViewModel>(
        `${environment.apiUrl}/friends`,
        newItemObject
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
}
