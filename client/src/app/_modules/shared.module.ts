import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import { PaginationModule } from 'ngx-bootstrap/pagination';

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
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    FileUploadModule,
    NgxGalleryModule,
    NgxSpinnerModule.forRoot({
      type: 'line-scale-party'
    }),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  exports: [
    BsDatepickerModule,
    BsDropdownModule,
    FileUploadModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    PaginationModule,
    TabsModule,
    ToastrModule
  ]
})
export class SharedModule { }
