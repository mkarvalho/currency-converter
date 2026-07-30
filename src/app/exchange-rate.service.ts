import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

export interface CurrencyOption {
  code: string;
  name: string;
}

interface FrankfurterCurrenciesResponse {
  [code: string]: string;
}

interface FrankfurterLatestResponse {
  amount: number;
  base: string;
  date: string;
  rates: { [code: string]: number };
}

const FRANKFURTER_BASE_URL = 'https://api.frankfurter.dev/v1';

@Injectable({ providedIn: 'root' })
export class ExchangeRateService {
  private readonly http = inject(HttpClient);

  getCurrencies(): Observable<CurrencyOption[]> {
    return this.http.get<FrankfurterCurrenciesResponse>(`${FRANKFURTER_BASE_URL}/currencies`).pipe(
      map((response) =>
        Object.entries(response)
          .map(([code, name]) => ({ code, name }))
          .sort((a, b) => a.name.localeCompare(b.name))
      ),
      catchError((error) =>
        throwError(() => new Error('Não foi possível carregar a lista de moedas.', { cause: error }))
      )
    );
  }

  getRate(from: string, to: string): Observable<number> {
    return this.http
      .get<FrankfurterLatestResponse>(`${FRANKFURTER_BASE_URL}/latest`, {
        params: { base: from, symbols: to },
      })
      .pipe(
        map((response) => response.rates[to]),
        catchError((error) =>
          throwError(() => new Error('Não foi possível obter a taxa de câmbio atual.', { cause: error }))
        )
      );
  }
}
