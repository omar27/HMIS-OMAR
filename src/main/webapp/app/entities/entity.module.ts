import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'patient',
        loadChildren: () => import('./patientService/patient/patient.module').then(m => m.PatientServicePatientModule)
      },
      {
        path: 'hospital',
        loadChildren: () => import('./patientService/hospital/hospital.module').then(m => m.PatientServiceHospitalModule)
      },
      {
        path: 'staff',
        loadChildren: () => import('./patientService/staff/staff.module').then(m => m.PatientServiceStaffModule)
      },
      {
        path: 'personal-info',
        loadChildren: () => import('./patientService/personal-info/personal-info.module').then(m => m.PatientServicePersonalInfoModule)
      },
      {
        path: 'department',
        loadChildren: () => import('./patientService/department/department.module').then(m => m.PatientServiceDepartmentModule)
      },
      {
        path: 'working-schedule',
        loadChildren: () =>
          import('./patientService/working-schedule/working-schedule.module').then(m => m.PatientServiceWorkingScheduleModule)
      },
      {
        path: 'appointment-schedule',
        loadChildren: () =>
          import('./patientService/appointment-schedule/appointment-schedule.module').then(m => m.PatientServiceAppointmentScheduleModule)
      },
      {
        path: 'appointment',
        loadChildren: () => import('./patientService/appointment/appointment.module').then(m => m.PatientServiceAppointmentModule)
      },
      {
        path: 'room',
        loadChildren: () => import('./patientService/room/room.module').then(m => m.PatientServiceRoomModule)
      },
      {
        path: 'bill',
        loadChildren: () => import('./patientService/bill/bill.module').then(m => m.PatientServiceBillModule)
      },
      {
        path: 'job-details',
        loadChildren: () => import('./patientService/job-details/job-details.module').then(m => m.PatientServiceJobDetailsModule)
      },
      {
        path: 'in-patient',
        loadChildren: () => import('./patientService/in-patient/in-patient.module').then(m => m.PatientServiceInPatientModule)
      },
      {
        path: 'staff-working-schedule',
        loadChildren: () =>
          import('./patientService/staff-working-schedule/staff-working-schedule.module').then(
            m => m.PatientServiceStaffWorkingScheduleModule
          )
      },
      {
        path: 'stats',
        loadChildren: () => import('./stats/stats.module').then(m => m.HmisgatewayStatsModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class HmisgatewayEntityModule {}
