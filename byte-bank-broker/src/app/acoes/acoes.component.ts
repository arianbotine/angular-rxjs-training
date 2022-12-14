import { AcoesService } from './services/acoes.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

const ESPERA_DIGITACAO = 300;

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes();
  acoesFiltradas$ = this.acoesInput.valueChanges
    .pipe(
      debounceTime(ESPERA_DIGITACAO),
      filter((valorDigitado) => {
        return valorDigitado.length >= 3 || !valorDigitado.length
      }),
      distinctUntilChanged(),
      switchMap((valorDigitado) => {
        return this.acoesService.getAcoes(valorDigitado)
      }),
      tap(console.log))

  acoes$ = merge(this.todasAcoes$, this.acoesFiltradas$);

  constructor(private acoesService: AcoesService) { }
}
