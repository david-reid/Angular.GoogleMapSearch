import { Injectable } from '@angular/core';

const getScriptSrc = (callbackName) => {
    return `https://maps.googleapis.com/maps/api/js?key=[YOUR_GOOGLE_MAP_API_KEY]&callback=${callbackName}`;
}
  
declare var google: any;

@Injectable()
export class MapService {

    private map: google.maps.Map;
    private geocoder: google.maps.Geocoder
    private scriptLoadingPromise: Promise<void>;
  
    constructor() {

        this.loadScriptLoadingPromise();
        this.onReady().then(() => {
          this.geocoder = new google.maps.Geocoder();
        });
    }

  
    public findLocation(location, mapHtmlElement: HTMLElement, options: google.maps.MapOptions): Promise<void> {

        return this.onReady().then(() => {

            let map = new google.maps.Map(mapHtmlElement, options);
            let geocoder = new google.maps.Geocoder();
            let mapLocation = { 'address': location };
            
            if (geocoder)  {
    
                geocoder.geocode(mapLocation, function(results, status) {

                    if (status == google.maps.GeocoderStatus.OK) {
                    
                        if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                        
                            map.setCenter(results[0].geometry.location);
                            
                            let marker = new google.maps.Marker({
                                position: results[0].geometry.location,
                                map: map,
                                draggable: true,
                            });
                        } 
                        else { console.log("No results found"); }
                    } 
                    else { 
                        console.log("Geocode was not successful for the following reason: " + status);
                    }
                }); 
            }
        });
    }
  
    private onReady(): Promise<void> {
        return this.scriptLoadingPromise;
    }

    private loadScriptLoadingPromise(): void {
        
        const script = window.document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        const callbackName: string = 'surveyme';
        script.src = getScriptSrc(callbackName);
        
        this.scriptLoadingPromise = new Promise<void>((resolve: Function, reject: Function) => {
            (<any>window)[callbackName] = () => { resolve(); };

            script.onerror = (error: Event) => { reject(error); };
        });

        window.document.body.appendChild(script);
    }

    
}
