import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo
} from "@angular/fire/auth-guard";

/* Guards */
const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(["home"]);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(["dashboard"]);

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then(m => m.HomePageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard }
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./pages/dashboard/dashboard.module").then(
        m => m.DashboardPageModule
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  {
    path: "register",
    loadChildren: () =>
      import("./pages/register/register.module").then(
        m => m.RegisterPageModule
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard }
  },
  {
    path: "employees",
    loadChildren: () =>
      import("./pages/employees/employees.module").then(
        m => m.EmployeesPageModule
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  {
    path: "sales",
    loadChildren: () =>
      import("./pages/sales/sales.module").then(m => m.SalesPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  {
    path: "invoices",
    loadChildren: () =>
      import("./pages/invoices/invoices.module").then(
        m => m.InvoicesPageModule
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  {
    path: "accounting",
    loadChildren: () =>
      import("./pages/accounting/accounting.module").then(
        m => m.AccountingPageModule
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  {
    path: "employee-register",
    loadChildren: () =>
      import("./pages/employee-register/employee-register.module").then(
        m => m.EmployeeRegisterPageModule
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  {
    path: "employee-register/:id",
    loadChildren: () =>
      import("./pages/employee-register/employee-register.module").then(
        m => m.EmployeeRegisterPageModule
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  {
    path: "sales-register",
    loadChildren: () =>
      import("./pages/sales-register/sales-register.module").then(
        m => m.SalesRegisterPageModule
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  {
    path: "sales-register/:id",
    loadChildren: () =>
      import("./pages/sales-register/sales-register.module").then(
        m => m.SalesRegisterPageModule
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  {
    path: "edit-invoice",
    loadChildren: () =>
      import("./pages/edit-invoice/edit-invoice.module").then(
        m => m.EditInvoicePageModule
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  {
    path: "edit-invoice/:id",
    loadChildren: () =>
      import("./pages/edit-invoice/edit-invoice.module").then(
        m => m.EditInvoicePageModule
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  {
    path: "edit-user",
    loadChildren: () =>
      import("./pages/edit-user/edit-user.module").then(
        m => m.EditUserPageModule
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  {
    path: "edit-user/:id",
    loadChildren: () =>
      import("./pages/edit-user/edit-user.module").then(
        m => m.EditUserPageModule
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  {
    path: "recovery-pass",
    loadChildren: () =>
      import("./pages/recovery-pass/recovery-pass.module").then(
        m => m.RecoveryPassPageModule
      )
  },
  {
    path: "photos",
    loadChildren: () =>
      import("./pages/photos/photos.module").then(m => m.PhotosPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
