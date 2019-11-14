import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Brewery } from '../../models/Brewery.model';

@Component({
  selector: 'app-brewery-listitem',
  templateUrl: './brewery-listitem.component.html'
})
export class BreweryListItemComponent {
  @Input() brewery: Brewery;
  @Output() clickBrewery= new EventEmitter<void>();

  onClick() {
    this.clickBrewery.emit();
  }
}
