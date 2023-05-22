import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowEditService {
  public isEditActive$ = new BehaviorSubject(false);

  public toggleEdit() {
    this.isEditActive$.next(!this.isEditActive$.value);
  }
}
