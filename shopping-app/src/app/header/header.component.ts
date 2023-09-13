import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User = null
  userSub: Subscription;

  constructor(private dataStorageService: DataStorageService, private auth: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe((user: User) => {
      this.user = user;
    })
  }

  saveData() {
    this.dataStorageService.storeRecipe()
  }

  fetchData() {
    this.dataStorageService.fetchRecipes()
    .subscribe()
  }

  logOut() {
    this.auth.logOut()
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }
}
