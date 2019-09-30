import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
   { path: '/dashboard', title: 'Toutes les demandes',  icon: 'pe-7s-user', class: '' },
    { path: '/typography', title: 'Traiter les demandes',  icon:'pe-7s-hammer', class: '' },

    /*{ path: '/user', title: 'Mes etats',  icon:'pe-7s-user', class: '' },*/
    { path: '/maps', title: 'Gerer les employés',  icon:'pe-7s-users', class: '' },

/*
    { path: '/notifications', title: 'Gerer les comptes',  icon:'pe-7s-config', class: '' },
*/
/*
    { path: '/table', title: 'Table List',  icon:'pe-7s-note2', class: '' },
*/
/*
    { path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
