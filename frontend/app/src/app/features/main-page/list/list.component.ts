import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  relationshipCategory = [
    { name: 'single' },
    { name: 'in relationship' },
    { name: 'married' },
  ];

  constructor(private friendsService: FriendsService, private router: Router) {}

  ngOnInit(): void {
    this.friendsService.getAllFriends().subscribe((friendList) => {
      const modifiedFriendList: FriendViewModel[] = [];

      friendList.forEach((x) => {
        const modifiedFriend = {
          id: x.id,
          name: x.name,
          email: x.email,
          comment: x.comment,
          favFood: x.favFood,
          relationshipStatus:
            this.relationshipCategory[x.relationshipStatus as number].name,
        };
        modifiedFriendList.push(modifiedFriend);
      });
      this.friendList = modifiedFriendList;
    });
  }

  navigateToEdit(friendId: number): void {
    this.router.navigate(['/main/edit'], {
      queryParams: {
        friendId: `${friendId}`,
      },
    });
  }

  navigateToView(friendId: number): void {
    this.router.navigate(['/main/view'], {
      queryParams: {
        friendId: `${friendId}`,
      },
    });
  }

  deleteFriend(friendId: number): void {
    this.friendsService.deleteFriend(friendId).subscribe();
  }
}
