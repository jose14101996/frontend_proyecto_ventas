import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent{

  cliente: any;
  modal=false;
  producto:any;
  total: any;

  constructor(private router: Router, private spedido: PedidoService){}

  ngOnInit(): void {
    this.consulta();
  }

  consulta(){
    this.spedido.consultar().subscribe((result:any)=>{
      this.cliente=result;
    })
  }

  consultap(id:number){
    this.spedido.consultarp(id).subscribe((result:any) =>{
      this.producto= result;
      this.total=0;
      for(let i=0; i<this.producto.length; i++){
        this.total = this.total + this.producto [i][3];
      }
    })
  }

  insertar(){
    this.router.navigate(['pedidoins']);
  }

  mostrar_modal(dato:any, id:number){
    switch(dato){
      case 0:
        this.modal = false;
      break;
      case 1:
        this.modal = true;
        this.consultap(id);
      break;      
    }
  }
}

