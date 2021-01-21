import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'instaClone';


  ngOnInit(): void {

    const firebaseConfig = {
      apiKey: "AIzaSyAv41u6F2R48UakAk1bpBP5XPJpP7Df50A",
      authDomain: "instaclone-4e123.firebaseapp.com",
      databaseURL: "https://instaclone-4e123-default-rtdb.firebaseio.com",
      projectId: "instaclone-4e123",
      storageBucket: "instaclone-4e123.appspot.com",
      messagingSenderId: "530378051580",
      appId: "1:530378051580:web:a412be8b6a7be77c40ac79",
      measurementId: "G-25Y4PP12DL"
    };

    firebase.initializeApp(firebaseConfig)

  }

}
