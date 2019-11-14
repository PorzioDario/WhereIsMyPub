import { Component, Input } from '@angular/core';
import { NavController, AlertController, Refresher, ModalController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { Brewery } from '../../models/Brewery.model';
import { SessionService } from '../../services/session.service';
import { BreweryDetailsComponent } from '../../components/BreweryDetails/brewery-details.component';
import { UIMessages } from '../../constants/ui-messages';

@Component({
  selector: 'app-breweries',
  templateUrl: 'breweries.component.html'
})
export class BreweriesComponent {
  @Input() listSourceFn: (reload?: boolean) => Promise<Brewery[]>;

  noInternet = 'assets\\imgs\\drunk-beer.gif';
  noBottle = 'assets\\imgs\\confused-beer.gif'
  loading = false;
  fetchingError = false;
  fetchedBreweries: Brewery[];

  searchParamsChangedSubscription : Subscription;
  listChangedSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private sessionSrv: SessionService,
    private messagesSrv: UIMessages
  ) {
  }

  ngOnInit () {
    this.LoadData(false);

    //Add subscription to sessionSrv event SearchParamsChanged
    this.searchParamsChangedSubscription = this.sessionSrv.SearchParamsChanged.subscribe(_ => this.LoadData(false));

    //Add subscription to sessionSrv event FetchedBreweryesChanged
    this.listChangedSubscription = this.sessionSrv.FetchedBreweryesChanged.subscribe(_ => this.LoadData(false));
  }

  onReload(event: Refresher) {
    this.LoadData(true, event);
  }

  onClickItem(item: Brewery) {
    let itemModal = this.modalCtrl.create( BreweryDetailsComponent, { breweryId: item.id }, { showBackdrop: true } );
    itemModal.present();
  }

  private LoadData(reload: boolean, refresher?: Refresher) {
    if (!refresher) {
      this.loading = true;
    }
    this.listSourceFn(reload).then( brs => {
      this.fetchingError = false;
      this.fetchedBreweries = brs.slice();
      if(refresher) {
        refresher.complete();
      } else {
        this.loading = false;
      }
    }).catch( err => {
      this.fetchedBreweries = [];
      this.fetchingError = true;
      if(refresher) {
        refresher.complete();
      } else {
        this.loading = false;
      }
      this.alertCtrl.create({
        title: this.messagesSrv.fetchingErrorAlert.title,
        message: this.messagesSrv.fetchingErrorAlert.message,
        buttons: ['Ok']
      }).present();
    })
  }

  ngOnDestroy() {
    this.searchParamsChangedSubscription.unsubscribe();
    this.listChangedSubscription.unsubscribe();
  }

}
