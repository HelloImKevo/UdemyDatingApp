import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';

/**
 * Created with command:
 * ```
 * ng g module _modules/shared --flat
 * ```
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    NgxGalleryModule,
    NgxSpinnerModule.forRoot({
      type: 'line-scale-party'
    }),
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  exports: [
    BsDropdownModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    TabsModule,
    ToastrModule
  ]
})
export class SharedModule { }
