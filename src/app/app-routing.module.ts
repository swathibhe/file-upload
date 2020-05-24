import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'file', pathMatch: 'full' },
  {
    path: 'file',
    loadChildren: () => import('./files-upload/files-upload.module').then(m => m.FilesUploadModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
