import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('',[Validators.required, Validators.minLength(8)])
    hide:boolean=true;
    mail : any;
    pass : any;
    resp : any;

    constructor (private router : Router, private http : HttpClient, private snack : MatSnackBar ){
      
    }
    
    ngOnInit(): void{
      this.hide=true;
    }
    
    getErrorMessage() {

      if (this.email.hasError('required')) {
        return 'You must enter a value';
      }

      return this.email.hasError('email') ? 'Not a valid email' : '';
    }
    getErrorMessageForPass(){
      if(this.password.hasError('required')){
        return 'Please enter a password';
      }
    
      return this.password.hasError('minlength')?'Please enter a valid password':''; 
    }
    onButtonClick(){
      const data={
        mail : this.mail
      }
      return this.http.post<any>('http://localhost:5000/validate',data).subscribe(response => {
        this.resp = response['result'];
        if(this.resp == "True"){
          this.snack.open("Login","Successful",{duration : 5000})
          this.router.navigate(["/upload"])
          return ""
        }else{
          this.snack.open("Login","User Not Found! Please Signup",{duration : 5000})
          this.router.navigate(["/signup"])
          return ""
        }
      })
    }
}
