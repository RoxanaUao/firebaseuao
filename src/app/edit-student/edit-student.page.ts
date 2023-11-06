import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { RouterLink } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.page.html',
  styleUrls: ['./edit-student.page.scss'],
})
export class EditStudentPage implements OnInit {
  student !: any;
  studentName !:string;
  studentAge !:number;
  studentAddress !:string;
  
  constructor(private crudService:CrudService) {
    
    
    
   }


  ngOnInit() {
    

  }
  

}
