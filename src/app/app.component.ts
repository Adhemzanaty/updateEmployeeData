import { Component, OnInit} from '@angular/core';
import { APIService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'firstApp';






  constructor(private _APIService: APIService) {}



  ngOnInit(): void {
    const loader = document.getElementById('app-loading');

   




    setTimeout(() => {
      if (loader) loader.remove()
       console.log('اشتغلت بعد 4 ثواني');
    }, 2000);
  }


  }



 

