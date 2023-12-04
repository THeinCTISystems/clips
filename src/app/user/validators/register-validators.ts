
import { ValidationErrors, AbstractControl, ValidatorFn } from "@angular/forms";

export class RegisterValidators {
    static match(controlName: string, matichngControlName: string ) : ValidatorFn {
        return (group: AbstractControl) : ValidationErrors | null => {
            const control = group.get(controlName)
            const matichngControl = group.get(matichngControlName)
        
            if (!control || !matichngControl) {
                console.error('Form controls can not be found in the form group.')
                return { controlNotFound: false }
            }

            const error = control.value === matichngControl.value ?
                null :
                { noMatch: true }
            
            matichngControl.setErrors(error)

            return error    
        }
    }
}

