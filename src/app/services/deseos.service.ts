import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas : Lista[] = [];
  constructor() { 
    // const lista1 = new Lista('Recolectar piedras del infinito');
    // const lista2 = new Lista('Heroes full');
    // this.listas.push(lista1,lista2);
    //console.log(this.listas);
    this.cargarStorage();
  }

  creaLista(titulo:string){
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id;
  }

  borrarLista(lista : Lista){
    this.listas = this.listas.filter(listasData => listasData.id !== lista.id );
    this.guardarStorage();
  }

  // editarLista(lista :Lista, titulo:string){
  //   let indexLista = this.listas.findIndex(listaData => listaData.id === lista.id);
  //   this.listas[indexLista].titulo = titulo; 
  //   this.guardarStorage();
  // }
  obtenerLista(id: string | number){
    id  =Number(id);
    return this.listas.find( listaData => listaData.id === id)
  }

  guardarStorage(){
    localStorage.setItem('data', JSON.stringify(this.listas));
  }
  

  cargarStorage(){
    if (localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    } else {
      this.listas = []; //Esta línea está de más, porque ya lo inicializamos
    }
  }

}
