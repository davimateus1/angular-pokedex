import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetails } from 'src/app/core/models/pokemon.model';
import { PokemonService } from 'src/app/core/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  error = false;
  loading = true;
  pokemon: PokemonDetails | null = null;

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadPokemonDetails();
  }

  loadPokemonDetails(): void {
    this.loading = true;
    const id = this.activatedRoute.snapshot.params['pokeId'];

    this.pokemonService.getPokemonDetails(id).subscribe({
      next: (pokemon) => {
        this.pokemon = pokemon;
      },
      error: () => {
        this.error = true;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
