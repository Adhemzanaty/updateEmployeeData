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

  // 1. المتغير اللي هتخزن فيه الاوبجيكت
  private myData = new BehaviorSubject<any>({});
  
  // 2. ده اللي هتستخدمه في الكومبوننت
  public myData$ = this.myData.asObservable();


  // 3. دالة تخزين الاوبجيكت

  constructor(private _httpClient:HttpClient) { 

    this.token.subscribe( (x) => {
    
      this.ourToken = x;
      this.header = {'content-type':'application/json','Accept':'application/json','Authorization':`Bearer ${this.ourToken}`};

    } )

    // this.window.subscribe( (x) => {
    
    //   this.Dwindow = x;

    // } )

  }
  
  
  setData(obj: any) {
    this.myData.next(obj);
  }

  // 4. دالة جلب الداتا
  getData() {
    return this.myData.getValue();
  }

  



  // sendStory(data:any):Observable<any>{

  //   let res = this._httpClient.post(this.apiLink+'orders' , FormData , data );

  //   return res;

  // }

  
 

  EmpInformationUpdate( data:any):Observable<any>{


    let res = this._httpClient.post( this.apiLink+'EmpInformationUpdate', data , {headers: this.header});

    return res;

  }

    CheckUserNationalId(nationalId:any):Observable<any>{


    let res = this._httpClient.post( this.apiLink+'Accounts/SendCodeToEmp/'+nationalId , {headers: this.header});

    return res;

  }

    login(data:any):Observable<any>{


    let res = this._httpClient.post( this.apiLink+'Accounts/CheckOtp', data , {headers: this.header});

    return res;

  }















}
