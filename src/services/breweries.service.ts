import { Injectable } from "@angular/core";
import { BreweriesRepository } from "../repositories/breweries.repository";
import { Brewery } from "../models/Brewery.model";
import { SessionService } from "./session.service";
import { SearchParams, SearchMode } from "../models/search-params.model";

@Injectable()
export class BreweriesService {

  public constructor (
    private breweriesRepo: BreweriesRepository,
    private sessionSrv : SessionService,
  ) {
  }

  // this method is used to filter the list of breweries if the session contains a valid searchParams obj
  private filterBreweries(list: Brewery[], searchPar: SearchParams) : Brewery[] {
    if(searchPar && (searchPar.Name.trim() !== '' || searchPar.City.trim() !== '' || searchPar.State.trim() !== '')) {
      return list.filter(b => {
        if(searchPar.Mode === SearchMode.AllFilters) {
          if(
            // if searchPar.Name has value it must be included in the brewery.name
            (!searchPar.Name || searchPar.Name.trim() === '' || b.name.toLowerCase().includes(searchPar.Name.trim().toLowerCase())) &&
            // if searchPar.City has value it must be included in the brewery.city
            (!searchPar.City || searchPar.City.trim() === '' || b.city.toLowerCase().includes(searchPar.City.trim().toLowerCase())) &&
            // if searchPar.State has value it must be included in the brewery.state
            (!searchPar.State || searchPar.State.trim() === '' || b.state.toLowerCase().includes(searchPar.State.trim().toLowerCase()))
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          if(
            // Name
            (searchPar.Name && searchPar.Name.trim() !== '' && b.name.toLowerCase().includes(searchPar.Name.trim().toLowerCase())) ||
            // City
            (searchPar.City && searchPar.City.trim() !== '' && b.city.toLowerCase().includes(searchPar.City.trim().toLowerCase())) ||
            // State
            (searchPar.State && searchPar.State.trim() !== '' && b.state.toLowerCase().includes(searchPar.State.trim().toLowerCase()))
          ) {
            return true;
          } else {
            return false;
          }
        }
      });
    } else {
      return list;
    }
  }

  // This method is used by the BreweriesList Page to retrieve the list
  // either from the cache (inside SessionService) or from the Web API
  GetBreweries(forceReload?: boolean) : Promise<Brewery[]> {
    // If the breweries have already been fetched and the reload is NOT forced
    // returns a copy of the list of breweries from the session service
    if (!forceReload && this.sessionSrv.Breweries) {
      return new Promise<Brewery[]> (
        (resolve, _) => {
          resolve(this.filterBreweries(this.sessionSrv.Breweries,this.sessionSrv.Search).slice());
        }
      );
    }

    // otherwise make HTTP request and save fetched breweries in the session service
    // and then return the result
    return new Promise<Brewery[]>((resolve, reject) => {
      this.breweriesRepo.GetAllBreweries().then( breweries => {
        this.sessionSrv.Breweries = breweries.slice();
        resolve(this.filterBreweries(breweries,this.sessionSrv.Search));
      }).catch(err => {
        console.log(err);
        reject();
      });
    });
  }

  // this method is used in the favorite tab
  // it is based on the same method of the general tab in order to avoid code replication
  GetFavoriteBreweries(forceReload?: boolean) : Promise<Brewery[]> {
    return new Promise<Brewery[]>((resolve, reject) => {
      this.GetBreweries(forceReload).then(
        breweries => resolve(breweries.filter(b => b.favorite))
      ).catch( err => reject(err));
    });
  }

  ToggleFavorite(breweryId: number) {
    this.sessionSrv.ToggleFavorite(breweryId);
  }
}
