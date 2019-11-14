import { Component } from "@angular/core";
import { ModalController } from "ionic-angular";

import { Subscription } from "rxjs/Subscription";

import { BreweriesListPage } from '../breweries-list/breweries-list';
import { MyBreweriesPage } from '../my-breweries/my-breweries';
import { SearchComponent } from "../../components/search/search";
import { ShowCurrentSearchComponent } from "../../components/ShowCurrentSearch/show-current-search.component";

import { SearchParams } from "../../models/search-params.model";

import { SessionService } from "../../services/session.service";
import { UIMessages } from "../../constants/ui-messages";


@Component({
  selector: 'page-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsPage {
  breweriesList = BreweriesListPage;
  myBreweries = MyBreweriesPage;

  isSearchMode: boolean;

  searchParamsCangedSubscription : Subscription;

  public constructor (
    private modalCtrl: ModalController,
    private sessionSrv: SessionService,
    private messagesSrv: UIMessages
  ) {}

  ionViewWillEnter () {
    //Add subscription to sessionSrv event SearchParamsChanged
    this.searchParamsCangedSubscription = this.sessionSrv.SearchParamsChanged.subscribe(
      // If searchParams are filled then the app is in "SearchMode"
      (searchpar: SearchParams) => { this.isSearchMode = (
        searchpar &&
        (
          searchpar.Name !== '' ||
          searchpar.City !== '' ||
          searchpar.State !== ''
        ));
      }
    );
  }

  ionViewWillLeave() {
    this.searchParamsCangedSubscription.unsubscribe();
  }

  onSearchClick() {
    if (this.isSearchMode) {
      let clearSearchModal = this.modalCtrl.create( ShowCurrentSearchComponent, { params: this.sessionSrv.Search } );
      clearSearchModal.onDidDismiss((data) => {
        if(data) {
          if(data === this.messagesSrv.currentSearchButtons.clear) {
            this.sessionSrv.Search = new SearchParams('','','');
          } else if (data === this.messagesSrv.currentSearchButtons.newSearch) {
            this.openSearchModal();
          }
        }
      });
      clearSearchModal.present();
    } else {
      this.openSearchModal();
    }
  }

  private openSearchModal() {
    let searchModal = this.modalCtrl.create( SearchComponent, { params: this.sessionSrv.Search } );
    searchModal.onDidDismiss((data) => {
      if ( data && ( data instanceof SearchParams )) {
        this.sessionSrv.Search = data;
      }
    });
    searchModal.present();
  }

}
