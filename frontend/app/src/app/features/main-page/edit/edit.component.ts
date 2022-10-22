import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
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

  constructor() {}

  editFriend(): void {}

  back(): void {}

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
