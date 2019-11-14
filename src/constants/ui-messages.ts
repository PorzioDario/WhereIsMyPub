import { Injectable } from "@angular/core";

@Injectable()
export class UIMessages {
  fetchingErrorAlert = {
    title: "Fetching error!",
    message: "An error occured during the fetching operation. Please try again later."
  }

  currentSearchButtons = {
    clear: "Clear",
    newSearch: "New"
  }
}
