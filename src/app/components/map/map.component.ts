import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MapService } from '../../services/map/map.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public search: string;
  
  @ViewChild('map') 
  private mapRef: ElementRef;
  private startingLocation = 'Amsterdam';
  private zoom = 12;

  constructor(private _mapService: MapService) { }

  public ngOnInit(): void {
    
    this._mapService.findLocation(this.startingLocation, this.mapRef.nativeElement, {
      scrollwheel: true,
      zoom: this.zoom
    });
  }

  public find(search: string) {

    if (search.length == 0) {
      this.search = this.startingLocation;
    }
    this._mapService.findLocation(this.search, this.mapRef.nativeElement, {
      scrollwheel: true,
      zoom: this.zoom
    });
    this.search = '';
  }
}
