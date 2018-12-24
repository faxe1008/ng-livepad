import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePanel } from './components/home-panel/home-panel.component';
import { DrawingCanvas } from './components/drawing-canvas/drawing-canvas.component';

const routes: Routes = [
  { path: '', component: HomePanel },
  { path: 'draw', component: DrawingCanvas },
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
