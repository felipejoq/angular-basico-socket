import { Usuario } from './../classes/usuario.class';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario:Usuario = null;

  constructor(private socket: Socket) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      this.socketStatus = true;
      console.log('Conectado al servidor');
      console.log(this.socketStatus);
    })

    this.socket.on('disconnect', () => {
      this.socketStatus = false;
      console.log('Desconectado del servidor');
      console.log(this.socketStatus);
    })
  }

  emit(evento:string, payload?: any, callback?:Function){
    console.log('Emitiendo', evento);
    this.socket.emit(evento, payload, callback);
  }

  listen(evento:string){
    return this.socket.fromEvent(evento);
  }

  loginWS(nombre:string){

    return new Promise((resolve, reject) => {
      console.log('Configurando: ', nombre);
  
      this.emit('configurar-usuario', { nombre }, resp => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();

        resolve();
      });
      
    });

  }

  getUsuario(){
    return this.usuario;
  }

  guardarStorage(){
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage(){
    if(localStorage.getItem('usuario')){
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWS(this.usuario.nombre); 
    }
  }

}
