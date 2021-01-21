import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Bd } from 'src/app/bd.service';
import * as firebase from 'firebase'
import { Progresso } from 'src/app/progresso.service';
import { Observable, interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>()
  public email: string;
  private imagem: any;

  public progressoPublicacao: string = 'pendente'
  public porcentgemUpload: number;

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    private service: Bd,
    private servProgress: Progresso
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })

  }
  public publicar(): void {
    this.service.publicar({
      titulo: this.formulario.value.titulo,
      email: this.email,
      imagem: this.imagem[0]
    })

    let acompanhamentoUpload = interval(1500)
    let continua = new Subject<boolean>();
    continua.next(true);

    acompanhamentoUpload.pipe(
      takeUntil(continua))
      .subscribe(() => {
        // console.log(this.servProgress.status)
        // console.log(this.servProgress.estado)
        this.progressoPublicacao = 'andamento'

        this.porcentgemUpload = Math.round((this.servProgress.estado.bytesTransferred / this.servProgress.estado.totalBytes) * 100)

        if (this.servProgress.status === 'concluido') {
          this.progressoPublicacao = 'concluido'
          //emiter um evento do componente parent 'home'
          this.atualizarTimeLine.emit()
          continua.next(false)
        }

      })
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files
  }

}
