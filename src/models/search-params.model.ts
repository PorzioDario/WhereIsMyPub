export enum SearchMode {
  AllFilters = 'AND',
  AnyFilter = 'OR'
}

export class SearchParams {
  public Name: string;
  public City: string;
  public State: string;
  public Mode: SearchMode = SearchMode.AllFilters;

  public constructor (name:string, city:string, state:string, mode?: SearchMode ) {
    this.Name = name;
    this.City = city;
    this.State = state;
    this.Mode = mode ? mode : SearchMode.AllFilters;
  }
}
