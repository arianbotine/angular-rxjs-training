import { AcoesAPI } from './modelo/acoes-api';
import { AcoesService } from './services/acoes.service';
import { Acoes } from './modelo/acoes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent implements OnInit, OnDestroy {
  acoesInput = new FormControl();
  acoes: Acoes;
  private subscription: Subscription

  constructor(private acoesService: AcoesService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  ngOnInit(): void {
    this.subscription = this.acoesService.getAcoes().subscribe((acoes: Acoes) => {
      this.acoes = acoes;
    });
  }
}
