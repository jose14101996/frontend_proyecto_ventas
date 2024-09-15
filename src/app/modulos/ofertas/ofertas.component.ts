import { Component } from '@angular/core';
import { OfertasService } from 'src/app/servicios/ofertas.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent {

  ofertas: any;
  id_ofertas:any;
  obj_ofertas={
    id_ofertas:"",
    nombre:"",
    descripcion:"",
    descuento:0,
    fecha_inicio:"",
    fecha_fin:""
  }
  validar_id_ofertas=true;
  validar_nombre=true;
  validar_descripcion=true;
  validar_descuento=true;
  validar_fecha_inicio=true;
  validar_fecha_fin=true;
  mform=false;
  botones_form=false;

  constructor(private sofertas: OfertasService){}

  ngOnInit(): void{
    this.consulta();
  }

  consulta(){
    this.sofertas.consultar().subscribe((resultado:any) =>{
      this.ofertas = resultado;
    })
  }

  
  mostrar_form(dato:any){
    switch(dato){
      case"ver":
      this.mform=true;
      break;
      case "no ver":
        this.mform=false;
        this.botones_form=false;
        break
    }

  }

  limpiar(){
    this.obj_ofertas={
      id_ofertas: "",
      nombre: "",
      descripcion:"",
      descuento:0,
      fecha_inicio:"",
      fecha_fin:""
    }
  }

  validar(funcion: any){
    if(this.obj_ofertas.id_ofertas ==""){
      this.validar_id_ofertas=false;
    }else{
      this.validar_id_ofertas=true;
    }

    if(this.obj_ofertas.nombre ==""){
      this.validar_nombre=false;
    }else{
      this.validar_nombre=true;
    }
    if(this.obj_ofertas.descripcion==""){
      this.validar_descripcion=false;
    }else{
      this.validar_descripcion=true;
    }
    if(this.obj_ofertas.descuento==0){
      this.validar_descuento=false;
    }else{
      this.validar_descuento=true;
    }
    if(this.obj_ofertas.fecha_inicio==""){
      this.validar_fecha_inicio=false;
    }else{
      this.validar_fecha_inicio=true;
    }
    if(this.obj_ofertas.fecha_fin==""){
      this.validar_fecha_fin=false;
    }else{
      this.validar_fecha_fin=true;
    }

    if(this.validar_id_ofertas==true && this.validar_nombre==true && this.validar_descripcion &&this.validar_descuento &&this.validar_fecha_inicio &&this.validar_fecha_fin && funcion=='guardar'){
      this.guardar();
      
    }

    if(this.validar_id_ofertas==true && this.validar_nombre==true && this.validar_descripcion &&this.validar_descuento &&this.validar_fecha_inicio &&this.validar_fecha_fin && funcion=='editar'){
      this.editar();
      
    }

    
  }

  guardar(){
    this.sofertas.insertar(this.obj_ofertas).subscribe((dato:any) =>{
      if(dato['resultado']=='ok'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){
      
    Swal.fire({
      title: "¿Esta seguro de eliminar la oferta?",
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

        this.sofertas.eliminar(id).subscribe((dato:any) =>{
          if(dato['resultado']=='ok'){
            this.consulta();
          }
        })
        //////////////////////
        Swal.fire({
          title: "¡oferta eliminado!",
          text: "la oferta ha sido eliminada.",
          icon: "success"
        });
      }
    });

  

    
  }

  cargar_datos(items:any, id:number){
    this.obj_ofertas={
      id_ofertas:items.id_ofertas,
      nombre:items.nombre,
      descripcion:items.descripcion,
      descuento:items.descuento,
      fecha_inicio:items.fecha_inicio,
      fecha_fin:items.fecha_fin,
    }
    this.id_ofertas= id;

    this.botones_form=true;
    this.mostrar_form('ver');

  }

  
  editar(){
    this.sofertas.editar(this.id_ofertas, this.obj_ofertas).subscribe((datos:any)=>{
      if(datos['resultado']=="ok"){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }


}
