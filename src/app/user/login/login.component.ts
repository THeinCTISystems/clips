import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showAlert = false;
  alertMsg = 'Please wait! You are being logged in.'
  alertColor = 'blue'

  credentials = { 
    email: '',
    password: ''
  }

  constructor() {}

  ngOnInit(): void {
    
  }

  login() {
    this.showAlert = true
    this.alertMsg = 'Please wait! You are being logged in.'
    this.alertColor = 'blue'
  }
}
