import { Component, OnInit ,ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  slider :any;
  img :any;
  clicked :any = 0;
  w :any;
  h : any

  constructor(private elementRef:ElementRef){

  }
  ngOnInit() {
    this.initComparisons();
  }
  initComparisons(){
        var x, i;
        x = this.elementRef.nativeElement.getElementsByClassName("img-comp-overlay");
        for (i = 0; i < x.length; i++) {
          this.compareImages(x[i]);
        }
        this.img = x[0];
  }
  compareImages(img : any){

    this.w = img.offsetWidth;
    this.h = img.offsetHeight;

    img.style.width = (this.w / 2) + "px";

    this.slider = this.elementRef.nativeElement.getElementsByClassName("img-comp-slider")[0];

    this.slider.style.top = (this.h / 2) - (this.slider.offsetHeight / 2) + "px";
    this.slider.style.left = (this.w / 2) - (this.slider.offsetWidth / 2) + "px";
    /*execute a function when the mouse button is pressed:*/
    this.slider.addEventListener("mousedown", this.slideReady.bind(this));
    /*and another function when the mouse button is released:*/
    window.addEventListener("mouseup", this.slideFinish.bind(this));
    /*or touched (for touch screens:*/
     this.slider.addEventListener("touchstart", this.slideReady.bind(this));
    /*and released (for touch screens:*/
    window.addEventListener("touchstop", this.slideFinish.bind(this));


  }
  slideReady(e : any) {
            /*prevent any other actions that may occur when moving over the image:*/
            e.preventDefault();
            this.clicked = 1;
            window.addEventListener("mousemove", this.slideMove.bind(this));
            window.addEventListener("touchmove", this.slideMove.bind(this));

        }
        slideFinish() {
                    /*the slider is no longer clicked:*/
                    this.clicked = 0;
                }
              slideMove(e : any) {
                  var pos;
                  /*if the slider is no longer clicked, exit this function:*/
                  if (this.clicked == 0) return false;
                  /*get the cursor's x position:*/
                  pos = this.getCursorPos(e);
                  /*prevent the slider from being positioned outside the image:*/
                  if (pos < 0) pos = 0;
                  if (pos > this.w) pos = this.w;
                  /*execute a function that will resize the overlay image according to the cursor:*/
                  this.slide(pos);
              }
              getCursorPos(e : any) {
                var xup = this.elementRef.nativeElement.getElementsByClassName("img-comp-overlay")[0];
                    var a, x = 0;
                    e = e || window.event;
                    /*get the x positions of the image:*/
                    a = xup.getBoundingClientRect();
                    /*calculate the cursor's x coordinate, relative to the image:*/
                    x = e.pageX - a.left;
                    /*consider any page scrolling:*/
                    x = x - window.pageXOffset;
                    return x;
                }
                slide(x : any) {
                    this.img.style.width = x + "px";
                    this.slider.style.left = this.img.offsetWidth - (this.slider.offsetWidth / 2) + "px";
                }
}
