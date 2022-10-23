import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FriendsService } from 'src/app/core/services/friends.service';
import { EditFriendRequestViewModel } from 'src/app/shared/models/EditFriendRequestViewModel';
import { FriendViewModel } from 'src/app/shared/models/FriendViewModel';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  friendDetails: FriendViewModel;

  relationshipCategory = [
    { id: 0, name: 'single' },
    { id: 1, name: 'in relationship' },
    { id: 2, name: 'married' },
  ];

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    comment: new FormControl('', Validators.maxLength(30)),
    favFood: new FormControl('', Validators.required),
    relationshipStatus: new FormControl('', Validators.required),
  });

  constructor(
    private friendsService: FriendsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.init(Number(params.get('friendId')));
    });
  }

  init(friendId: number): void {
    this.friendsService.getFriendDetails(friendId).subscribe((x) => {
      this.friendDetails = x;

      const comment = x['comment'] as string;
      const relationshipStatus = x['relationshipStatus'] as string;
      const { name, email, favFood } = x;
      this.form.setValue({ name, email, comment, favFood, relationshipStatus });
    });
  }

  editFriend(): void {
    if (this.form.valid) {
      const modifiedData =
        this.form.getRawValue() as EditFriendRequestViewModel;
      const friendId = this.friendDetails.id as number;

      const friendDetails: EditFriendRequestViewModel = {
        friendId,
        name: modifiedData.name,
        email: modifiedData.email,
        comment: modifiedData.comment,
        favFood: modifiedData.favFood,
        relationshipStatus: modifiedData.relationshipStatus,
      };

      this.friendsService.editFriend(friendDetails).subscribe();
    }
  }

  get name(): AbstractControl {
    return this.form.get('name') as AbstractControl;
  }

  get email(): AbstractControl {
    return this.form.get('email') as AbstractControl;
  }

  get comment(): AbstractControl {
    return this.form.get('comment') as AbstractControl;
  }

  get favFood(): AbstractControl {
    return this.form.get('favFood') as AbstractControl;
  }

  get relationshipStatus(): AbstractControl {
    return this.form.get('relationshipStatus') as AbstractControl;
  }
}
