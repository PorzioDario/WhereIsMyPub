import { BreweryType } from '../enums/brewery-type';
import { Tag } from '../enums/tag';

export class Brewery {
  public id: number;
  public name: string;
  public brewery_type: BreweryType;
  public street: string;
  public city: string;
  public state: string;
  public postal_code: string;
  //this may be an enum (?)
  public country: string;
  public longitude: number;
  public latitude: number;
  public phone: string;
  public website_url: string;
  public updated_at: Date;
  public tag_list: Tag[];
  public favorite: boolean;
  public imageURL: string;

  public constructor (
    id: number,
    name: string,
    brewery_type: string,
    street: string,
    city: string,
    state: string,
    postal_code: string,
    country: string,
    longitude: number,
    latitude: number,
    phone: string,
    website_url: string,
    updated_at: string,
    tag_list: string[]
  ) {
    this.id = id;
    this.name = name;
    this.street = street;
    this.city = city;
    this.state = state;
    this.postal_code = postal_code;
    this.country = country;
    this.longitude = longitude;
    this.latitude = latitude;
    this.phone = phone;
    this.website_url = website_url;
    this.updated_at = new Date(updated_at);
    this.brewery_type = BreweryType[brewery_type];
    this.tag_list = tag_list.map( tg => Tag[tg]);

    this.favorite = false;

    // Pseudo-random assignment of the brewery imageURL
    this.imageURL = 'assets\\imgs\\Brewery-0' + (id % 4) + '.jpg';
  }
}
