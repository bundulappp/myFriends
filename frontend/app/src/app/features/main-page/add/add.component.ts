import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FriendsService } from 'src/app/core/services/friends.service';
import { RelationshipStatusTypes } from 'src/app/shared/models/enums/RelationshipStatusTypes';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  relationshipStatus = [
    { id: RelationshipStatusTypes.Single, name: 'single' },
    { id: RelationshipStatusTypes.In_relationship, name: 'in relationship' },
    { id: RelationshipStatusTypes.Married, name: 'married' },
  ];

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    comment: new FormControl('', Validators.maxLength(30)),
    favFood: new FormControl('', Validators.required),
    relationshipStatus: new FormControl('', Validators.required),
  });

  constructor(private friendsService: FriendsService, private router: Router) {}

  addFriend() {}

  back(): void {
    this.router.navigate(['/main']);
  }
}
