import { Component } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

  cliente:any;
  id_cliente:any;
  obj_cliente={
    id_cliente:"",
    nombres:"",
    apellidos:"",
    email:"",
    telefono:0,
    direccion:""
  }
  validar_id_cliente=true;
  validar_nombres=true;
  validar_apellidos=true;
  validar_email=true;
  validar_telefono=true;
  validar_direccion=true;
  mform=false;
  botones_form=false;

  constructor(private scliente: ClienteService){}

  ngOnInit(): void{
    this.consulta();
  }

  consulta(){
    this.scliente.consultar().subscribe((resultado:any) =>{
      this.cliente = resultado;
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
    this.obj_cliente={
      id_cliente: "",
      nombres: "",
      apellidos:"",
      email:"",
      telefono:0,
      direccion:""
    }
  }

  validar(funcion:any){
    if(this.obj_cliente.id_cliente ==""){
      this.validar_id_cliente=false;
    }else{
      this.validar_id_cliente=true;
    }

    if(this.obj_cliente.nombres ==""){
      this.validar_nombres=false;
    }else{
      this.validar_nombres=true;
    }
    if(this.obj_cliente.apellidos==""){
      this.validar_apellidos=false;
    }else{
      this.validar_apellidos=true;
    }
    if(this.obj_cliente.email==""){
      this.validar_email=false;
    }else{
      this.validar_email=true;
    }
    if(this.obj_cliente.telefono==0){
      this.validar_telefono=false;
    }else{
      this.validar_telefono=true;
    }
    if(this.obj_cliente.direccion==""){
      this.validar_direccion=false;
    }else{
      this.validar_direccion=true;
    }

    if(this.validar_id_cliente==true && this.validar_nombres==true && this.validar_apellidos &&this.validar_email &&this.validar_telefono &&this.validar_direccion &&funcion=='guardar'){
      this.guardar()
      
    }

    if(this.validar_id_cliente==true && this.validar_nombres==true && this.validar_apellidos &&this.validar_email &&this.validar_telefono &&this.validar_direccion &&funcion=='editar'){
      this.editar();
      
    }

    
  }

  guardar(){
    this.scliente.insertar(this.obj_cliente).subscribe((dato:any) =>{
      if(dato['resultado']=='ok'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){
      
    Swal.fire({
      title: "¿Esta seguro de eliminar el cliente?",
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

        this.scliente.eliminar(id).subscribe((dato:any) =>{
          if(dato['resultado']=='ok'){
            this.consulta();
          }
        })
        //////////////////////
        Swal.fire({
          title: "¡cliente eliminado!",
          text: "el cliente ha sido eliminado.",
          icon: "success"
        });
      }
    });

  

    
  }

  cargar_datos(items:any, id: number){

    this.obj_cliente={
      id_cliente:items.id_cliente,
      nombres:items.nombres,
      apellidos:items.apellidos,
      email:items.email,
      telefono:items.telefono,
      direccion:items.direccion,
    }
    this.id_cliente=id;

    this.botones_form=true;
    this.mostrar_form('ver');
  }

  editar(){
    this.scliente.editar(this.id_cliente, this.obj_cliente).subscribe((datos:any)=>{
      if(datos['resultado']=="ok"){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }


}
