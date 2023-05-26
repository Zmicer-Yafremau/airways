import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowEditService {
  public isEditActive$ = new BehaviorSubject(false);

  public toggleEdit() {
    console.log('do', this.isEditActive$.getValue());
    this.isEditActive$.next(!this.isEditActive$.getValue());
    console.log('posle', this.isEditActive$.getValue());
  }
}
