import { Component } from '@angular/core';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';

@Component({
  selector: 'app-root',
  imports: [CurrencyConverterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
