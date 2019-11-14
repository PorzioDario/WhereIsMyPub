import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { SearchParams, SearchMode } from '../../models/search-params.model';

@Component({
  selector: 'app-search',
  templateUrl: 'search.html'
})
export class SearchComponent {

  searchParams: SearchParams;

  constructor(private viewCtrl: ViewController, private navParams: NavParams) {
    const currentSearch = this.navParams.get('params');
    if(!currentSearch) {
      this.searchParams = new SearchParams('','','');
    } else {
      this.searchParams = new SearchParams(currentSearch.Name, currentSearch.City, currentSearch.State);
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onCleanClick() {
    this.searchParams = new SearchParams('','','');
  }

  onSearchClick() {
    if(this.filtersPopulated()) {
      this.viewCtrl.dismiss(this.searchParams);
    }
  }

  selectAll() {
    this.searchParams.Mode = SearchMode.AllFilters;
  }

  selectAny() {
    this.searchParams.Mode = SearchMode.AnyFilter;
  }

  filtersPopulated() : boolean {
    return (
      this.searchParams.Name.trim() !== '' ||
      this.searchParams.City.trim() !== '' ||
      this.searchParams.State.trim() !== ''
    );
  }
}
