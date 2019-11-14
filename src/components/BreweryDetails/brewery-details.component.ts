import { Component } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";
import { Brewery } from "../../models/Brewery.model";
import { BreweriesService } from "../../services/breweries.service";

@Component({
  selector: 'app-brewery-details',
  templateUrl: './brewery-details.component.html'
})
export class BreweryDetailsComponent{
  brewery: Brewery;

  public constructor (
    private params: NavParams,
    private viewCtrl: ViewController,
    private brewerySrv: BreweriesService
  ) {
    const breweryId = this.params.get('breweryId');
    if(!breweryId) {
      // show alert
      console.log('errore: id non passato come parametro');
    }
    brewerySrv.GetBreweries(false).then(breweries => {
      this.brewery = breweries.find(b => b.id === breweryId);
    }).catch(err => console.log(err));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onToggleFavorite() {
    this.brewerySrv.ToggleFavorite(this.brewery.id);
  }
}
