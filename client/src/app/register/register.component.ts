import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
@Output() cancelRegister=new EventEmitter();
  model: any ={}

  constructor(private accountService: AccountService) { }
  ngOnInit(): void { }

  register(){
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: error=>console.log(error)
    })
  }
  cancel(){
    this.cancelRegister.emit(false);
  }
}
