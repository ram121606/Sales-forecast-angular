import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl,Validators,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit{
  file : any;
  period : any;
  duration : any
  filename : any;
  formfile : any;
  data : any;
  r2score : any;
  id : any;
  rmse : any;
  p = new FormControl('',[Validators.required]);
  d = new FormControl('',[Validators.required]);

  constructor(private http : HttpClient , private router : Router){}
  
  ngOnInit(): void {}

  error(){
    if(this.p.hasError('required')){
      return 'Enter a value';
    }
    if(this.d.hasError('required')){
      return 'Enter a value';
    }
    return ""
  }

  fileSelect(event : any){
    this.file = event.target.files[0];
    this.formfile = new FormData();
    this.formfile.append('file',this.file)
  }
  uploadFile(){
      return this.http.post("http://localhost:5000/upload",this.formfile).subscribe(()=>{
        return "Success"
      });
  }
  uploadData(){
    const data = {
      val1 : this.period,
      val2 : this.duration,
    }
    return this.http.post<any>("http://localhost:5000/data",data).subscribe(response=>{
      this.id = response['id'];
      this.r2score = response['r2'];
      this.rmse = response['rmse']
      sessionStorage.setItem('id',this.id);
      sessionStorage.setItem('r2score',this.r2score);
      sessionStorage.setItem('rmse',this.rmse)
      this.router.navigate(['/display'])
    });
  }
  
  upload(){
    this.uploadFile();
    this.uploadData();
  }

}
