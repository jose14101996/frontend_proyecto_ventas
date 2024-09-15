import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  nombre: any;
  rol: any;

  constructor(private router:Router){}

  ngOnint(): void{
    this.nombre = sessionStorage.getItem("nombre");
    this.rol = sessionStorage.getItem("rol");
  }
  
  cerrar(){
    sessionStorage.setItem("id_usuario","");
    sessionStorage.setItem("nombre","" );
    sessionStorage.setItem("tipo_usuario","");
    this.router.navigate(['login']);
  }

}
