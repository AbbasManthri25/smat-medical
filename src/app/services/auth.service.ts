import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router }     from '@angular/router';
import { tap }        from 'rxjs/operators';
import { User, AuthResponse } from '../models/user.model';
import { environment } from '../../environments/environment';

const API = environment.apiUrl;
const TOKEN_KEY = 'smat_token';
const USER_KEY  = 'smat_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(this.loadUser());
  readonly user     = this._user.asReadonly();
  readonly isLoggedIn = computed(() => !!this._user());
  readonly isAdmin    = computed(() => !!this._user()?.isAdmin);

  constructor(private http: HttpClient, private router: Router) {}

  register(data: { name: string; email: string; phone: string; password: string; organization?: string }) {
    return this.http.post<AuthResponse>(`${API}/auth/register`, data).pipe(
      tap((res) => this.store(res))
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${API}/auth/login`, { email, password }).pipe(
      tap((res) => this.store(res))
    );
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._user.set(null);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  updateProfile(data: Partial<User>) {
    return this.http.put<User>(`${API}/auth/profile`, data).pipe(
      tap((u) => {
        this._user.set(u);
        localStorage.setItem(USER_KEY, JSON.stringify(u));
      })
    );
  }

  changePassword(currentPassword: string, newPassword: string) {
    return this.http.put(`${API}/auth/password`, { currentPassword, newPassword });
  }

  private store(res: AuthResponse) {
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    this._user.set(res.user);
  }

  private loadUser(): User | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
