import { Component, OnInit } from '@angular/core';
import { Bd } from 'src/app/bd.service';
import * as firebase from 'firebase'
import { Publicacao } from 'src/app/shared/publicacao.model';
@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email: string
  public publicacoes: Publicacao

  constructor(private serviceBd: Bd) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
      this.atualizarTimeLine()
    })
  }
  public atualizarTimeLine(): void {
    this.serviceBd.consultaPublicacoes(this.email)
      .then((publicacoes: any) => {
        this.publicacoes = publicacoes
      })
  }

}
