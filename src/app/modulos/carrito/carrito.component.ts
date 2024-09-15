import { Component } from '@angular/core';
import { CarritoService } from 'src/app/servicios/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {

  carrito: any;
  id_carrito: any;
  obj_carrito={
    id_carrito: "",
    total: 0
  }
  validar_id_carrito=true;
  validar_total=true;
  mform=false;
  botones_formulario=false;


  constructor(private scarrito:CarritoService){}

  ngOnInit(): void{
    this.consulta();
  }

  consulta(){
    this.scarrito.consultar().subscribe((resultado:any) =>{
      this.carrito = resultado;
    })
  }

  mostrar_form(dato:any,){
    switch(dato){
     case "ver":
      this.mform=true;
      break;
      case "no ver":
        this.mform= false;
        this.botones_formulario=false;
        break;
    }
    

  }

  limpiar(){
    this.obj_carrito={
      id_carrito: "",
      total: 0
    }
  }

  validar(funcion: any){
    if(this.obj_carrito.id_carrito ==""){
      this.validar_id_carrito=false;
    }else{
      this.validar_id_carrito=true;
    }

    if(this.obj_carrito.total ==0){
      this.validar_total=false;
    }else{
      this.validar_total=true;
    }

    if(this.validar_id_carrito==true && this.validar_total==true && funcion=='guardar'){
      this.guardar();
    }

    if(this.validar_id_carrito==true && this.validar_total==true && funcion=='editar'){
      this.editar();
    }

    
  }
  guardar(){
    this.scarrito.insertar(this.obj_carrito).subscribe((dato:any) =>{
      if(dato['resultado']=='ok'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){
      
    Swal.fire({
      title: "¿Esta seguro de eliminar el carrito?",
      text: "el proceso no podra ser revertido!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "si, Eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {

        //////////////////////

        this.scarrito.eliminar(id).subscribe((dato:any) =>{
          if(dato['resultado']=='ok'){
            this.consulta();
          }
        })
        //////////////////////
        Swal.fire({
          title: "¡producto eliminado!",
          text: "el producto ha sido eliminado.",
          icon: "success"
        });
      }
    });

  

    
  }

  cargar_datos(items:any, id: number){

    this.obj_carrito={
      id_carrito: items.id_carrito,
      total: items.total,
    }
    this.id_carrito=id;


    this.botones_formulario=true;
    this.mostrar_form('ver');
  }

  editar(){
    this.scarrito.editar(this.id_carrito, this.obj_carrito).subscribe((datos:any) =>{
      if(datos['resultado']=="ok") {
        this.consulta();
      }
    })
    this.limpiar();
    this.mostrar_form('no ver');
  }

}
