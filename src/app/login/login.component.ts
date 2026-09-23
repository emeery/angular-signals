import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MessagesService} from "../messages/messages.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'login',
    imports: [
        RouterLink,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    fb = inject(FormBuilder);
    messageService = inject(MessagesService);

    form = this.fb.group({
        email: [''],
        password: ['']
    })

    onLogin() {
        try {
            const {email, password } = this.form.value;
            if(!email || !password) {
                this.messageService.showMessage(
                    "enter and email & password", "error"
                );
            }
        } catch (err) {
            this.messageService.showMessage(
                "login failed, please try again", "error"
            );
        }
    }
}
