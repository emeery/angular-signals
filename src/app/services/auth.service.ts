import {computed, effect, inject, Injectable, signal} from "@angular/core";
import {User} from "../models/user.model";
import {Router} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { firstValueFrom } from "rxjs";

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  env = environment;
  router = inject(Router);

  #userSignal = signal<User | null>(null);
  user = this.#userSignal.asReadonly();

  isLoggedIn = computed(() => !!this.user());

  async login(email: string, password: string): Promise<User> {
    const login$ = await this.http.post<User>(`${this.env.apiRoot}/login`,{email,password});

    const user = await firstValueFrom(login$);
    this.#userSignal.set(user);

    return user;

  }

  async logout() {
    this.#userSignal.set(null);
    await this.router.navigateByUrl("/login");
  }

}
