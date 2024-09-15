import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {

  usuario: any;
  id_usuario: any;
  obj_usuario={
    id_usuario:"",
    nombres:"",
    apellidos:"",
    email:"",
    rol:"",
  }
  validar_id_usuario=true;
  validar_nombres=true;
  validar_apellidos=true;
  validar_email=true;
  validar_rol=true;
  mform=false;
  botones_form=false;

  constructor(private susuario: UsuarioService){}

  ngOnInit(): void{
    this.consulta();
  }

  consulta(){
    this.susuario.consultar().subscribe((resultado:any) =>{
      this.usuario = resultado;
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
    this.obj_usuario={
      id_usuario: "",
      nombres: "",
      apellidos:"",
      email:"",
      rol:""
    }
  }

  validar(funcion:any){
    if(this.obj_usuario.id_usuario ==""){
      this.validar_id_usuario=false;
    }else{
      this.validar_id_usuario=true;
    }

    if(this.obj_usuario.nombres ==""){
      this.validar_nombres=false;
    }else{
      this.validar_nombres=true;
    }
    if(this.obj_usuario.apellidos==""){
      this.validar_apellidos=false;
    }else{
      this.validar_apellidos=true;
    }
    if(this.obj_usuario.email==""){
      this.validar_email=false;
    }else{
      this.validar_email=true;
    }
    if(this.obj_usuario.rol==""){
      this.validar_rol=false;
    }else{
      this.validar_rol=true;
    }

    if(this.validar_id_usuario==true && this.validar_nombres==true && this.validar_apellidos &&this.validar_email && this.validar_rol &&funcion=='guardar'){
      this.guardar()
      
    }

    if(this.validar_id_usuario==true && this.validar_nombres==true && this.validar_apellidos &&this.validar_email && this.validar_rol &&funcion=='editar'){
      this.editar()
      
    }

    
  }

  guardar(){
    this.susuario.insertar(this.obj_usuario).subscribe((dato:any) =>{
      if(dato['resultado']=='ok'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){
      
    Swal.fire({
      title: "¿Esta seguro de eliminar el usuario?",
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

        this.susuario.eliminar(id).subscribe((dato:any) =>{
          if(dato['resultado']=='ok'){
            this.consulta();
          }
        })
        //////////////////////
        Swal.fire({
          title: "¡usuario eliminado!",
          text: "el usuario ha sido eliminado.",
          icon: "success"
        });
      }
    });

  

    
  }

  cargar_datos(items:any, id:number){

    this.obj_usuario={
      id_usuario:items.id_usuario,
      nombres:items.nombres,
      apellidos:items.apellidos,
      email:items.email,
      rol:items.rol,
    }
    this.id_usuario=id;

    this.botones_form=true;
    this.mostrar_form('ver');

  }

  
  editar(){
    this.susuario.editar(this.id_usuario, this.obj_usuario).subscribe((datos:any)=>{
      if(datos['resultado']=="ok"){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }


}
