import { Component, ViewChild, ElementRef, Renderer2, Input } from "@angular/core";

import { ApiKeys } from '../../constants/api-keys';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent {
  @Input() lat: number;
  @Input() lng: number;

  private API_KEY = ApiKeys.Google_API_KEY;

  @ViewChild('map') mapElementRef: ElementRef;

  public constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.getGoogleMaps()
    .then(googleMaps => {
      var location = {lat: +this.lat, lng: +this.lng};

      const mapEl = this.mapElementRef.nativeElement;
      const map = new googleMaps.Map(mapEl, {
        center: location,
        zoom: 16
      });
      const marker = new googleMaps.Marker({position: location, map: map});

      googleMaps.event.addListenerOnce(map, 'idle', () => {
        this.renderer.addClass(mapEl, 'visible');
      });
    })
    .catch(err => {
      console.log(err);
    });

  }

  // The following commented code can be used to render a static map instead of the real one
  // and expand in full screen the real interactive map only if the user click on the image
  // Unfortunatly, this functionality is available only if the API_KEY has valid billing information
  // -----------------------------------------------------------------------------------------------
  // imageSrc: string;
  // this.imageSrc = this.getStaticMap();
  // private getStaticMap() {
    //   return `https://maps.googleapis.com/maps/api/staticmap?center=${this.lat},${this.lng}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:${this.markerTxt}%7C${this.lat},${this.lng}&key=${this.API_KEY}`;
    // }

  // Loading GoogleMaps API script dynamically
  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;

    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' + this.API_KEY;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not available.');
        }
      };
    });
  }
}
