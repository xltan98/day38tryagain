import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from '../upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit{
  ngOnInit(): void {

    // this.form=this.fb.group({})
  }

  @ViewChild('upload')
  upload!:ElementRef

  // fb=inject(FormBuilder)
  uSvc=inject(UploadService)
  private router = inject(Router)

  // form!:FormGroup
  idArray:string[]=[]

  id!:string

  processForm(){
    //const value= this.form.value
   //this.uSvc.upload(this.upload)

   this.uSvc.upload(this.upload)
   .then(resp => {
     console.info('>>>> resp: ', resp);
    //resp.forEach(r=>{this.uSvc.idList.next(r.id)})
    resp.forEach((r: any) => {
      this.idArray.push(r.id)
    });
    this.uSvc.idList.next(this.idArray)
    this.uSvc.saveId(this.idArray)
    this.router.navigate(['audio']); 
   })
   .catch(error => {
     console.error('error: ', error);
   });

   //this.uSvc.idList.subscribe(result=>{console.log("this result",result)})
}
}
