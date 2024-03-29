import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase/compat/app';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'fbTimestamp'
})
export class FbTimestampPipe implements PipeTransform {

  constructor (private datePipe: DatePipe) {}

  transform(value: firebase.firestore.FieldValue | undefined) {
    const date = (value as firebase.firestore.Timestamp).toDate()
    
    if (!value) {
      return ''
    }

    return this.datePipe.transform(date, 'mediumDate');
  }

}
