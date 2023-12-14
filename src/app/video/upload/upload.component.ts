import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage} from '@angular/fire/compat/storage';
import { v4 as uuid} from 'uuid';
import { last } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit{
  isDragOver = false
  file: File | null = null
  nextStep = false

  showAlert = false
  alertMsg = 'Please wait! Your clip is being uploaded.'
  alertColor = 'blue'
  inSubmission = false
  percentage = 0;
  showPercentage = false;
  
  title = new FormControl('', { 
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  })

  uploadForm = new FormGroup({
    title: this.title 
  })

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
    
  }

  storeFile($event: Event){
    this.isDragOver = false

    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null

    if (!this.file || this.file.type !== 'video/mp4') {
      return
    }

    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/,'')
    )
    this.nextStep = true
  }

  uploadFile() {
    this.showAlert = true
    this.alertMsg = 'Please wait! Your clip is being uploaded.'
    this.alertColor = 'blue'
    this.inSubmission = true
    this.showPercentage = true

    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`

    const task = this.storage.upload(clipPath, this.file)

    task.percentageChanges().subscribe(progress => {
      this.percentage = progress as number / 100
    })

    task.snapshotChanges().pipe(
      last()
    ).subscribe({
      next: (snapshot) => {
        this.alertMsg = 'Success! Your clip is now ready to share with the world.'
        this.alertColor = 'green'
        this.showPercentage = false
      },
      error: (error)  => {
        this.alertMsg = 'Upload failed! Please try again later.'
        this.alertColor = 'red'
        this.showPercentage = false
        this.inSubmission = true
        console.error(error)
      }
    })
  }

}
