import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';
import {EmployeService} from '../services/employe.service';

export interface Employe {
  id: number;
  nom: string;
  prenom: string;
  datenaissance: string;
  lieu: string;
  cni: number;
  adresse: string;
  fonction: string;
  grade: string;
  echelon: string;
  solde: number;
  soldecompensation: number;
  soldemaladie: number;
  soldeexception: number;

}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {

  employerForm: FormGroup;
  actionType: string = 'Ajouter';
  currentid: string;

  constructor(public _formBuilder: FormBuilder, public employeService: EmployeService) { }

  ngOnInit() {
    this.actionType = 'Ajouter';
    this.employerForm = this._formBuilder.group({
      id: ['', Validators],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cni: ['', Validators.required],
      adresse: ['', Validators],
      datenaissance: ['', Validators],
      lieu: ['', Validators],
      fonction: ['', Validators.required],
      grade: ['', Validators],
      echelon: ['', Validators],
      solde: ['0', Validators.required],
      soldecompensation: ['0', Validators],
      soldemaladie: ['0', Validators],
      soldeexception: ['0', Validators],

        }
    )
  this.reloadAllEmploye();
  }

  displayedColumns: string[] = ['position', 'nom', 'prenom', 'cni', 'modifier', 'supprimer'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  save() {
    console.log(this.employerForm.value);
    if (this.actionType.includes('Ajouter')) {
      this.employerForm.patchValue({id: ELEMENT_DATA.length + 1})
      this.employeService.signUp(this.employerForm.value.cni, '1234', this.employerForm.value)
          .then((e: any) => {
           // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
            this.reloadAllEmploye();

            Swal.fire(
                'Ajouté!',
                'Employé ajouté avec succès',
                'success'
            );
            this.reloadAllEmploye();

          }).catch((e: any) => {
        Swal.fire(
            'Echec!',
            e.error.message,
            'error'
        )
      })
    } else {

      this.employeService.update(this.currentid, this.employerForm.value).subscribe((e :any)=>{
        Swal.fire(
            'Modifié',
            'modifié avec succès!',
            'success'
        )
        this.reloadAllEmploye();
      }, err => {
        console.log('erreur :', err)
        Swal.fire(
            'Echec',
            'modification a échouée!',
            'error'
        )
      })
    }
  }

  update(employe: any) {
    this.actionType = 'Enregistrer les modifications';
    this.currentid = employe.id;
    console.log(employe)
    this.employerForm.patchValue({nom: employe.nom,
    prenom: employe.prenom,
    cni: employe.cni,
      adresse: employe.adresse,
      datenaissance: employe.datenaissance,
      lieu: employe.lieu,
      fonction: employe.fonction,
      grade: employe.grade,
      solde: employe.sold.soldeAnnuelle,
      echelon: employe.echelon,
      soldecompensation: employe.sold.soldeCompensation,
      soldemaladie: employe.sold.soldeMaladie,
      soldeexception: employe.sold.soldeException
    })
  }

  delete(idEmploye: any) {
    console.log(idEmploye)

    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.value) {
        new Promise( (resolve, reject) =>{
         this.currentid = idEmploye;
         this.employeService.delete(this.currentid).subscribe(() => {
           resolve(ELEMENT_DATA);
         }, err => reject(err))
        }).then((e: Employe[]) => {
          ELEMENT_DATA = ELEMENT_DATA.filter((e: Employe) => {
            return e.id != idEmploye
          })
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);

          Swal.fire(
              'Supprimé!',
              'Cet employé a été supprimé',
              'success'
          )
        }).catch((err) => {
          Swal.fire(
              'Echec!',
              err.error.message,
              'error'
          );
        })
      }
    })



  }

  reloadAllEmploye() {
    this.employeService.readAll().subscribe((l: Array<any>) => {
      ELEMENT_DATA = l;
      this.dataSource = new MatTableDataSource(l);
    })

  }
}
var ELEMENT_DATA: Employe[] = [];
