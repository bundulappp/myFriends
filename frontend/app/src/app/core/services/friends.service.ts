import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FriendViewModel } from 'src/app/shared/models/FriendViewModel';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(private http: HttpClient) {}
  getAllFriends(): Observable<FriendViewModel[]> {
    return this.http.get<FriendViewModel[]>(`${environment.apiUrl}/friends`);
  }
}
