import { Component } from "@angular/core";

import { Brewery } from "../../models/Brewery.model";
import { BreweriesService } from "../../services/breweries.service";

@Component({
  selector: 'page-my-breweries',
  templateUrl: './my-breweries.html'
})
export class MyBreweriesPage {
  loadingFn: (reload?: boolean) => Promise<Brewery[]>;

  constructor(
    private breweriesSrv: BreweriesService
  ) {
    this.loadingFn = this.breweriesSrv.GetFavoriteBreweries.bind(this.breweriesSrv);
  }

}
