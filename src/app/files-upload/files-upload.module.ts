import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesUploadComponent } from './files-upload.component';
import { Routes, RouterModule } from '@angular/router';
import { DragDropDirective } from './drag-drop.directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: FilesUploadComponent
  }
];

@NgModule({
  declarations: [FilesUploadComponent, DragDropDirective],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    FormsModule
  ]
})
export class FilesUploadModule { }
