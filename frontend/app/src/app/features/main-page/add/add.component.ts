import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FriendsService } from 'src/app/core/services/friends.service';
import { AddNewFriendRequestViewModel } from 'src/app/shared/models/AddNewFriendViewModel';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
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

  constructor(private friendsService: FriendsService, private router: Router) {}

  addFriend(): void {
    if (this.form.valid) {
      this.friendsService
        .addNewFriend(this.form.getRawValue() as AddNewFriendRequestViewModel)
        .subscribe();
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
