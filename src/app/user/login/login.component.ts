import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showAlert = false;
  alertMsg = 'Please wait! You are being logged in.'
  alertColor = 'blue'

  inSubmission = false

  credentials = { 
    email: '',
    password: ''
  }

  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {
    
  }

  async login() {
    this.showAlert = true
    this.alertMsg = 'Please wait! You are being logged in.'
    this.alertColor = 'blue'
    this.inSubmission = true

    try {
    await this.auth.signInWithEmailAndPassword(
      this.credentials.email, this.credentials.password
    )
  } catch(e) {
    this.inSubmission = false
    this.showAlert = true
    this.alertMsg = 'An unexpected error occured. Please try again later.'
    this.alertColor = 'red'

    console.log(e)

    return
  }

  this.alertMsg = 'Success! You are now logged in.'
  this.alertColor = 'green'

  }
}
