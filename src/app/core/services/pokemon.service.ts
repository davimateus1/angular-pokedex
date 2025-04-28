import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { Pokemon, PokemonDetails } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getAllPokemons(
    limit = 20,
    offset = 0
  ): Observable<{ pokemons: PokemonDetails[]; count: number }> {
    return this.http
      .get<{ count: number; results: Pokemon[] }>(`${this.apiUrl}?limit=${limit}&offset=${offset}`)
      .pipe(
        mergeMap((response) => {
          const requests = response.results.map((pokemon) =>
            this.http.get<PokemonDetails>(pokemon.url)
          );
          return forkJoin(requests).pipe(
            map((pokemons) => ({
              pokemons,
              count: response.count,
            }))
          );
        })
      );
  }

  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.apiUrl}/${name}`);
  }
}
