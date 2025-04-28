import { Component, OnInit } from '@angular/core';
import { PokemonDetails } from 'src/app/core/models/pokemon.model';
import { PokemonService } from 'src/app/core/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  error = false;
  loading = true;

  total = 0;
  limit = 20;
  offset = 0;

  pokemons: PokemonDetails[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.loading = true;
    this.pokemonService.getAllPokemons(this.limit, this.offset).subscribe({
      next: ({ count, pokemons }) => {
        this.pokemons = pokemons;
        this.total = count;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  onPageChange(newOffset: number): void {
    this.offset = newOffset;
    this.loadPokemons();
  }
}
