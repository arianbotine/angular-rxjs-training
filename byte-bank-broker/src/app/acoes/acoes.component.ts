import { AcoesAPI } from './modelo/acoes-api';
import { AcoesService } from './services/acoes.service';
import { Acoes } from './modelo/acoes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes().pipe(tap(() => { console.log('Fluxo inicial') }));
  acoesFiltradas$ = this.acoesInput.valueChanges
    .pipe(
      switchMap((valorDigitado) => {
        return this.acoesService.getAcoes(valorDigitado)
      }),
      tap(() => console.log('Fluxo filtrado')));

  acoes$ = merge(this.todasAcoes$, this.acoesFiltradas$);

  constructor(private acoesService: AcoesService) { }
}
