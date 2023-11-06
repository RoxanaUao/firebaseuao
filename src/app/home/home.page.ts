import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Route } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  onEdit!: boolean;
  student!: any;
  studentId!: string;
  studentName!:string;
  studentAge!: number;
  studentAddress!:string;

  constructor(private crudServie: CrudService) {}

  ngOnInit(){
    this.onEdit = false;
    this.crudServie.read_student().subscribe(data=>{
      this.student=data.map(e=>{
        return{
          id:e.payload.doc.id,
          Data:e.payload.doc.data()
        };
      })
    })
  }

  setValues(){
    this.studentName="";
      this.studentAge=0;
      this.studentAddress="";
  }

  create_record(){
    let record:any ={};
    record['Name'] = this.studentName;
    record['Age'] = this.studentAge;
    record['Address'] = this.studentAddress;



    if (this.onEdit){
      this.crudServie.edit_student(this.studentId, record);
    }else {
      this.crudServie.create_student(record);
    }

    this.setValues();
  }

  deleteRecord(id:string){
    this.crudServie.delete_student(id);
  }

  editRecord(record: {id: string, name:string, age:number, address:string}){
    this.onEdit = true;

    this.studentId = record.id;
    this.studentName = record.name;
    this.studentAge = record.age;
    this.studentAddress = record.address;

  }

}
