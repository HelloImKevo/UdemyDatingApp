import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

/**
 * Modal dialog used in the Admin Panel to change user roles.
 *
 * Created with command:
 * ```
 * ng g component modals/roles-modal --skip-tests
 * ```
 */
@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent implements OnInit {
  title = '';
  list: any;
  closeBtnName = '';

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
}
