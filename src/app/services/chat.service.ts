import { WebsocketService } from './websocket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService:WebsocketService) {

  }

  sendMenssage(mensaje:string){
    const payload = {
      de: this.wsService.getUsuario().nombre,
      cuerpo: mensaje
    };

    this.wsService.emit('mensaje', payload);

  }

  getMessage(){
    return this.wsService.listen('mensaje-nuevo');
  }

  getMessagesPrivate(){
    return this.wsService.listen('mensaje-privado');
  }

}
