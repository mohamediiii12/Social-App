import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';
import { MyTranslateService } from './core/services/my-translate.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('social');
  private translate = inject(TranslateService);
  private myTranslate = inject(MyTranslateService);
  constructor() {
    this.translate.addLangs(['ar', 'en']);
    if (localStorage.getItem('lang')) {
      this.translate.use(localStorage.getItem('lang')!);
      this.myTranslate.changeDirection();
    }
  }
}

