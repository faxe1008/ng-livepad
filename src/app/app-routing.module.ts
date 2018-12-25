import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePanelComponent } from './components/home-panel/home-panel.component';
import { DrawingCanvasComponent } from './components/drawing-canvas/drawing-canvas.component';

const routes: Routes = [
  { path: '', component: HomePanelComponent },
  { path: 'draw', component: DrawingCanvasComponent },
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
