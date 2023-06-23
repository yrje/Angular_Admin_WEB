import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {FilterMenuModule, GridModule} from "@progress/kendo-angular-grid";
import {PatientInfoComponent} from "./patient-info.component";
import {SharedModule} from "../../shared/shared.module";
import {ButtonModule, ChipModule} from "@progress/kendo-angular-buttons";
import {InputsModule} from "@progress/kendo-angular-inputs";
import {PopupModule} from "@progress/kendo-angular-popup";
import {LayoutModule} from "@progress/kendo-angular-layout";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'patient-info',
        component: PatientInfoComponent
      }
    ]),
    NgForOf,
    GridModule,
    NgIf,
    NgForOf,
    NgStyle,
    ButtonModule,
    InputsModule,
    ChipModule,
    PopupModule,
    LayoutModule,
    ReactiveFormsModule,
    FilterMenuModule,
  ],
  declarations: [PatientInfoComponent],
  exports: [
    PatientInfoComponent
  ]
})
export class PatientInfoModule { }
