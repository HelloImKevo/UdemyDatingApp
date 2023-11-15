import { Component, OnInit } from '@angular/core';

/**
 * UI component for an Administrator Panel that exposes
 * admin functionality.
 *
 * Created with command:
 * ```
 * ng g component admin/admin-panel --skip-tests
 * ```
 */
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
