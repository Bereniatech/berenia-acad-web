import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = true; //control the login and registration page display
  isLoading: boolean = false; //control the loading movement

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient
  ) { }


  private apiEndPoint = environment.registerAPI;
  private apiEndPoint2 = environment.loginAPI;


  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.required]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a valid credential';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  /**toggle the input fromlogin to signup*/
  toggleForm() {
    if (this.isLogin) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }

  /**login method */
  login() {
    this.isLoading = true;
    this.loginInputs();

  }

  /**registration method */
  register() {
    this.isLoading = true;
    this.collectInputs();
  }

  /**this is the control for the registration */
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });
  fifthFormGroup = this._formBuilder.group({
    fifthCtrl: ['', Validators.required],
  });
  sixtFormGroup = this._formBuilder.group({
    sixtCtrl: ['', Validators.required],
  });

  isEditable = true;

  registrationData: any;
  loginData: any;


  collectInputs() {
    this.registrationData = {
      "email": this.fourthFormGroup.controls['fourthCtrl'].value,
      "password": this.fifthFormGroup.controls['fifthCtrl'].value,
      "phone": this.thirdFormGroup.controls['thirdCtrl'].value,
      "first_name": this.firstFormGroup.controls['firstCtrl'].value,
      "last_name": this.secondFormGroup.controls['secondCtrl'].value
    }
    this.processRegistration(this.registrationData);
    console.log(this.registrationData);
  }

  loginInputs() {
    this.loginData = {
      "email":  this.email.value,
      "password": this.password.value,
    }
    this.processLogin(this.loginData);
    console.log(this.loginData);

  }

  /**register method */
  processRegistration(registrationData: any) {
    this.http.post(`${this.apiEndPoint}`, registrationData).subscribe({
      next: data => {
        console.log('data', data);
        this.isLoading = false;
      },
      error: data => {
        console.log('error', data);
        this.isLoading = false;

      }
    });
  }

  /**login method */
  processLogin(inputData: any) {
    this.http.post(`${this.apiEndPoint2}`, inputData).subscribe({
      next: data => {
        console.log('data', data);
        this.isLoading = false;
      },
      error: data => {
        console.log('error', data);
        this.isLoading = false;

      }
    });
  }

  ngOnInit(): void {
  }

}
