import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Employe} from '../maps/maps.component';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface Conge {
  id: string;
  employe: Employe;
  nombredejours: number;
  adresse: string;
  codepostal: string;
  telephone: string;
  typedoc: string;
  remplacant: string;
  datedep: string;
  dateretour: string;
  datedemande: string;
  etat: string;
  type: string;
  cause: string;
}


@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'nbreJours',  'etat'];
  displayConge: Conge;
  dataSource: MatTableDataSource<Conge>;
  @ViewChild(MatPaginator, ) paginator: MatPaginator;
  @ViewChild(MatSort, ) sort: MatSort;

  constructor(private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource(DAT_EXAMPLE);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  select(row : Conge){
    this.displayConge = row;
  }
  openSnackBar(){
    this._snackBar.open(' La décision: ' +this.displayConge.etat  , 'OK', {
      duration: 5000,
    });
  }
}

const DAT_EXAMPLE : Conge [] = [
  {
    id:'1',
    nombredejours: 20,
    cause:'Maladie',
    codepostal:'3009767',
    datedep: '29/09/2019',
    telephone:'693294382',
    datedemande:'28/09/2019',
    etat:'En attente',
    dateretour: '29/10/2019',
    remplacant:'',
    type:'',
    typedoc:'',
    adresse: '',
    employe:{
      id: 1,
      nom: 'Ngansop',
      prenom: 'Regis',
      solde: 0,
      lieu: 'Douala',
      echelon:'',
      grade:'',
      fonction: 'Web developper',
      datenaissance:'',
      cni:4546576767,
      adresse:'',
    soldecompensation:0,
    soldeexception:0,
    soldemaladie:0}
  },
  {
    id:'2',
    nombredejours: 20,
    cause:'Assistance malade',
    codepostal:'3009767',
    datedep: '29/09/2019',
    telephone:'693294382',
    datedemande:'28/09/2019',
    etat:'Acceptée',
    dateretour: '29/10/2019',
    remplacant:'',
    type:'test',
    typedoc:'',
    adresse: '',
    employe:{
      id: 1,
      nom: 'Fankou ',
      prenom: 'Pamela',
      solde: 0,
      lieu: 'Douala',
      echelon:'',
      grade:'',
      fonction: 'Web Designer',
      datenaissance:'',
      cni:4546576767,
      adresse:'',soldecompensation: 0,
    soldeexception:0,
    soldemaladie:0}
  },
]
