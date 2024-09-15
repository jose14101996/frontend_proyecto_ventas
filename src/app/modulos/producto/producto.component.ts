import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { OfertasService } from 'src/app/servicios/ofertas.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {

  producto: any;
  categoria: any;
  ofertas: any;
  id_producto: any;
  obj_producto={
   id_producto:0,
   nombre:"",
   descripcion:"",
   precio:0,
   stock:0,
   id_categoria:"",
   id_oferta:""
  }
  validar_id_producto=false;
  validar_nombre=false;
  validar_descripcion=false;
  validar_precio=false;
  validar_stock=false;
  validar_id_categoria=false;
  validar_id_oferta=false;
  mform=false;
  botones_form=false;

  constructor(private sproducto: ProductoService, private scategoria: CategoriaService, private sofertas: OfertasService){}

  ngOnInit(): void{
    this.consulta();
    this.consulta_c();
    this.consulta_o();
  }

  consulta(){
    this.sproducto.consultar().subscribe((resultado:any) =>{
      this.producto = resultado;
    })
  }

  consulta_c(){
    this.scategoria.consultar().subscribe((resultado:any) =>{
      this.categoria = resultado;
    })
  }

  consulta_o(){
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
    this.obj_producto={
      id_producto: 0,
      nombre: "",
      descripcion:"",
      precio:0,
      stock:0,
      id_categoria:"",
      id_oferta:""
    }
  }

  validar(funcion: any){
    if(this.obj_producto.id_producto ==0){
      this.validar_id_producto=false;
    }else{
      this.validar_id_producto=true;
    }

    if(this.obj_producto.nombre ==""){
      this.validar_nombre=false;
    }else{
      this.validar_nombre=true;
    }
    if(this.obj_producto.descripcion==""){
      this.validar_descripcion=false;
    }else{
      this.validar_descripcion=true;
    }
    if(this.obj_producto.precio==0){
      this.validar_precio=false;
    }else{
      this.validar_precio=true;
    }
    if(this.obj_producto.stock==0){
      this.validar_stock=false;
    }else{
      this.validar_stock=true;
    }
    if(this.obj_producto.id_categoria==""){
      this.validar_id_categoria=false;
    }else{
      this.validar_id_categoria=true;
    }
    if(this.obj_producto.id_oferta==""){
      this.validar_id_oferta=false;
    }else{
      this.validar_id_oferta=true;
    }

    if(this.validar_id_categoria==true && this.validar_nombre==true && this.validar_descripcion &&this.validar_precio && this.validar_precio && this.validar_stock && this.validar_id_categoria && this.validar_id_oferta &&funcion=='guardar'){
      this.guardar()
      
    }

    if(this.validar_id_categoria==true && this.validar_nombre==true && this.validar_descripcion &&this.validar_precio && this.validar_precio && this.validar_stock && this.validar_id_categoria && this.validar_id_oferta &&funcion=='editar'){
      this.editar()
      
    }

    
  }

  guardar(){
    this.sproducto.insertar(this.obj_producto).subscribe((dato:any) =>{
      if(dato['resultado']=='ok'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){
      
    Swal.fire({
      title: "¿Esta seguro de eliminar el producto?",
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

        this.sproducto.eliminar(id).subscribe((dato:any) =>{
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

  cargar_datos(items:any, id:number){

    this.obj_producto={
      id_producto:items.id_producto,
      nombre:items.nombre,
      descripcion:items.descripcion,
      precio:items.precio,
      stock:items.stock,
      id_categoria:items.id_categoria,
      id_oferta:items.id_oferta,
     }
    this.id_producto= id;

    this.botones_form=true;
    this.mostrar_form('ver');

  }

  
  editar(){
    this.sproducto.editar(this.id_producto, this.obj_producto).subscribe((datos:any)=>{
      if(datos['resultado']=="ok"){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }


}
