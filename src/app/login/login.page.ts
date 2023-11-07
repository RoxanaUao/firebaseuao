import { CrudService } from './../service/crud.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; 
import { AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private CrudService: CrudService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    ) {
      this.credentialForm=new FormGroup({
        email: new FormControl(),
        password: new FormControl(),
      })
     }

  ngOnInit() {
    this.credentialForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }
  async onSubmit(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.CrudService.register(this.credentialForm.value)
    .then(async(response)=>{
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Registrado :D',
        message: "Inicia sesion con tus credenciales",
        buttons: ['OK'],
      });
      await alert.present();
    })
    .catch(async(error)=>{
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Registro Fallido',
        message: "Error al registrarse",
        buttons: ['OK'],
      });
      await alert.present();
    });
  }

  async ingresar(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.CrudService.login(this.credentialForm.value)
    .then(response=>{
      loading.dismiss();
      console.log(response);
      this.navCtrl.navigateForward('/menu');
    })
    .catch(async(error)=>{
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Inicio Fallido',
        message: "Error en la autenticación",
        buttons: ['OK'],
      });
      await alert.present();
    });
  }

  get email() {
    return this.credentialForm.get('email');
  }
  
  get password() {
    return this.credentialForm.get('password');
  }


}
