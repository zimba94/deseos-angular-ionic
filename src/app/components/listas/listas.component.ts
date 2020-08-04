import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent{
  @ViewChild(IonList) lista: IonList;
  @Input() tabTerminados= true;
  
  constructor(public deseosService: DeseosService,private router: Router, private alertCtrl: AlertController) { }
  

  listaSeleccionada(lista: Lista){

    if (this.tabTerminados) {
      this.router.navigateByUrl(`tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`tabs/tab1/agregar/${lista.id}`);
    }
    
  }

  async editarLista(lista: Lista){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Editar Titulo',
      inputs: [{
        name: 'titulo',
        type: 'text',
        value: lista.titulo,
        placeholder: 'Nombre de la lista'

      }],
      buttons: [
       {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          this.lista.closeSlidingItems();
        }
       },
       {
        text: 'Guardar',
        handler: (data) => {
          console.log(data);
          if (data.titulo.length ===0) {
            return;
          }
          //this.deseosService.editarLista(lista, data.titulo);
          lista.titulo = data.titulo;
          this.deseosService.guardarStorage();
          this.lista.closeSlidingItems();
        },

       }
      ]
    });
    alert.present();

  }

  borrarLista(lista : Lista){
    this.deseosService.borrarLista(lista);
  }

}
