import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators'
import { Acao } from '../modelo/acao';
import { AcoesAPI } from '../modelo/acoes-api';

@Injectable({
  providedIn: 'root',
})
export class AcoesService {
  constructor(private httpClient: HttpClient) { }

  public getAcoes() {
    return this.httpClient.get<AcoesAPI>('http://localhost:3000/acoes')
      .pipe(
        tap((valor) => { console.log(valor) }),
        pluck('payload'),
        map((acoes) => {
          return acoes.sort(
            (acaoA, acaoB) => { return this.ordenarPorCodigo(acaoA, acaoB) })
        })
      );
    /*
    Ordenando com o map
    return this.httpClient.get<any>('http://localhost:3000/acoes')
      .pipe(
        tap((valor) => { console.log(valor) }),
        map((acoes) => { return acoes.payload }),
        map((acoes) => {
          return acoes.sort(
            (acaoA, acaoB) => { return this.ordenarPorCodigo(acaoA, acaoB) })
        })
      );
      */
  }

  private ordenarPorCodigo(acaoA: Acao, acaoB: Acao) {
    if (acaoA.codigo > acaoB.codigo) {
      return 1;
    }
    if (acaoA.codigo < acaoB.codigo) {
      return -1;
    }

    return 0;
  }
}
