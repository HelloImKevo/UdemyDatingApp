import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';

/**
 * Created with command:
 * ```
 * ng g component members/photo-editor --skip-tests
 * ```
 * 
 * UI component that allows a User to upload their Photos.
 */
@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
