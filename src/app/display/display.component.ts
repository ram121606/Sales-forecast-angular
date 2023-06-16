import { Component,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit{
  r2score : any ;
  id : any;
  rmse : any;

  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.id = sessionStorage.getItem("id")
    this.r2score = sessionStorage.getItem("r2score");
    this.rmse = sessionStorage.getItem("rmse");
  }

}
