import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { data } from './model/data';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularTest';
  alldata: data[] = [];
 

  constructor(private http: HttpClient) {
  

  }

  ngOnInit(){
    this.fetchdata();

  }

  onDataFetch(){
    this.fetchdata();
  }



  submitted = false;
  errorMsg='';



  onSubmit(data: {name: string, email: string}){
    this.submitted=true;
    console.log(data);
    // headers are optional
    const headers = new HttpHeaders({'myHeader': 'bau'})
    this.http.post<{name: string}>(
      'https://angulardatabasetest-default-rtdb.firebaseio.com/data.json',
      data,
      {headers: headers}).subscribe((response) => {
      console.log(response)

    })
    //(firebase) url : 'blablabla/data.json'
    this.fetchdata();

  }

  private fetchdata(){
    this.http.get<{[key: string]:data}>(
      // 'https://angulardatabasetest-default-rtdb.firebaseio.com/data.json')
      'https://restcountries.com/v3.1/all'
    )
      .pipe(map((response) => {
        const data = [];
       
        for(const key in response){
          if(response.hasOwnProperty(key)){
            data.push({...response[key], id:key})
           

          }
          
        }
        return data;
      }))
      .subscribe((data) => {
        console.log(data);
        this.alldata=data;
    
      })
  }

  
}
