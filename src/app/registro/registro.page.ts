import { NavController } from '@ionic/angular';
import { CrudService } from './../service/crud.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
//import { error } from 'console';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  cedula!:string;
  contrasena!:string;
  nombre!:string;
  correo!:string;
  telefono!:string;

  formReg: FormGroup;

  constructor(
    private CrudService: CrudService,
    private navCtrl: NavController
    ) { 
      this.formReg = new FormGroup({
      email:new FormControl(),
      password:new FormControl()
    })}

  ngOnInit() {
  }
  
  registrar(){
    let record:any ={};
    record['cedula'] = this.cedula;
    record['contraseña'] = this.contrasena;
    record['correo'] = this.correo;
    record['nombre'] = this.nombre;
    record['telefono'] = this.telefono;
    this.CrudService.create_padre(record);
    this.setValues();
    this.onSubmit
  }

  onSubmit(){
    this.CrudService.register(this.formReg.value)
    .then(response =>{
      console.log(response);
    })
    .catch(error =>console.log(error));
  }
  setValues(){
    this.cedula="";
      this.contrasena="";
      this.nombre="";
      this.correo="";      
      this.telefono="";
  }

}
