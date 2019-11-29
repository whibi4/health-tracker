import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

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

  patients =[];

  delPatient(id){
    this.http.delete('http://localhost:3000/Patients/'+id).subscribe(res=>{

    },err=>{

    },()=>{
      this.http.get('http://localhost:3000/Patients').subscribe((res:any[])=>{
      console.log(res)
      this.patients = res.reverse()
    },err=>{
      console.log(err)
    })
    })
  }
  addPatient(){
    this.http.post("http://localhost:3000/Patients",this.newPatient).subscribe(res=>{},err=>{
      this.newEntry = {
        txt: "there is a probleme",
        type:"danger"
      }
      this.newPatient = {
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
    },()=>{
      this.newEntry = {
        txt: "patient has been added succufly",
        type:"success"
      }
      this.newPatient = {
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
      this.http.get('http://localhost:3000/Patients').subscribe((res:any[])=>{
      console.log(res)
      this.patients = res.reverse()
    },err=>{
      console.log(err)
    })
    })
  }
  calculAge(year){
    let thisyear = new Date().getFullYear()
    return thisyear-year 
  }
  constructor(private http:HttpClient) { }
  ngOnInit() {
    this.http.get('http://localhost:3000/Patients').subscribe((res:any[])=>{
      console.log(res)
      this.patients = res.reverse()
    },err=>{
      console.log(err)
    })
  }
}
