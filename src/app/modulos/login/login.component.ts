import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email:any;
  clave:any;
  error=false;
  usuario:any
  user={
    id_usuario:"",
    nombre: "",
    clave:"",
    tipo_usuario:""
  }

  constructor(private slogin: LoginService, private router:Router){}

  ngOnInit(): void{
    sessionStorage.setItem("id_usuario","");
    sessionStorage.setItem("nombre","" );
    sessionStorage.setItem("tipo_usuario","");
  }

  consulta(tecla:any){
    if(tecla == 13 || tecla==""){
      this.slogin.consultar(this.email, this.clave).subscribe((resultado:any)=>{
      this.usuario=resultado;
      console.log(this.usuario);

      if(this.usuario[0].validar=="valida"){
        sessionStorage.setItem("id_usuario", this.usuario['id_usuario']);
        sessionStorage.setItem("nombre", this.usuario['nombre']);
        sessionStorage.setItem("tipo_usuario", this.usuario['tipo_usuario']);
        this.router.navigate(['dashboard'])

      }else{
        console.log("no entro");
        this.error= true;
        
      }
      })
    }
  }

}
