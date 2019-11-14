import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { StorageKeys } from "../enums/storage-keys";

@Injectable()
export class StorageService {

  public constructor (private storage : Storage) { }

  public StoreItem(key: StorageKeys, value: any) : Promise<void> {
    return this.storage.set(key, value);
  }

  public GetItem(key:StorageKeys) : Promise<any> {
    return this.storage.get(key);
  }
}
