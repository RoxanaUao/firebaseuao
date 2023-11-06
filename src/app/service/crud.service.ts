import { Injectable } from '@angular/core';
import { FirebaseAppModule } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PickerController } from '@ionic/angular';
import { collection, query, where, getDocs } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore: AngularFirestore) { }

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
    res: this.login_padre(cedula, contraseña);
    if (res == null){
      return 0;
    } else  {
      return this.firestore.collection('padres').doc;
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