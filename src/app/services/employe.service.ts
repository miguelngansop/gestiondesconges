import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employe} from '../maps/maps.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  host = 'http://127.0.0.1:8080/';
  constructor(private http: HttpClient) { }
  signUp(username: string, password: string, employe: Employe) {
    return  new Promise((resolve, reject) => {
      this.http.post(this.host + 'users/signup',     {
        'username': username,
        'password': password,
        'repassword': password,
        'role': 'Employe'
      } ).subscribe((e: any) => {
        // create personne with this username
        console.log('user ok :', e);
        resolve(e)
        this.http.post(this.host + 'personnes/add', {
          'username': username,
          'nom': employe.nom,
          'prenom': employe.prenom,
          'fonction': employe.fonction,
          'cni': employe.cni,
          'adresse': employe.adresse,
          'lieu': employe.lieu,
          'dateDeNaissance': employe.datenaissance,
          'grade': employe.grade,
          'echelon': employe.echelon,
          'dateTita': new Date().toLocaleDateString(),
          'dateRecrut': new Date().toLocaleDateString(),
          'photo': ''
        }).subscribe((emp: any) => {
          console.log(emp, 'sucess');
          this.ajouterSolde(emp.id, employe.solde, employe.soldecompensation, employe.soldemaladie, employe.soldeexception).subscribe((s: any) => {
            resolve(emp)
          }, err => reject(err))
        }, err => {
          console.log('erreur lors de la creation de l\'employe', err);
          reject(err)
        })
      }, err => {
        console.log('impossible de creer le compte user :', err)
        reject(err)
      })
    })
  }

  update(id: string, employe: Employe) {
    console.log('id :', id)
    return this.http.patch(this.host + 'personnes/update/' + id,
        {
          'nom': employe.nom,
          'prenom': employe.prenom,
          'fonction': employe.fonction,
          'cni': employe.cni,
          'adresse': employe.adresse,
          'lieu': employe.lieu,
          'dateDeNaissance': employe.datenaissance,
          'grade': employe.grade,
          'echelon': employe.echelon
        }
        )
  }
  readAll() {
    return this.http.get(this.host + 'personnes/all');
  }

  delete(id: string) {
    return this.http.delete(this.host + 'personnes/delete/' + id);
  }

  ajouterSolde(idEmploye: string, soldeAnnuelle, soldeCompensation, soldeMaladie, soldeException  ) {
    return this.http.post(this.host + 'personnes/add/solde/' + idEmploye, {
      'soldeAnnuelle': soldeAnnuelle,
      'soldeCompensation': soldeCompensation,
      'soldeMaladie': soldeMaladie,
      'soldeException': soldeException
    })
  }
  demanderConge(idEmploye: string, conge: any) {
    return this.http.post(this.host + 'conges/add/' + idEmploye, {
      'type': conge.type,
      'caus': conge.caus,
      'nombreJour': conge.nombreJour,
      'dateDep': conge.dateDep,
      'dateRetour': conge.dateRetour,
      'adresse': conge.adresse,
      'telephone': conge.telephone,
      'codePostal': conge.codePostal,
      'typeDoc': conge.typeDoc,
      'remplacant': conge.remplacant
    } )
  }

  getOne(idEmploye: string){
    return this.http.get(this.host + 'personnes/' + idEmploye);
  }
}
