import {Component, OnDestroy, OnInit} from '@angular/core';

import {interval, Observable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/internal/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSub: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSub =  interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    const customIntervalOb = new Observable(observer => {
      let count = 0;
      setInterval(() =>{
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3){
          observer.error(new Error('this is an error 1337'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSub = customIntervalOb.pipe(filter(data => {
      return data > 0;
    }), map((data:number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      alert(error.message);
    }, () => {
      console.log('Complete');
    });
  }

  ngOnDestroy() {
    this.firstObsSub.unsubscribe();
  }

}
