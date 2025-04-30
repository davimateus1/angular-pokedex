import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, PokemonDetailsComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    SharedModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
})
export class FeaturesModule {}
