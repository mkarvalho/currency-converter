import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyOption, ExchangeRateService } from '../exchange-rate.service';

const MAX_DIGITS = 9;

function countDigits(value: string): number {
  return (value.match(/\d/g) ?? []).length;
}

// mat-error só aparece quando o NgControl está "invalid"; a validação do valor é
// feita por signal (isAmountValid), não por Validators do Angular, então
// precisamos de um matcher próprio para refletir esse estado.
class AmountErrorStateMatcher implements ErrorStateMatcher {
  constructor(private readonly isValid: () => boolean) {}

  isErrorState(): boolean {
    return !this.isValid();
  }
}

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css',
})
export class CurrencyConverterComponent {
  private readonly exchangeRateService = inject(ExchangeRateService);

  readonly amountInput = signal('100');
  readonly fromCurrency = signal('USD');
  readonly toCurrency = signal('EUR');

  readonly currencies = signal<CurrencyOption[]>([]);
  readonly currenciesError = signal<string | null>(null);

  readonly rate = signal<number | null>(null);
  readonly rateError = signal<string | null>(null);
  readonly isLoadingRate = signal(false);

  readonly isAmountValid = computed(() => {
    const value = this.amountInput().trim();
    if (value === '') {
      return false;
    }
    if (!/^\d+(\.\d+)?$/.test(value)) {
      return false;
    }
    return countDigits(value) <= MAX_DIGITS;
  });

  readonly amountErrorMatcher = new AmountErrorStateMatcher(() => this.isAmountValid());

  readonly convertedAmount = computed(() => {
    const rate = this.rate();
    if (!this.isAmountValid() || rate === null) {
      return null;
    }
    const amount = parseFloat(this.amountInput());
    return (amount * rate).toFixed(2);
  });

  constructor() {
    this.exchangeRateService.getCurrencies().subscribe({
      next: (currencies) => this.currencies.set(currencies),
      error: (error: Error) => this.currenciesError.set(error.message),
    });

    effect((onCleanup) => {
      const from = this.fromCurrency();
      const to = this.toCurrency();
      if (!from || !to) {
        return;
      }

      let cancelled = false;
      onCleanup(() => (cancelled = true));

      this.isLoadingRate.set(true);
      this.rateError.set(null);

      this.exchangeRateService.getRate(from, to).subscribe({
        next: (rate) => {
          if (!cancelled) {
            this.rate.set(rate);
            this.isLoadingRate.set(false);
          }
        },
        error: (error: Error) => {
          if (!cancelled) {
            this.rateError.set(error.message);
            this.isLoadingRate.set(false);
          }
        },
      });
    });
  }

  onSwap(): void {
    const from = this.fromCurrency();
    const to = this.toCurrency();
    this.fromCurrency.set(to);
    this.toCurrency.set(from);
  }
}
