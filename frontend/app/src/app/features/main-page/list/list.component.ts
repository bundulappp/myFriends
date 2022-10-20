import { Component, OnInit } from '@angular/core';
import { FriendsService } from 'src/app/core/services/friends.service';
import { FriendViewModel } from 'src/app/shared/models/FriendViewModel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  friendList: FriendViewModel[] = [];
  columnsToDisplay = [
    'name',
    'email',
    'comment',
    'favFood',
    'relationshipStatus',
    'actions',
  ];

  constructor(private friendsService: FriendsService) {}

  ngOnInit(): void {
    this.friendsService.getAllFriends().subscribe((x) => {
      this.friendList = x;
    });
  }
}
