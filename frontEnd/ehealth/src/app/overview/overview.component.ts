import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  patients = {};
  diseases = {};
  sexes={};
  ages ={
    '0-2':0,
    '2-6':0,
    '6-12':0,
    '16-18':0,
    '18-24':0,
    '24-30':0,
    '30-40':0,
    '40-50':0,
    '50-60':0,
    '60-70':0,
    '>70':0
  };

  aff = 'A' ;

  gender = [];
  disease = [];
  age =[]
  number: any;
  thisTime = new Date().toLocaleString()


  chartCreator( chartID , type , labels , label , datas){
    let chart = new Chart(chartID, {
      type: type,
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: datas,
          backgroundColor: ['rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)','rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)','rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)','rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)','rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    return chart
  }

  ageInterval(birthYear){
    let thisYear = new Date().getFullYear() ;
    let age = thisYear - birthYear ;
    switch (true) {
      case age < 2:
        this.ages['0-2'] += 1;
        break;
      case age < 6:
        this.ages['2-6'] += 1;
        break;
      case age < 12:
        this.ages['6-12'] += 1;
        break;
        case age<18:
        this.ages['12-18'] += 1 ;
        break;
        case age<24:
        this.ages['18-24'] += 1 ;
        break;
        case age<30:
        this.ages['24-30'] += 1 ;
        break;
        case age<40:
        this.ages['30-40'] += 1 ;
        break;
        case age<50:
        this.ages['40-50'] += 1 ;
        break;
        case age<60:
        this.ages['50-60'] += 1 ;
        break;
        case age<70:
        this.ages['60-70'] += 1 ;
        break;
      default:
          this.ages['>70'] += 1 ;
        break;
    }
  }

  change(type) {
    switch (type) {
      case 'A':
        this.age = this.chartCreator('age', 'line', Object.keys(this.ages), 'age', Object.values(this.ages))
        this.aff = 'A';
        break;
      case 'G':
        this.gender = this.chartCreator('gender', 'bar', Object.keys(this.sexes), 'gender', Object.values(this.sexes))
        this.aff = 'G';
        break;
      case 'D':
        this.disease = this.chartCreator('disease', 'pie', Object.keys(this.diseases), 'disease', Object.values(this.diseases))
        this.aff = 'D';
        break;
      default:
        break;
    }
  }

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http.get('http://localhost:3000/patients').subscribe((res:any[]) => {
        this.number = res.length
        res.forEach(patient => {
          this.ageInterval(parseInt(patient.birthDate.substring(0, 4)));
          if (Object.keys(this.diseases).includes(patient.disease)) {
            this.diseases[patient.disease] += 1;
          } else {
            this.diseases[patient.disease] = 1;
          }
          if (Object.keys(this.sexes).includes(patient.sexe)) {
            this.sexes[patient.sexe] += 1;
          } else {
            this.sexes[patient.sexe] = 1;
          }
        });
      }, err => {
        console.log(err)
      },()=>{
      this.age=this.chartCreator('age','line',Object.keys(this.ages),'age',Object.values(this.ages))
      this.gender = this.chartCreator( 'gender' , 'bar' , Object.keys(this.sexes) , 'gender' , Object.values(this.sexes))
      this.disease = this.chartCreator( 'disease' , 'pie' , Object.keys(this.diseases) , 'disease' , Object.values(this.diseases))
      })
    }


}
