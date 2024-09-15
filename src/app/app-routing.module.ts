import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './estructura/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { ProductoComponent } from './modulos/producto/producto.component';
import { OfertasComponent } from './modulos/ofertas/ofertas.component';
import { CategoriaComponent } from './modulos/categoria/categoria.component';
import { ClienteComponent } from './modulos/cliente/cliente.component';
import { CarritoComponent } from './modulos/carrito/carrito.component';
import { PedidoComponent } from './modulos/pedido/pedido.component';
import { UsuarioComponent } from './modulos/usuario/usuario.component';
import { LoginComponent } from './modulos/login/login.component';
import { NoEncontroComponent } from './modulos/no-encontro/no-encontro.component';
import { validaruserGuard } from './guard/validaruser.guard';
import { PedidoinsertarComponent } from './modulos/pedidoinsertar/pedidoinsertar.component';

const routes: Routes = [
  {
    path:'',component: PrincipalComponent,
    children:
    [
      {path: 'dashboard', component: DashboardComponent, /*canActivate: [validaruserGuard]*/},
      {path: 'producto', component: ProductoComponent, /*canActivate: [validaruserGuard]*/},
      {path: 'ofertas', component: OfertasComponent, /*canActivate: [validaruserGuard]*/},
      {path: 'categoria', component: CategoriaComponent, /*canActivate: [validaruserGuard]*/},
      {path: 'cliente', component: ClienteComponent, /*canActivate: [validaruserGuard]*/},
      {path: 'carrito', component: CarritoComponent, /*canActivate: [validaruserGuard]*/},
      {path: 'pedido', component: PedidoComponent, /*canActivate: [validaruserGuard]*/},
      {path: 'pedidoins', component: PedidoinsertarComponent, /*canActivate: [validaruserGuard]*/},
      {path: 'usuario', component: UsuarioComponent, /*canActivate: [validaruserGuard]*/},
      
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },

  {path: 'login', component: LoginComponent},
  {path: '**', component: NoEncontroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
