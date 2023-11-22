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
  username = '';
  availableRoles: any[] = [];
  selectedRoles: any[] = [];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  updateChecked(checkedValue: string) {
    const index = this.selectedRoles.indexOf(checkedValue);
    index !== -1
      // Remove an item at this index.
      ? this.selectedRoles.splice(index, 1)
      // Add the new value to the array.
      : this.selectedRoles.push(checkedValue);
  }
}
