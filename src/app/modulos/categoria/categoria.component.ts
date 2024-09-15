import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {

  categoria: any;
  id_categoria: any;
  obj_categoria={
    id_categoria:"",
    nombre:"",
    descripcion:""
  }
  validar_id_categoria=true;
  validar_nombre=true;
  validar_descripcion=true;
  mform=false;
  botones_form=false;

  constructor(private scategoria:CategoriaService){}

  ngOnInit(): void{
    this.consulta();
  }

  consulta(){
    this.scategoria.consultar().subscribe((resultado:any) =>{
      this.categoria = resultado;
    })
  }

  mostrar_form(dato:any,){
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
    this.obj_categoria={
      id_categoria: "",
      nombre: "",
      descripcion:""
    }
  }

  validar(funcion:any){
    if(this.obj_categoria.id_categoria ==""){
      this.validar_id_categoria=false;
    }else{
      this.validar_id_categoria=true;
    }

    if(this.obj_categoria.nombre ==""){
      this.validar_nombre=false;
    }else{
      this.validar_nombre=true;
    }
    if(this.obj_categoria.descripcion==""){
      this.validar_descripcion=false;
    }else{
      this.validar_descripcion=true;
    }

    if(this.validar_id_categoria==true && this.validar_nombre==true && this.validar_descripcion==true && funcion=='guardar'){
      this.guardar();
      
    }

    if(this.validar_id_categoria==true && this.validar_nombre==true && this.validar_descripcion==true && funcion=='editar'){
      this.editar();
      
    }

    
  }

  guardar(){
    this.scategoria.insertar(this.obj_categoria).subscribe((dato:any) =>{
      if(dato['resultado']=='ok'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){
      
    Swal.fire({
      title: "¿Esta seguro de eliminar la categoria?",
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

        this.scategoria.eliminar(id).subscribe((dato:any) =>{
          if(dato['resultado']=='ok'){
            this.consulta();
          }
        })
        //////////////////////
        Swal.fire({
          title: "¡categoria eliminada!",
          text: "la categoria  ha sido eliminado.",
          icon: "success"
        });
      }
    });

  

    
  }

  cargar_datos(items: any, id:number){

    this.obj_categoria={
      id_categoria:items.id_categoria,
      nombre:items.nombre,
      descripcion:items.descripcion
    }
    this.id_categoria=id;

    this.botones_form=true;
    this.mostrar_form('ver');
  }

  editar(){
    this.scategoria.editar(this.id_categoria, this.obj_categoria).subscribe((datos:any) =>{
      if(datos['resultado']=="ok"){
        this.consulta();
      }

    });
    this.limpiar();
    this.mostrar_form('no ver');
  }



  

}
