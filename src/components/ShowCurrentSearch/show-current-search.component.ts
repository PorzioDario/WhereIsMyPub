import { Component } from "@angular/core";
import { ViewController, NavParams } from "ionic-angular";
import { SearchParams } from "../../models/search-params.model";
import { UIMessages } from "../../constants/ui-messages";

@Component({
  selector: 'app-current-search',
  templateUrl: './show-current-search.component.html'
})
export class ShowCurrentSearchComponent {
  currentSearch: SearchParams;

  public constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private messagesSrv: UIMessages
  ) {
    this.currentSearch = this.navParams.get('params');
    if(!this.currentSearch) {
      // show alert
      console.log('errore: current search non passato come parametro');
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onClear(){
    this.viewCtrl.dismiss(this.messagesSrv.currentSearchButtons.clear);
  }

  onNew(){
    this.viewCtrl.dismiss(this.messagesSrv.currentSearchButtons.newSearch);
  }
}
