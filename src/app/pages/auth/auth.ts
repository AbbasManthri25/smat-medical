import { Component, OnInit, signal } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService }    from '../../services/auth.service';

@Component({
  selector: 'app-auth-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl:    './auth.scss',
})
export class AuthPage implements OnInit {
  isLogin    = signal(true);
  loading    = signal(false);
  error      = signal('');
  showPass   = signal(false);

  loginForm  = { email: '', password: '' };
  regForm    = { name: '', email: '', phone: '', password: '', organization: '' };

  constructor(
    private auth:   AuthService,
    private router: Router,
    private route:  ActivatedRoute,
  ) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) this.router.navigate(['/account']);
    if (this.route.snapshot.url[0]?.path === 'register') this.isLogin.set(false);
  }

  login() {
    if (!this.loginForm.email || !this.loginForm.password) {
      this.error.set('Email and password required.');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.auth.login(this.loginForm.email, this.loginForm.password).subscribe({
      next: () => {
        const ret = this.route.snapshot.queryParams['returnUrl'] || '/account';
        this.router.navigateByUrl(ret);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Login failed. Check your credentials.');
        this.loading.set(false);
      },
    });
  }

  register() {
    const f = this.regForm;
    if (!f.name || !f.email || !f.phone || !f.password) {
      this.error.set('All required fields must be filled.');
      return;
    }
    if (f.password.length < 6) { this.error.set('Password must be at least 6 characters.'); return; }

    this.loading.set(true);
    this.error.set('');
    this.auth.register(f).subscribe({
      next: () => this.router.navigate(['/account']),
      error: (err) => {
        this.error.set(err.error?.message || err.error?.errors?.[0]?.msg || 'Registration failed.');
        this.loading.set(false);
      },
    });
  }

  switchTab(login: boolean) {
    this.isLogin.set(login);
    this.error.set('');
  }
}
