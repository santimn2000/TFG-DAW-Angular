import { Component } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-dialog-cookies',
  templateUrl: './dialog-cookies.component.html',
  styleUrls: ['./dialog-cookies.component.css']
})
export class DialogCookiesComponent {

  constructor(private cookieService: CookieService) {}

  acceptCookies() {
    this.cookieService.setCookie('cookiesAceptadas', 'true', 365);
    location.reload();
  }
}
