import { Component } from '@angular/core';

@Component({
  selector: 'app-scroll-down-button',
  imports: [],
  templateUrl: './scroll-down-button.component.html',
  styleUrl: './scroll-down-button.component.css',
})
export class ScrollDownButtonComponent {
 scrollDown(): void {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  });
  
  }
  isHidden = false;

ngOnInit(): void {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 300) {
      this.isHidden = true;
    } else {
      this.isHidden = false;
    }
  });
}
}
