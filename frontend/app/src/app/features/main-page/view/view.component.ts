import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FriendsService } from 'src/app/core/services/friends.service';
import { FriendViewModel } from 'src/app/shared/models/FriendViewModel';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  friendDetails: FriendViewModel;

  constructor(
    private friendsService: FriendsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      console.log(params);
      this.init(Number(params.get('friendId')));
    });
  }

  init(friendId: number): void {
    this.friendsService.getFriendDetails(friendId).subscribe((x) => {
      this.friendDetails = x;
    });
  }
}
