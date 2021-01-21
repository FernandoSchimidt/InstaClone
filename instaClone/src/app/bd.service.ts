import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import { Progresso } from './progresso.service'
import { Publicacao } from './shared/publicacao.model'

@Injectable()
export class Bd {

  constructor(
    private servProgress: Progresso
  ) { }

  public publicar(publicacao: any): void {


    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
      .then((resposta: any) => {
        let nomeImagem = resposta.key

        firebase.storage().ref()
          .child(`imagens/${nomeImagem}`)
          .put(publicacao.imagem)
          .on(firebase.storage.TaskEvent.STATE_CHANGED,
            //progresso do upload
            (snapshot: any) => {
              this.servProgress.status = 'andamento'
              this.servProgress.estado = snapshot
            },
            (erro) => {
              this.servProgress.status = 'erro'
            },
            () => {
              //finalização do processo
              this.servProgress.status = 'concluido'
            })
      })
  }

  public consultaPublicacoes(emailUsuario: string): Promise<Publicacao[]> {

    return new Promise((resolve, reject) => {

      //consultar as publicações em database
      firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
        .orderByKey()
        .once("value")
        .then((snapshot: any) => {

          let publicacoes: Array<Publicacao> = []

          snapshot.forEach((childSnapshot: any) => {
            let publicacao: Publicacao = childSnapshot.val()

            firebase.storage().ref()
              .child(`imagens/${childSnapshot.key}`)
              .getDownloadURL()
              .then((url: string) => {
                publicacao.url_imagem = url

                //consultar o nome do usuário
                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                  .once("value")
                  .then((snapshot: any) => {
                    publicacao.nome_usuario = snapshot.val().nome_usuario
                    publicacoes.push(publicacao)
                  })
              })
          })
          resolve(publicacoes)
        })
    })


  }
}
