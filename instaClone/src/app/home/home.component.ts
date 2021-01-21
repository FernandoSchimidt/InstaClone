import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Auth } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@Injectable()
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes') public publicacoes: any

  constructor(
    private service: Auth
  ) { }

  ngOnInit(): void {
  }
  public sair(): void {
    this.service.sair()
  }
  atualizarTimeLine(): void {
    this.publicacoes.atualizarTimeLine()
  }

}
