import { Component, OnInit } from '@angular/core';

/**
 * UI component to enable moderators to review and clean up photos.
 *
 * Created with command:
 * ```
 * ng g component admin/photo-management --skip-tests
 * ```
 */
@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
