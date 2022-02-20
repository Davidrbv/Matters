import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardPageModule),
  },
  {
    path: 'dashboard/:id',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'employees',
    loadChildren: () => import('./pages/employees/employees.module').then((m) => m.EmployeesPageModule),
  },
  {
    path: 'employees/:id',
    loadChildren: () => import('./pages/employees/employees.module').then((m) => m.EmployeesPageModule),
  },
  {
    path: 'sales',
    loadChildren: () => import('./pages/sales/sales.module').then((m) => m.SalesPageModule),
  },
  {
    path: 'sales/:id',
    loadChildren: () => import('./pages/sales/sales.module').then((m) => m.SalesPageModule),
  },
  {
    path: 'invoices',
    loadChildren: () => import('./pages/invoices/invoices.module').then((m) => m.InvoicesPageModule),
  },
  {
    path: 'invoices/:id',
    loadChildren: () => import('./pages/invoices/invoices.module').then((m) => m.InvoicesPageModule),
  },
  {
    path: 'accounting',
    loadChildren: () => import('./pages/accounting/accounting.module').then((m) => m.AccountingPageModule),
  },
  {
    path: 'accounting/:id',
    loadChildren: () => import('./pages/accounting/accounting.module').then((m) => m.AccountingPageModule),
  },
  {
    path: 'employee-register',
    loadChildren: () =>
      import('./pages/employee-register/employee-register.module').then((m) => m.EmployeeRegisterPageModule),
  },
  {
    path: 'employee-register/:id',
    loadChildren: () =>
      import('./pages/employee-register/employee-register.module').then((m) => m.EmployeeRegisterPageModule),
  },
  {
    path: 'sales-register',
    loadChildren: () => import('./pages/sales-register/sales-register.module').then((m) => m.SalesRegisterPageModule),
  },
  {
    path: 'sales-register/:id',
    loadChildren: () => import('./pages/sales-register/sales-register.module').then((m) => m.SalesRegisterPageModule),
  },
  {
    path: 'edit-invoice',
    loadChildren: () => import('./pages/edit-invoice/edit-invoice.module').then((m) => m.EditInvoicePageModule),
  },
  {
    path: 'edit-invoice/:id',
    loadChildren: () => import('./pages/edit-invoice/edit-invoice.module').then((m) => m.EditInvoicePageModule),
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./pages/edit-user/edit-user.module').then((m) => m.EditUserPageModule),
  },
  {
    path: 'edit-user/:id',
    loadChildren: () => import('./pages/edit-user/edit-user.module').then((m) => m.EditUserPageModule),
  },
  {
    path: 'recovery-pass',
    loadChildren: () => import('./pages/recovery-pass/recovery-pass.module').then( m => m.RecoveryPassPageModule)
  },
  {
    path: 'photos',
    loadChildren: () => import('./pages/photos/photos.module').then( m => m.PhotosPageModule)
  },
  {
    path: 'photos/:id',
    loadChildren: () => import('./pages/photos/photos.module').then( m => m.PhotosPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
