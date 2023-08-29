import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, inject } from '@angular/core';
import {Subject, firstValueFrom} from "rxjs";
import { Url, listOfId } from './url';

const url='/upload'
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  http=inject(HttpClient)
  idList=new Subject<any[]>()

  // upload(elemRef:ElementRef):Promise<any>{
  //   console.info('>>>> files: ', elemRef.nativeElement.files)

  //   const data = new FormData()
  //   data.set("audioFile",elemRef.nativeElement.files[0])
    
  //   return firstValueFrom(
  //     this.http.post<any>(url, data)
  //   )
  // }

  idArray:Array<string>=[]
  saveId(id:any){
    this.idArray=id;
  }
  retrieveId(){
    return this.idArray;
  }

  upload(elemRef: ElementRef): Promise<any> {
    console.info('>>>> files: ', elemRef.nativeElement.files);
  
    const data = new FormData();
    const files = elemRef.nativeElement.files;
  
    for (let i = 0; i < files.length; i++) {
      data.append('audioFile', files[i]);
    }
  
    return firstValueFrom(this.http.post<any>(url, data));
  }

  //write to collect a get method from the backend to retrieve full url

  getUrl(listOfId:listOfId):Promise<any>{
    return firstValueFrom(
      this.http.post<any>(`/audio`,listOfId)
    )


  }
 
}
