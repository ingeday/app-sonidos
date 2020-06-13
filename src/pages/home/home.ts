import { Animal } from './../../../../sonidos/src/interfaces/animal.interface';
import { ANIMALES } from './../../data/data.animales';
import { Component } from '@angular/core';
import { NavController, Refresher, reorderArray } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[];
  audio = new Audio();
  audioTiempo: any;
  ordering:boolean = false;

  constructor(public navCtrl: NavController) {
    this.animales = ANIMALES.slice();
    
  }

  play(animal:Animal) {
    
    this.pause(animal);

    if(animal.reproduciendo) {
     animal.reproduciendo = false;
     return;
    }

    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();
    animal.reproduciendo = true;

    this.audioTiempo = setTimeout(()=> animal.reproduciendo=false, animal.duracion*1000);
  }

  private pause(animalSelected:Animal) {
    clearTimeout( this.audioTiempo );
    this.audio.pause();
    this.audio.currentTime = 0;

    for(let animal of this.animales) {
      if(animal.nombre != animalSelected.nombre) {
        animal.reproduciendo = false;
      }
    }
  }

  remove(index:number) {
    this.animales.splice(index, 1)
  }

  doRefresh(refresher:Refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      this.animales = ANIMALES.slice();
      refresher.complete();
    }, 2000);
  }

  reOrder(reorder:any) {
    this.animales = reorderArray(this.animales, reorder);
  }

}
