import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FriendsService } from 'src/app/core/services/friends.service';
import { DialogFriendDataViewModel } from '../models/DialogFriendDataViewModel';

@Component({
  selector: 'app-photo-upload-dialog',
  templateUrl: './photo-upload-dialog.component.html',
  styleUrls: ['./photo-upload-dialog.component.scss'],
})
export class PhotoUploadDialogComponent {
  @Input() photoUrl: string;
  constructor(
    private friendsService: FriendsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogFriendDataViewModel
  ) {}

  editPhoto(): void {
    const friendData = {
      friendId: this.data.friendId,
      photoUrl: this.photoUrl,
    };
    this.friendsService.editFriendPhoto(friendData).subscribe();
  }
}
