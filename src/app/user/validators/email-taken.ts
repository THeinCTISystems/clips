import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class EmailTaken implements AsyncValidator {
    constructor(private auth: AngularFireAuth, private authService: AuthService) { }

/*     validate = (control: AbstractControl): Promise<ValidationErrors | null>  => {
        return this.auth.fetchSignInMethodsForEmail(control.value).then(
            response => response.length ? { emailTaken : true } : null
        )
    } */

    validate = (control: AbstractControl): Promise<ValidationErrors | null>  => {
        return this.authService.emailAlreadyExists(control.value).then(
            response => response ? { emailTaken : true } : null
        );
      }
}
