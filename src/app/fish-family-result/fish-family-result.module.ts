import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {SharedModule} from "../../shared/shared.module";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {ButtonModule, ChipModule} from "@progress/kendo-angular-buttons";
import {InputsModule} from "@progress/kendo-angular-inputs";
import {PopupModule} from "@progress/kendo-angular-popup";
import {LayoutModule} from "@progress/kendo-angular-layout";
import {FishFamilyResultComponent} from "./fish-family-result.component";


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: FishFamilyResultComponent,
        pathMatch: 'full',
      },

    ]),
    SharedModule,
    NgIf,
    NgForOf,
    NgStyle,
    ButtonModule,
    InputsModule,
    ChipModule,
    PopupModule,
    LayoutModule,
  ],
  declarations: [
    FishFamilyResultComponent
  ],
  providers: [
    FishFamilyResultComponent
  ]
})
export class FishFamilyResultModule { }
