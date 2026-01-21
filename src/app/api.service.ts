import { Inject, Injectable } from '@angular/core';
import { HttpClientModule , HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { subscribe } from 'diagnostics_channel';



@Injectable({
  providedIn: 'root'
})
export class APIService {





  // private countryNameSubject = new BehaviorSubject<any | null>(null);
  // countryName= this.countryNameSubject.asObservable();

  // setCountryName(code: any) 
  //   {this.countryNameSubject.next(code);}
  

  // getCountryName(): any | null 
  //   {return this.countryNameSubject.getValue();

  //   }


      

  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  show() {
    this.loadingSubject.next(true);
    // document.body.style.overflow = 'hidden'; //  يمنع السكروول
  
  }

  hide() {
    this.loadingSubject.next(false);
    // document.body.style.overflow = 'auto'; //  يرجع السكروول
  }





  apiLink = 'https://pshrcser.pshrc.med.sa:5678/api/';


  checkLogin = new BehaviorSubject(false);
  // window = new BehaviorSubject(1);
  token = new BehaviorSubject('');
  // Dwindow:any;

  ourToken:string | undefined;
  header = {'content-type':'application/json','Accept':'application/json','Authorization':`Bearer `};

  // private header = new HttpHeaders({'content-type':'application/json','Accept':'application/json'});


  constructor(private _httpClient:HttpClient) { 

    this.token.subscribe( (x) => {
    
      this.ourToken = x;
      this.header = {'content-type':'application/json','Accept':'application/json','Authorization':`Bearer ${this.ourToken}`};

    } )

    // this.window.subscribe( (x) => {
    
    //   this.Dwindow = x;

    // } )

  }
  
  


  



  // sendStory(data:any):Observable<any>{

  //   let res = this._httpClient.post(this.apiLink+'orders' , FormData , data );

  //   return res;

  // }

  
  getPlans():Observable<any>{


    let res = this._httpClient.get( this.apiLink+'plans' , {headers: this.header});

    // console.log(this.header);
    return res;

  }


    deletePlans(id:any):Observable<any>{


    let res = this._httpClient.delete( this.apiLink+'plans/'+id , {headers: this.header});

    return res;

  }


    addPlans(data:any):Observable<any>{


    let res = this._httpClient.post( this.apiLink+'plans' , data , {headers: this.header});

    return res;

  }


  getGoals(id:any):Observable<any>{


    let res = this._httpClient.get( this.apiLink+'goals/plan/'+id , {headers: this.header});

    return res;

  }

  addGoals( data:any):Observable<any>{


    let res = this._httpClient.post( this.apiLink+'Goals/', data , {headers: this.header});

    return res;

  }
  
  deleteGoals(id:any):Observable<any>{


    let res = this._httpClient.delete( this.apiLink+'Goals/'+id , {headers: this.header});

    return res;

  }

  
  getTasks(id:any):Observable<any>{


    let res = this._httpClient.get( this.apiLink+'tasks/goal/'+id , {headers: this.header});

    return res;

  }


  addTasks( data:any):Observable<any>{


    let res = this._httpClient.post( this.apiLink+'Tasks/', data , {headers: this.header});

    return res;

  }

    
  deleteTasks(id:any):Observable<any>{


    let res = this._httpClient.delete( this.apiLink+'Tasks/'+id , {headers: this.header});

    return res;

  }

    CheckUserNationalId(nationalId:any):Observable<any>{


    let res = this._httpClient.post( this.apiLink+'Accounts/CheckUserNationalId/'+nationalId , {headers: this.header});

    return res;

  }

    login(data:any):Observable<any>{


    let res = this._httpClient.post( this.apiLink+'Accounts/Login', data , {headers: this.header});

    return res;

  }















}
