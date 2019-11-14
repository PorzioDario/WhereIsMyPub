import { Component } from '@angular/core';

import { Brewery } from '../../models/Brewery.model';
import { BreweriesService } from '../../services/breweries.service';

@Component({
  selector: 'page-breweries-list',
  templateUrl: 'breweries-list.html'
})
export class BreweriesListPage {
  loadingFn: (reload?: boolean) => Promise<Brewery[]>;

  constructor(
    private breweriesSrv: BreweriesService
  ) {
    this.loadingFn = this.breweriesSrv.GetBreweries.bind(this.breweriesSrv);
  }
}
