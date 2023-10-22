import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { IUser, User } from '../user.model';
import { Subscription, map, take } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements  OnInit, OnDestroy {
  user: IUser = null;
  userSub: Subscription
  constructor(private auth: AuthService, private userService: UserService) {

  }

  ngOnInit(): void {
   let userId: string;
   this.userSub = this.auth.user.pipe(take(1)).subscribe(loginCredData => {
    userId = loginCredData.id
   })
   this.userService.getUserInfo(userId).subscribe((userData: any) => {
    this.user = {
      name: userData.data().name,
      lastName: userData.data().lastname,
      id: userData.data().id,
      email: userData.data().email,
      emailVerified: userData.data().verified
    }
    console.log(this.user)
   })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }
}
