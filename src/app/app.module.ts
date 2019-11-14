import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { BreweriesService } from '../services/breweries.service';
import { BreweriesRepository } from '../repositories/breweries.repository';
import { SessionService } from '../services/session.service';
import { StorageService } from '../services/storage.service';
import { UIMessages } from '../constants/ui-messages';

import { TabsPage } from '../pages/tabs/tabs.component';
import { BreweriesListPage } from '../pages/breweries-list/breweries-list';
import { MyBreweriesPage } from '../pages/my-breweries/my-breweries';
import { BreweryListItemComponent } from '../components/BreweryListItem/brewery-listitem.component';
import { BreweryDetailsComponent } from '../components/BreweryDetails/brewery-details.component';
import { SearchComponent } from '../components/search/search';
import { ShowCurrentSearchComponent } from '../components/ShowCurrentSearch/show-current-search.component';
import { BreweriesComponent } from '../components/Breweries/breweries.component';
import { MapComponent } from '../components/Map/map.component';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    BreweriesListPage,
    MyBreweriesPage,
    BreweryListItemComponent,
    BreweryDetailsComponent,
    SearchComponent,
    ShowCurrentSearchComponent,
    BreweriesComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    BreweriesListPage,
    MyBreweriesPage,
    BreweryDetailsComponent,
    SearchComponent,
    ShowCurrentSearchComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StorageService,
    SessionService,
    BreweriesRepository,
    BreweriesService,
    UIMessages,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
