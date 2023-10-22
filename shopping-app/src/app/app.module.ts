import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire//compat/firestore'
import { environment } from 'src/environments/environment.development';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/shopping-list-store/shopping-list-reduces';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({
      shoppingList: shoppingListReducer
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
