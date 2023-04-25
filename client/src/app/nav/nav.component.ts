import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any ={};
  
  
ngOnInit(){
  
}

constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) {  }
  
 

  login(){
    this.accountService.login(this.model).subscribe({
        next: _ => this.router.navigateByUrl('/members'),
        error: error => this.toastr.error(error.error)
     })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
   }
}

