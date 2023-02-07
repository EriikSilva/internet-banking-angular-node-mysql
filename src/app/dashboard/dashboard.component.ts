import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Route } from '@angular/router';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TransferenciasService } from '../services/transferencias.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  nome: any;
  id_user: any;
  saldo: any;
  numero_conta: any;
  teste:any
  cargos:any;
  formularioDinamico:any;
  criarFuncionariosDialog: boolean;
  constructor(
    private usuariosService: UsuariosService,
    private authService: AuthService,
    private trasnferenciaService:TransferenciasService
    // private router: Router
  ) {}

  ngOnInit(): void {
    // this.nome = localStorage['nome']

    this.id_user = localStorage['id'];
    

    this.usuariosService.getUsuario(this.id_user).subscribe((res: any) => {
      this.saldo = res.usuario.saldo;
      this.numero_conta = res.usuario.numero_conta;
      this.nome = res.usuario.nome;
      console.log('dashboard', res);
    });
  }

  transferenciaForm = new FormGroup({
    numero_conta_recebedor: new FormControl('', Validators.required),
    // numero_conta_pagador: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required)
    
  })


  hideDialog() {
    this.criarFuncionariosDialog = false
  }

  inserirFuncionario(){

    this.formularioDinamico = this.transferenciaForm.value
    this.formularioDinamico.numero_conta_pagador = this.numero_conta

    console.log('transferencias', this.formularioDinamico);

    this.trasnferenciaService.postTransferencias(this.formularioDinamico)
    .subscribe((res:any) => {
      console.log(res)
      this.hideDialog();
      window.location.reload();
    })

  }
  dialogCriar(){
    this.criarFuncionariosDialog = true
  }

}