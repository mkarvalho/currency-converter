import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CurrencyConverterComponent } from './currency-converter.component';

describe('CurrencyConverterComponent', () => {
  let fixture: ReturnType<typeof TestBed.createComponent<CurrencyConverterComponent>>;
  let component: CurrencyConverterComponent;
  let httpMock: HttpTestingController;

  function flushCurrencies() {
    const req = httpMock.expectOne('https://api.frankfurter.dev/v1/currencies');
    req.flush({ USD: 'United States Dollar', EUR: 'Euro' });
  }

  function flushRate(from: string, to: string, rate: number) {
    const req = httpMock.expectOne(
      (r) => r.url === 'https://api.frankfurter.dev/v1/latest' && r.params.get('base') === from && r.params.get('symbols') === to
    );
    req.flush({ amount: 1, base: from, date: '2026-07-30', rates: { [to]: rate } });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CurrencyConverterComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    fixture = TestBed.createComponent(CurrencyConverterComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('creates the component and loads currencies', () => {
    flushCurrencies();
    flushRate('USD', 'EUR', 0.9);

    expect(component).toBeTruthy();
    expect(component.currencies()).toEqual([
      { code: 'EUR', name: 'Euro' },
      { code: 'USD', name: 'United States Dollar' },
    ]);
  });

  it('computes the converted amount once the rate is available', () => {
    flushCurrencies();
    flushRate('USD', 'EUR', 0.9);

    component.amountInput.set('100');
    fixture.detectChanges();

    expect(component.isAmountValid()).toBe(true);
    expect(component.convertedAmount()).toBe('90.00');
  });

  it('flags a non-numeric amount as invalid and withholds the result', () => {
    flushCurrencies();
    flushRate('USD', 'EUR', 0.9);

    component.amountInput.set('abc');
    fixture.detectChanges();

    expect(component.isAmountValid()).toBe(false);
    expect(component.convertedAmount()).toBeNull();
  });

  it('rejects amounts with more than 9 digits', () => {
    flushCurrencies();
    flushRate('USD', 'EUR', 0.9);

    component.amountInput.set('1234567890');
    fixture.detectChanges();

    expect(component.isAmountValid()).toBe(false);
  });

  it('fetches a new rate when the destination currency changes', () => {
    flushCurrencies();
    flushRate('USD', 'EUR', 0.9);

    component.toCurrency.set('USD');
    component.fromCurrency.set('EUR');
    fixture.detectChanges();

    flushRate('EUR', 'USD', 1.1);

    expect(component.rate()).toBe(1.1);
  });

  it('swaps the source and destination currencies on demand', () => {
    flushCurrencies();
    flushRate('USD', 'EUR', 0.9);

    component.onSwap();
    fixture.detectChanges();

    expect(component.fromCurrency()).toBe('EUR');
    expect(component.toCurrency()).toBe('USD');

    flushRate('EUR', 'USD', 1.1);
  });
});
