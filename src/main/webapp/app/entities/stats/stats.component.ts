import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpResponse } from '@angular/common/http';
import { IStaff } from 'app/shared/model/patientService/staff.model';
import { StaffService } from '../patientService/staff/staff.service';
import { AppointmentScheduleService } from '../patientService/appointment-schedule/appointment-schedule.service';
import { Appointment, IAppointment } from 'app/shared/model/patientService/appointment.model';
import { AppointmentService } from '../patientService/appointment/appointment.service';
import { BillService } from '../patientService/bill/bill.service';
import { IAppointmentSchedule } from 'app/shared/model/patientService/appointment-schedule.model';
import { IBill } from 'app/shared/model/patientService/bill.model';
import { StaffType } from 'app/shared/model/enumerations/staff-type.model';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { runInThisContext } from 'vm';
import { DepartmentService } from '../patientService/department/department.service';
import { PatientService } from '../patientService/patient/patient.service';
import { InPatient } from 'app/shared/model/patientService/in-patient.model';
import { IDepartment } from 'app/shared/model/patientService/department.model';
import { IPatient } from 'app/shared/model/patientService/patient.model';
import { booleanLiteral } from '@babel/types';

@Component({
  selector: 'jhi-stats',
  templateUrl: './stats.component.html'
})
export class StatsComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  barChartValues = [];
  public barChartData: ChartDataSets[] = [
    { data: this.barChartValues, label: "Docotrs' Earning" }
  ];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx: any) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  staff: IStaff[];
  appointmentSchedule: IAppointmentSchedule[];
  appointment: IAppointment[];
  bill: IBill[];
  department: IDepartment[];
  patient: IPatient[];
  constructor(private staffService: StaffService,
    private appointmentScheduleService: AppointmentScheduleService,
    private appointmentService: AppointmentService,
    private billService: BillService,
    private departmentService: DepartmentService,
    private patientService: PatientService) { }

  ngOnInit() {
    this.staffService
      .query({
        page: 0,
        size: 1000
      })
      .subscribe((res: HttpResponse<IStaff[]>) => this.saveStaff(res));
  }
  saveStaff(staff) {
    this.staff = staff.body;
    this.appointmentScheduleService
      .query({
        page: 0,
        size: 1000
      })
      .subscribe((res: HttpResponse<IAppointmentSchedule[]>) => this.saveAppointmentSchedule(res));
  }
  saveAppointmentSchedule(appointmentSchedule) {
    this.appointmentSchedule = appointmentSchedule.body;
    this.appointmentService
      .query({
        page: 0,
        size: 1000
      })
      .subscribe((res: HttpResponse<IAppointment[]>) => this.saveAppointment(res));

  }
  saveAppointment(appointment) {
    this.appointment = appointment.body;
    this.billService
      .query({
        page: 0,
        size: 1000
      })
      .subscribe((res: HttpResponse<IBill[]>) => this.saveBill(res));
  }
  saveBill(bill) {
    this.bill = bill.body;
    this.departmentService
    .query({
      page: 0,
      size: 1000
    })
    .subscribe((res: HttpResponse<IDepartment[]>) => this.saveDepartment(res));
    this.prepareData();
  }
  saveDepartment(department){
    this.department = department.body;
    this.patientService
    .query({
      page: 0,
      size: 1000
    })
    .subscribe((res: HttpResponse<IPatient[]>) => this.savePatient(res));
  }
  savePatient(patient){
    this.patient = patient.body;
    for (let i = 0; i < this.appointmentSchedule.length; i++) {
      for (let j = 0; j < this.patient.length; j++) {
        if (this.appointmentSchedule[i].staffId === this.patient[j].id) {
          for (let k = 0; k < this.appointment.length; k++) {
            if (this.appointment[k].appointmentScheduleId === this.appointmentSchedule[i].id) {
              for (let l = 0; l < this.bill.length; l++) {
                if (this.bill[l].id === this.appointment[k].billId) {
                  this.pieChartData.push(this.bill[l].totalBill - this.bill[l].doctorFee);  
                }
              }
              let exists = false;
              for(let m = 0; m < this.pieChartLabels.length; m++){
                if(this.pieChartLabels[m] === this.patient[j].departmentName){
                  exists = true;
                  break;
                }
              }
              if(!exists){
                this.pieChartLabels.push(this.patient[j].departmentName);
              }
            }
          }
        }
      }
    }
  }

  prepareData() {
    let doctors: IStaff[] = [];
    for (let i = 0; i < this.staff.length; i++) {
      if (this.staff[i].staffType === StaffType.DOCTOR) {
        doctors.push(this.staff[i]);
      }
    }
    // we can improve this by creating a service to return correct data from server side
    for (let i = 0; i < this.appointmentSchedule.length; i++) {
      for (let j = 0; j < doctors.length; j++) {
        if (this.appointmentSchedule[i].staffId === doctors[j].id) {
          for (let k = 0; k < this.appointment.length; k++) {
            if (this.appointment[k].appointmentScheduleId === this.appointmentSchedule[i].id) {
              for (let l = 0; l < this.bill.length; l++) {
                if (this.bill[l].id === this.appointment[k].billId) {
                  this.barChartLabels.push(doctors[j].id + "");
                  this.barChartValues.push(this.bill[l].doctorFee);
                }
              }
            }
          }
        }
      }
    }
  }
}
