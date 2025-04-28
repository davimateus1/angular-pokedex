import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonDetails } from 'src/app/core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @Input() pokemon!: PokemonDetails;

  constructor(private router: Router) {}

  goToDetails() {
    this.router.navigate(['/pokemon', this.pokemon.id]);
  }
}
