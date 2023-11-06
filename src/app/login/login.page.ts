import { CrudService } from './../service/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  cedula!:string;
  contrasena!:string;

  constructor() { }

  ngOnInit() {
  }
  create_record(){
    let record:any ={};
    record['cedula'] = this.cedula;
    record['contraseña'] = this.contrasena;
    if (this.CrudService.entrar_padre(this.cedula, this.contrasena)==null){
      this.crudService.edit_student(this.studentId, record);
    }else {
      this.crudServie.create_student(record);
    }

    this.setValues();
  }

}
