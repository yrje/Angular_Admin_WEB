import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgForOf} from "@angular/common";
import {GridModule} from "@progress/kendo-angular-grid";
import {PatientInfoComponent} from "./patient-info.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'patient-info',
        component: PatientInfoComponent
      }
    ]),
    NgForOf,
    GridModule
  ],
  declarations: [PatientInfoComponent],
  exports: [
    PatientInfoComponent
  ]
})
export class PatientInfoModule { }
