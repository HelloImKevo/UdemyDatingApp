import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

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
  canDeactivate(
    component: MemberEditComponent
  ): boolean {
    if (component.editForm?.dirty) {
      return confirm("Are you sure you want to continue? Any unsaved changes will be lost." +
        "\n(Click the 'Save Changes' button save the changes to your profile.)");
    }

    return true;
  }
}
