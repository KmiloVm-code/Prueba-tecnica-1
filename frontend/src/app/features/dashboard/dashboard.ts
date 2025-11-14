import { Component, OnInit } from '@angular/core';
import { User as UserModel } from '../../core/models/user';
import { Auth } from '../../core/services/auth/auth';
import { User as UserService } from '../../core/services/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  users: UserModel[] = [];
  currentUser: UserModel | null = null;
  isLoadingUser: boolean = true;
  isLoadingUsers: boolean = true;
  
  constructor(
    private userService: UserService, 
    private authService: Auth, 
    private router: Router
  ) {}

  ngOnInit() {
    this.getCurrentUser();
    this.getUsers();
  }

  getCurrentUser() {
    this.isLoadingUser = true;
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.isLoadingUser = false;
      },
      error: (err) => {
        console.error('Error al obtener usuario actual:', err);
        this.isLoadingUser = false;
        this.router.navigate(['/login']);
      }
    });
  }

  getUsers() {
    this.isLoadingUsers = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoadingUsers = false;
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
        this.isLoadingUsers = false;
      }
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
      }
    });
  }
}
