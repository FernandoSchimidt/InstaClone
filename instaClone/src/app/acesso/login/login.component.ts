import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import * as firebase from 'firebase'
import { Auth } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  })


  constructor(
    private service: Auth
  ) { }

  ngOnInit(): void {
  }

  public exibirPainelcadastro(): void {
    this.exibirPainel.emit('cadastro')
  }

  public authenticar(): void {
    this.service.authenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    )
  }
}
