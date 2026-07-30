import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ExchangeRateService } from './exchange-rate.service';

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ExchangeRateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getCurrencies', () => {
    it('maps and sorts currencies alphabetically by name', () => {
      let result: { code: string; name: string }[] | undefined;

      service.getCurrencies().subscribe((currencies) => (result = currencies));

      const req = httpMock.expectOne('https://api.frankfurter.dev/v1/currencies');
      req.flush({ USD: 'United States Dollar', EUR: 'Euro', AUD: 'Australian Dollar' });

      expect(result).toEqual([
        { code: 'AUD', name: 'Australian Dollar' },
        { code: 'EUR', name: 'Euro' },
        { code: 'USD', name: 'United States Dollar' },
      ]);
    });

    it('surfaces a friendly error when the request fails', () => {
      let error: Error | undefined;

      service.getCurrencies().subscribe({ error: (err) => (error = err) });

      const req = httpMock.expectOne('https://api.frankfurter.dev/v1/currencies');
      req.error(new ProgressEvent('network error'));

      expect(error?.message).toBe('Não foi possível carregar a lista de moedas.');
    });
  });

  describe('getRate', () => {
    it('returns the rate for the requested currency pair', () => {
      let result: number | undefined;

      service.getRate('USD', 'EUR').subscribe((rate) => (result = rate));

      const req = httpMock.expectOne(
        (r) => r.url === 'https://api.frankfurter.dev/v1/latest' && r.params.get('base') === 'USD' && r.params.get('symbols') === 'EUR'
      );
      req.flush({ amount: 1, base: 'USD', date: '2026-07-30', rates: { EUR: 0.92 } });

      expect(result).toBe(0.92);
    });

    it('surfaces a friendly error when the request fails', () => {
      let error: Error | undefined;

      service.getRate('USD', 'EUR').subscribe({ error: (err) => (error = err) });

      const req = httpMock.expectOne(
        (r) => r.url === 'https://api.frankfurter.dev/v1/latest'
      );
      req.error(new ProgressEvent('network error'));

      expect(error?.message).toBe('Não foi possível obter a taxa de câmbio atual.');
    });
  });
});
