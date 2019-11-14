import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { map, delay } from 'rxjs/operators';

import { Brewery } from "../models/Brewery.model";

@Injectable()
export class BreweriesRepository {
  private breweriesAPI = 'https://api.openbrewerydb.org/breweries';

  public constructor(private httpClient: HttpClient) {}

  GetAllBreweries() : Promise <Brewery[]> {
    return new Promise<Brewery[]> (
      (resolve, reject) => {
        this.httpClient.get<any[]>(this.breweriesAPI).pipe(
          delay(500),
          map( response => {
          return response.map( br => new Brewery(br.id,
            br.name,
            br.brewery_type,
            br.street,
            br.city,
            br.state,
            br.postal_code,
            br.country,
            br.longitude,
            br.latitude,
            br.phone,
            br.website_url,
            br.updated_at,
            br.tag_list))
        } )).subscribe(
          breweries => {
            resolve(breweries);
          },
          err => {
            reject();
          }
        );
      }
    );
  }
}
