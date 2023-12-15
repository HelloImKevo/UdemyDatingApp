import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { ConfirmService } from '../_services/confirm.service';

/**
 * Created with command:
 * ```
 * ng g guard _guards/prevent-unsaved-changes --skip-tests
 * -> CanDeactivate
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {

  constructor(private confirmService: ConfirmService) { }

  canDeactivate(component: MemberEditComponent) {
    if (component.editForm?.dirty) {
      return this.confirmService.confirm(
        'You have unsaved changes',
        "Are you sure you want to continue? Any unsaved changes will be lost." +
        "\n(Click the 'Save Changes' button underneath your profile picture to" +
        " save the changes to your profile.)",
        'Discard Changes',
        'Cancel'
      );
    }

    return true;
  }
}
