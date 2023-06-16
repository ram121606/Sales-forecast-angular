import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',[Validators.required, Validators.minLength(8)])
  hide:boolean=true;
  mail : any;
  pass : any;

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
    const data = {
      usermail : this.mail,
      userpass : this.pass
    }
    return this.http.post("http://localhost:5000/register",data).subscribe(()=>{
      return "Ok"
    })
  }

  signup(){
    this.onButtonClick();
    this.snack.open("Signup","Successful",{duration : 5000})
    this.router.navigate(["/upload"])
  }
}
