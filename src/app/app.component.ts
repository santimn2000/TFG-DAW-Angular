import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CookieService } from './services/cookie.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCookiesComponent } from './components/dialog-cookies/dialog-cookies.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tiendaTFG';

  constructor(private cookieService: CookieService, public dialog: MatDialog) {}

  ngOnInit(): void {
    initFlowbite();

    const cookiesAceptadas = this.cookieService.getCookie('cookiesAceptadas');
    if (!cookiesAceptadas) {
      this.openCookieDialog();
    }
  }

  openCookieDialog(): void {
    this.dialog.open(DialogCookiesComponent, {
      disableClose: true,
    });
  }
}
