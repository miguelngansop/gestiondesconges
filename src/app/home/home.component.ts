import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeService} from '../services/employe.service';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  demandeForm: FormGroup;
  displayedColumns: string[] = ['id', 'dateDep', 'dateRetour', 'caus' ,'etat'];
  dataSource: any;
  employe: any;
  constructor(private _formBuilder: FormBuilder, private employeService: EmployeService) { }

  ngOnInit() {
    this.demandeForm = this._formBuilder.group({
      dateDep: ['', Validators.required],
      dateRetour: ['', Validators.required],
      type: ['', Validators],
      caus: ['', Validators.required],
      typeDoc: ['', Validators],
      remplacant: ['', Validators],
      adresse: ['', Validators],
      telephone: ['', Validators],
      codePostal: ['', Validators],

    })
   this.employeService.getOne('13').subscribe((l: any) => {
     this.employe = l ;
     this.dataSource = new MatTableDataSource(l.conges);

   }, err => {console.log('erreur: ', err)})
      }

  soumettre() {
    console.log(this.demandeForm.value)
    this.employeService.demanderConge('13', this.demandeForm.value).subscribe((e: any) =>{
      console.log('success', e)
      this.reload();
      Swal.fire(
          'Envoyée!',
          'La demande à été soumise avec succès.',
          'success'
      )
      this.demandeForm.reset();
    }, err => {
      console.log('erreur:', err);
      Swal.fire(
          'Echec!',
          'Une erreur s\'est produite',
          'success'
      )
    })
  }

  reload(){
    this.employeService.getOne('13').subscribe((l: any) => {
      this.employe = l ;
      this.dataSource = new MatTableDataSource(l.conges);

    }, err => {console.log('erreur: ', err)})
  }

}
