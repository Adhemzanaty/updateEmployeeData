import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isCodeSent:boolean = false;
  loginText:any;
  checkLoginVar:any;
  loginForm = new FormGroup({
    nationalId: new FormControl('' , [Validators.required, Validators.pattern('^[0-9]*') , Validators.minLength(4), Validators.maxLength(10)]),
    OTP: new FormControl('' , [Validators.required, Validators.pattern('^[0-9]*') , Validators.minLength(4), Validators.maxLength(4)]),

  })

   active:boolean = false;

        constructor(public _APIService: APIService , private _ActivatedRoute:ActivatedRoute , private _Router:Router) {


          this.isCodeSent = false;

  this.checkLoginVar = _APIService.checkLogin;


  }


  checkLogin(x:any){

    if(x.value.nationalId.length > 4 && x.value.OTP.length == 0){

      // alert('round 1');
      this._APIService.show();

        this._APIService.CheckUserNationalId(x.value.nationalId).subscribe( (x) => {


            // console.log(x);
              this.isCodeSent = x.isCodeSent;
              this.loginText = x.message;
              this._APIService.hide();
            });
      
    }else if(x.value.nationalId.length > 4 && x.value.OTP.length == 4){

            // alert('round 2');

            this._APIService.show();

      const data = {
                      "nationalId": x.value.nationalId,
                      "otp": x.value.OTP
                    };
        this._APIService.login(data).subscribe( (x) => {


            // console.log(x);
            if(x.success){

              // alert('success');
              this._APIService.setData(x);
              this._APIService.setData2(data.nationalId);
              this._APIService.token.next(x.token);
              this._Router.navigate(['/home']);
              this._APIService.checkLogin.next(true);

              this.loginForm.reset();

            }else{

              alert('الرمز المؤقت غير صحيح');

            }


              this._APIService.hide();


            });
      
    }else if(x.value.nationalId.length > 4 && x.value.OTP.length != 4){
            alert('يجب ان يتكون الرمز المؤقت من 4 ارقام');

    }else{
                  alert('round 4');

    }

    
  }

  sighnUp(){
    this.active = true;

  }

  sighnIn(){
    this.active = false;


  }
 
}
