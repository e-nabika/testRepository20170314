import { Component,
  NgModule,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes ,
  ViewChild } from '@angular/core';

import {Observable} from 'rxjs/Rx';

import {BrowserModule} from '@angular/platform-browser';


import { HomeComponent } from './home/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
   animations: [
    trigger('heroState', [
      state('inactive', style({
        opacity: 0,
        backgroundColor:'#eeeeee', 
       // opacity:0.1, 
        position: 'absolute',
        width: '100px',
        top: '100px',
        height:'100px',
        left:'-100px',
        transform:'rotate(0deg)' 
     /*   transform:'scale(1)' */
      })),
      state('active',   style({
        opacity: 1,
        backgroundColor:'red',
      //  opacity:1,  
        position: 'absolute',
        width: '100px',
        height:'100px',
        top: '300px',
        left: '300px',
        transform:'rotate(360deg)' 
      })),
      state('active-r',   style({
        opacity: 1,
        backgroundColor:'red',
      //  opacity:1,  
        position: 'absolute',
        width: '100px',
        height:'100px',
        top: '300px',
        left: '300px',
        transform:'rotate3d(1,1,1,180deg)' 
      })),
      state('inactive2', style({
        opacity: 0,
        backgroundColor:'#eeeeee', 
        position: 'absolute',
        width: '100px',
        top: '100px',
        height:'100px',
        left:'-100px',
      })),
      state('active2',   style({
        opacity: 1,
        backgroundColor:'red',
        position: 'absolute',
        width: '100px',
        height:'100px',
        top: '300px',
        left: '200px'
      })),
      //transition('inactive => active', animate('0.5s ease-in')),
   //   transition('inactive => active', [ animate(5000, keyframes([
    //    style({opacity: 1, transform: 'translateX(-100%) rotate(90dig)', offset: 0}),
      //  style({opacity: 1, transform: 'translateX(-100%) rotate(190dig)',  offset: 0.3}),
   //     style({opacity: 1, transform: 'translateX(-100%) rotate(0dig)',      offset: 0}),
   //     style({opacity: 1, transform: 'translateX(-100%) rotate(90dig)', offset: 0.7}) ] ))
     //   style({opacity: 1, transform: 'translateX(-100%)', offset: 0}),
     //   style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
     //   style({opacity: 1, transform: 'translateX(0px)', top: '300px',     offset: 0.6})] ))
  //    ]),
      transition('* => active', animate('2s cubic-bezier(0.680, -0.550, 0.265, 1.550)')),
      transition('* => inactive', animate('2s cubic-bezier(0.680, -0.550, 0.265, 1.550)')),
      transition('* => active-r', animate('3s cubic-bezier(0.680, -0.550, 0.265, 1.550)')),
      transition('inactive2 => active2', [ animate(5000, keyframes([
          //style({opacity: 1, transform: 'translateX(-100%) ', offset: 0}),
          style({opacity: 1,  offset: 0}),
          style({opacity: 1, transform: 'translateX(100%) rotate(0deg)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(100%) rotate(180deg)',top: '300px', offset: 0.7}),
          style({opacity: 1, transform: 'translateX(300%) rotate(360deg)',top: '300px',  backgroundColor:'red',offset: 1}) ] ))
  

     //transition('inactive => active', animate('1s')),
     //transition('active => inactive', animate('1s'))
    ])
  ])]
})
export class AppComponent {
  title:string = 'アニメーションテスト';
  contents:string = null; 
  ticks:number = 0;
  dispString:string = "";
  subscription:any = null;
  timer;

  @ViewChild('view1') homeComponent: HomeComponent;
  @ViewChild('view2') homeComponent2: HomeComponent;

  clicked(event){
    this.contents = "Clicked!";
  }
  hero:string = 'inactive';
  hero2:string = 'inactive2';
  constructor() { }

  ngOnInit() {
  }

  toggleState() {
     if (this.hero === 'active') {
       this.hero = 'inactive';
     } else {
       this.hero = 'active';
     }
  }

  toggleStater() {
     if (this.hero === 'active') {
       this.hero = 'active-r';
     } else {
       this.hero = 'active';
     }
  }

  toggleState2() {
     this.startTimer();
     if (this.hero2 === 'active2') {
       this.hero2 = 'inactive2';
     } else {
       this.hero2 = 'active2';
     }
  }
  toggleState3() {
    this.homeComponent.toggleStates();
  }
  toggleState4() {
    this.homeComponent2.toggleStates();
  }

  startTimer() {
    this.timer = Observable.timer(0,200);
    this.dispString = "";
    this.subscription = this.timer.subscribe(
      (t)=>{
        this.ticks = t;
        this.dispString = t + this.dispString;
      }
    );

  }
  animationDone() {
   if (this.subscription != null ){
     this.subscription.unsubscribe(event);
   }
    console.log("ani done");
  }

}
