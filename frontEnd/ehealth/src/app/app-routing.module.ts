import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PatientsComponent } from './patients/patients.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { OverviewComponent } from './overview/overview.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  { path: '' , component:HomeComponent },
  { path: 'admin' , component: AdminComponent , 
    children:[
      { path: '',   redirectTo: 'overview', pathMatch: 'full' },
      {path:'patients/:id' , component:PatientComponent},
      {path:'patients' , component:PatientsComponent},
      {path:'notifications', component:NotificationsComponent},
      {path:'overview' , component:OverviewComponent}
  ]},
  { path:'**' , component:NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
