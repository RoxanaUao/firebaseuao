import { Injectable } from '@angular/core';
import { FirebaseAppModule } from '@angular/fire/app';
//import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PickerController } from '@ionic/angular';
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore';
import { Auth,signOut,createUserWithEmailAndPassword,signInWithEmailAndPassword} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore: AngularFirestore,private auth:Auth) { }

  register({email,password}:any){
    return createUserWithEmailAndPassword(this.auth,email,password);
  }

  login({email,password}:any){
    return signInWithEmailAndPassword(this.auth,email,password);
  }

  salir(){
    return signOut(this.auth);
  }


  create_student(record:{}){
    return this.firestore.collection('Student').add(record);
  }

  read_student(){
    return this.firestore.collection('Student').snapshotChanges();
  }

  delete_student(id:string){
    return this.firestore.collection('Student').doc(id).delete();
  }

  edit_student(id: string, record: {}){
    return this.firestore.collection('Student').doc(id).update(record);
  }
  create_padre(record:{}){
    return this.firestore.collection('padres').add(record);
  }
  entrar_padre(cedula:string, contraseña:string){
    let response : boolean;
    const documentos = this.login_padre(cedula, contraseña);
    if (Array.isArray(documentos) && documentos.length === 0){
      return response=false;
    } else  {
      return response= true;
    };
  }
  async login_padre(cedula: string, contraseña: string) {
    const q = query(collection(this.firestore.firestore, 'miColeccion'), 
      where('cedula', '==', cedula),
      where('contraseña', '==', contraseña)
    );
    const querySnapshot = await getDocs(q);
    // Obtener los documentos que cumplen con los filtros
    const documentos = querySnapshot.docs.map(doc => doc.data());
    return documentos;
  }


}