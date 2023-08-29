import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UploadService } from '../upload.service';
import { Url, listOfId } from '../url';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit{
  id: string = '';
  url:string='';

  constructor(
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private uSvc:UploadService
  ) {}
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['listOfId']) {
  //     const newListOfId = changes['listOfId'].currentValue; // Get the new value of listOfId
  //     this.listOfUrl = newListOfId.id.map(id => `https://xinlitan98.sgp1.digitaloceanspaces.com/${id}`);
  //   }
  // }

  ngOnInit(): void {
  //  this.id = this.activatedRoute.snapshot.params['id'];
  //   this.title.setTitle('Audio ' + this.id);
  //   this.uSvc.getUrl(this.id)
  //   .then(result=>{this.url=result.url
  //   console.log(">>>>>"+this.url);

  this.listOfId.id=this.uSvc.retrieveId()
  // this.uSvc.idList.subscribe(result => {
  //   this.listOfId.id = result;
  
  
    this.uSvc.getUrl(this.listOfId).then(result1 => {
      const value = result1;
      this.listOfUrl = value;
      console.log(">>>result", result1);
      console.log(">>>URL", this.listOfUrl);
    });
 // });
    

    // this.uSvc.upload(this.upload)
    // .then(resp => {
    //   console.info('>>>> resp: ', resp);
    //  //resp.forEach(r=>{this.uSvc.idList.next(r.id)})
    //  resp.forEach((r: any) => {
    //    this.idArray.push(r.id)
    //  });
    //  this.uSvc.idList.next(this.idArray)
  }
  listOfId:listOfId= { id: [] };
  listOfUrl:string[]=[]

  //)

  // async fetchAudioData() {
  //   try {
  //     const result = await this.uSvc.idList.toPromise();
  //     this.listOfId.id= result;
  
  //     const result1 = await this.uSvc.getUrl(this.listOfId);
  //     this.listOfUrl = result1;
      
  //     console.log(">>>URL", this.listOfUrl);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }
  
  // Call fetchAudioData when needed
 
    
  
  }

  

  // ngOnChanges(changes: SimpleChanges): void {

  
  // }

