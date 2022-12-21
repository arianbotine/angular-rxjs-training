import { AcoesAPI } from './modelo/acoes-api';
import { AcoesService } from './services/acoes.service';
import { Acoes } from './modelo/acoes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { merge, Subscription } from 'rxjs';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';

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
      filter((valorDigitado) => {
        return valorDigitado.length >= 3 || !valorDigitado.length
      }),
      debounceTime(ESPERA_DIGITACAO),
      tap((valorDigitado) => console.log('Fluxo filtrado ' + valorDigitado)),
      switchMap((valorDigitado) => {
        return this.acoesService.getAcoes(valorDigitado)
      }));

  acoes$ = merge(this.todasAcoes$, this.acoesFiltradas$);

  constructor(private acoesService: AcoesService) { }
}
