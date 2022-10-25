import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FriendsService } from 'src/app/core/services/friends.service';
import { FriendViewModel } from 'src/app/shared/models/FriendViewModel';
import { PhotoUploadDialogComponent } from 'src/app/shared/photo-upload-dialog/photo-upload-dialog.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  friendDetails: FriendViewModel;

  constructor(
    private friendsService: FriendsService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.loadFriendDetails(Number(params.get('friendId')));
    });
  }

  loadFriendDetails(friendId: number): void {
    this.friendsService.getFriendDetails(friendId).subscribe((x) => {
      this.friendDetails = x;
    });
  }

  openDialog(): void {
    const dialog = this.dialog.open(PhotoUploadDialogComponent, {
      data: {
        friendId: this.friendDetails.id,
      },
    });

    dialog.afterClosed().subscribe();
  }
}
