import { Subject, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonDetails } from 'src/app/core/models/pokemon.model';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PokemonService } from 'src/app/core/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  error = false;
  loading = true;
  searchText = '';

  total = 0;
  limit = 24;
  offset = 0;
  maxOffset = 10000;

  pokemons: PokemonDetails[] = [];

  private searchSubscription!: Subscription;
  private searchSubject = new Subject<string>();
  private allFilteredPokemons: PokemonDetails[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();

    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(800), distinctUntilChanged())
      .subscribe((text) => {
        this.searchText = text;
        this.offset = 0;
        this.loadPokemons();
      });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  loadPokemons(): void {
    this.loading = true;
    this.error = false;

    const isSearching = this.searchText.trim().length > 0;

    this.pokemonService
      .getAllPokemons(isSearching ? this.maxOffset : this.limit, isSearching ? 0 : this.offset)
      .subscribe({
        next: ({ pokemons, count }) => {
          console.log(count);
          if (isSearching) {
            this.allFilteredPokemons = pokemons.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(this.searchText.toLowerCase())
            );

            const paginated = this.allFilteredPokemons.slice(this.offset, this.offset + this.limit);

            this.pokemons = paginated;
            this.total = this.allFilteredPokemons.length;
          } else {
            this.total = count;
            this.pokemons = pokemons;
          }
        },
        error: () => {
          this.error = true;
          this.pokemons = [];
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  onPageChange(newOffset: number): void {
    this.offset = newOffset;

    if (this.searchText.trim()) {
      const paginated = this.allFilteredPokemons.slice(this.offset, this.offset + this.limit);
      this.pokemons = paginated;
    } else {
      this.loadPokemons();
    }
  }

  onSearchTextChanged(text: string): void {
    this.searchSubject.next(text);
  }
}
