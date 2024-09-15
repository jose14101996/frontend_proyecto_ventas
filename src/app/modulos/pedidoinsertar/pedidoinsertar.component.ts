import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-pedidoinsertar',
  templateUrl: './pedidoinsertar.component.html',
  styleUrls: ['./pedidoinsertar.component.scss']
})
export class PedidoinsertarComponent {

  cliente:any;
  ident_cliente="";
  nombre_cliente="";
  matriz_producto: any = [];
  arreglo_productos: any = [];
  total: any = 0;
  pedido={
    id_pedido: 0,
    fecha: "",
    estado: [],
    id_cliente: 0

  }

  constructor(private router:Router, private scliente: ClienteService, private spedido: PedidoService){}

   ngOnInit(): void{
    this.consulta_cliente();
   }

   consulta_cliente(){
    this.scliente.filtro(this.ident_cliente).subscribe((result:any)=>{
      this.cliente=result;
      this.nombre_cliente= this.cliente[0].nombre;
      console.log(this.cliente);
      
    })
   }
   seleccionar(valores:any, id:number){
    let cantidad= Number(prompt("ingrese la cantidad a llevar"));
    this.arreglo_productos =[valores.ID, valores.nombre, valores.stock, Number(valores.precio)];
    this.matriz_producto.push(this.arreglo_productos);

    let largo = this.matriz_producto.length;
    this.total = 0;
    for (let i=0; i<largo; i++){
      this.total= this.total + this.matriz_producto [i][4];
    }
    //console.log(this.matriz_producto)
   }

   guardar(){
    let fecha = new Date();
    this.pedido.fecha= `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
    this.pedido.id_cliente= Number(sessionStorage.getItem('id'));
    this.pedido.estado= this.matriz_producto;
    this.pedido.id_pedido=Number(this.cliente[0].id_pedido);

    this.spedido.insertar(this.pedido).subscribe((datos:any)=>{
      if(datos['resultado']=='ok'){
        console.log(datos['resultado']);
        this.router.navigate(['pedido'])
      }
    })
   }

}
