import { Injectable, EventEmitter } from "@angular/core";

import { Brewery } from "../models/Brewery.model";
import { SearchParams } from "../models/search-params.model";
import { StorageService } from "./storage.service";
import { StorageKeys } from "../enums/storage-keys";

@Injectable()
export class SessionService {
  private _fetchedBreweries : Brewery[];
  private _search: SearchParams;

  private favoriteBreweriesIds: number[];

  public constructor(private storageSrv: StorageService) { }

  public SearchParamsChanged = new EventEmitter<SearchParams>();
  public FetchedBreweryesChanged = new EventEmitter<void>();

  public getFavorites() {
    this.storageSrv.GetItem(StorageKeys.MyBreweries).then(
      breweriesIds => this.favoriteBreweriesIds = [...breweriesIds]
    ).catch(
      _ => {
        this.storageSrv.StoreItem(StorageKeys.MyBreweries, []);
        this.favoriteBreweriesIds = [];
      }
    )
  }

  public ToggleFavorite(breweryId : number) {
    const tmpFavorites = this.favoriteBreweriesIds;

    if (this.favoriteBreweriesIds.indexOf(breweryId) > -1) {
      //this brewery was a favorite one and must be removed
      this.favoriteBreweriesIds = this.favoriteBreweriesIds.filter(id => id !== breweryId);
    } else {
      // this brewery was not one of the user's favorite and must be added to the collection
      this.favoriteBreweriesIds.push(breweryId);
    }

    // push this state to the storage
    this.storageSrv.StoreItem(StorageKeys.MyBreweries, this.favoriteBreweriesIds).then(
      _ => {
        // update fetched list
        const brewery = this._fetchedBreweries.find(b => b.id === breweryId);
        brewery.favorite = !brewery.favorite;

        // emit event so that each component can update it's list
        this.FetchedBreweryesChanged.emit();
      }
    ).catch(err => console.log('Error: ', err ));
  }

  get Breweries(): Brewery[] {
    return this._fetchedBreweries;
  }

  set Breweries(value: Brewery[]) {
    this._fetchedBreweries = value.map(b => {
      if (this.favoriteBreweriesIds.indexOf(b.id) > -1) {
        b.favorite = true;
      }
      return b;
    });
  }

  get Search(): SearchParams {
    return this._search;
  }

  set Search(value: SearchParams) {
    this._search = value;
    this.SearchParamsChanged.emit({...this._search});
  }
}
