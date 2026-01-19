import { Inject, Injectable } from '@angular/core';
import { HttpClientModule , HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { subscribe } from 'diagnostics_channel';



@Injectable({
  providedIn: 'root'
})
export class APIService {





  private countryNameSubject = new BehaviorSubject<any | null>(null);
  countryName= this.countryNameSubject.asObservable();

  setCountryName(code: any) 
    {this.countryNameSubject.next(code);}
  

  getCountryName(): any | null 
    {return this.countryNameSubject.getValue();}





  private countryCodeSubject = new BehaviorSubject<string | null>(null);
  countryCode= this.countryCodeSubject.asObservable();

  setCountryCode(code: string) 
    {this.countryCodeSubject.next(code);}
  

  getCountryCode(): string | null 
    {return this.countryCodeSubject.getValue();}


    private countryCurrencySubject = new BehaviorSubject<string | null>(null);
    countryCurrency= this.countryCurrencySubject.asObservable();
  
    setCountryCurrency(currency: string) 
      {this.countryCurrencySubject.next(currency);}
    
  
    getCountryCurrency(): string | null 
      {return this.countryCurrencySubject.getValue();}


      

  
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





  apiLink = 'https://magic-eg.net/public/api/';


  checkLogin = new BehaviorSubject(false);
  // window = new BehaviorSubject(1);
  // token = new BehaviorSubject('');
  // Dwindow:any;

  // ourToken:string | undefined;
  // header = {'content-type':'application/json','Accept':'application/json','Authorization':`Bearer `};

  constructor(private _httpClient:HttpClient) { 

    // this.token.subscribe( (x) => {
    
    //   this.ourToken = x;
    //   this.header = {'content-type':'application/json','Accept':'application/json','Authorization':`Bearer ${this.ourToken}`};

    // } )

    // this.window.subscribe( (x) => {
    
    //   this.Dwindow = x;

    // } )

  }


  sendStory(data: any, imageFile: File): Observable<any> {
    const formData = new FormData();
  
    // إضافة البيانات العادية
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
  
    // إضافة الصورة
    formData.append('child_image', imageFile); // 'image' هو اسم الباراميتر المطلوب في الـ backend
  
    return this._httpClient.post(this.apiLink + 'orders', formData);
  }
  
  


  



  // sendStory(data:any):Observable<any>{

  //   let res = this._httpClient.post(this.apiLink+'orders' , FormData , data );

  //   return res;

  // }

  
  getCountries():Observable<any>{


    let res = this._httpClient.get( this.apiLink+'countries');

    return res;

  }

  getCoupons(coupon:any):Observable<any>{


    let res = this._httpClient.get( this.apiLink+'coupons/' + coupon);

    return res;

  }

}
