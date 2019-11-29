import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client'

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  private socket: any;
  private update = {
    patientId : 'Not Connected',
    accel: {
        accelX: 0,
        accelY: 0,
        accelZ: 0
    },
    temp: 'Not Connected',
    gyro: {
        gyroX: 0,
        gyroY: 0,
        gyroZ: 0
    },
    ecg:'Not Connected' ,
    rsltAi : 'Not Connected' 

  }


  id 
  newPatient = {
    name: "",
    lastName: "",
    birthDate: "2000-01-01",
    sexe: "",
    disease: "",
    weight: 0,
    height: 0,
    tel: "",
    address: "",
    photo: "",
  }
  newEntry = {
    txt: "Please Make sure to Fill all the fields",
    type:"info"
  }


  updatePatient(){
    let data = [
      { name: this.newPatient.name },
      { lastName: this.newPatient.lastName },
      { birthDate: this.newPatient.birthDate },
      { sexe: this.newPatient.sexe },
      { disease: this.newPatient.disease },
      { weight: this.newPatient.weight },
      { height: this.newPatient.height },
      { tel: this.newPatient.tel },
      { address: this.newPatient.address },
      { photo: this.newPatient.photo }
    ]
    this.http.patch("http://localhost:3000/patients/"+this.id,data).subscribe(res=>{},err=>{},()=>{
      this.http.get("http://localhost:3000/patients/"+this.id).subscribe((res:any)=>{
        this.newPatient = res 
      },err=>{},()=>{ })
    })
  }
  calculAge(year){
    let thisyear = new Date().getFullYear()
    return thisyear-year 
  }
  constructor(private route: ActivatedRoute , private http:HttpClient) { }

  ngOnInit() {
    this.socket = io("http://localhost:4000")
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.http.get("http://localhost:3000/patients/"+params['id']).subscribe((res:any)=>{
        this.newPatient = res 
      },err=>{},()=>{ })
    });
  }

  public ngAfterViewInit(){
    this.socket.on('track',data=>{
      console.log(data)
      if (this.id=='5ce25c23858e3c060007b008') {
        this.update = data ;
      }
    })
  }

}
