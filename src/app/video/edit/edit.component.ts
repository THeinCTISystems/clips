import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import IClip from 'src/app/models/clip.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null

  showAlert = false
  alertMsg = 'Please wait! Updating clip.'
  alertColor = 'blue'
  inSubmission = false
  @Output() update = new EventEmitter()

  clipID: FormControl = new FormControl('', {
    nonNullable: true
  })
  title = new FormControl('', { 
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  })

  editForm = new FormGroup({
    title: this.title,
    id: this.clipID 
  })

  constructor(
    private modal: ModalService, 
    private clipService: ClipService
  ) {}

  ngOnInit(): void {
    this.modal.register('editClip')
  }

  ngOnDestroy(): void {
    this.modal.unregister('editClip')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.activeClip) {
      return
    }

    this.showAlert = false
    this.inSubmission = false

    this.clipID.setValue(this.activeClip.docID)
    this.title.setValue(this.activeClip.title)
  }

  async submit() {
    if (!this.activeClip) {
      return
    }
    
    this.editForm.disable()
    this.showAlert = true
    this.alertMsg = 'Please wait! Updating clip.'
    this.alertColor = 'blue'
    this.inSubmission = true

    try {
      await this.clipService.updateClip(
        this.clipID.value, this.title.value
      )
    }
    catch (e) {
      this.inSubmission = false
      this.alertColor = 'red'
      this.alertMsg = 'Something went wrong. Try agin later.'
      return
    }

    this.activeClip.title = this.title.value
    this.update.emit(this.activeClip)

    this.editForm.enable()
    this.showAlert = true
    this.alertMsg = 'Success!'
    this.alertColor = 'green'
    this.inSubmission = false
  }

}
