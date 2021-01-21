import { Usuario } from "./acesso/usuario.model";
import * as firebase from 'firebase'
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class Auth {

  public token_id: string;

  constructor(private router: Router) { }

  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((res: any) => {
        //remove a senha do atributo senha do objeto usuario
        delete usuario.senha
        //registrando dados complementares do usuario
        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set(usuario)

      })
      .catch((err: Error) => {
        console.log(err)
      })
  }

  public authenticar(email: string, senha: string): void {
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((res) => {
        firebase.auth().currentUser.getIdToken()
          .then((token) => {
            this.token_id = token
            localStorage.setItem('token', token)
            this.router.navigate(['/home'])
          })
      })
      .catch((err: Error) => {
        console.log('aqui: ' + err)
      })
  }
  public authenticated(): boolean {
    if (this.token_id == undefined && localStorage.getItem('token') != null) {
      this.token_id = localStorage.getItem('token')
    }
    if (this.token_id === undefined) {
      this.router.navigate(['']);
    }
    return this.token_id != undefined
  }
  public sair(): void {
    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem('token')
        this.token_id = undefined
        this.router.navigate([''])
      })

  }
}
