import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [PokemonCardComponent, PaginationComponent],
  exports: [PokemonCardComponent, PaginationComponent],
  imports: [CommonModule],
})
export class SharedModule {}
