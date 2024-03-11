import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyResetCodeComponent } from './components/verify-reset-code/verify-reset-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [

  {
    path: '', canActivate: [authGuard]
    , component: BlankLayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'wishlist', component: WhishlistComponent },
      { path: 'brands', component: BrandsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'check-out/:id', component: CheckOutComponent },
    ]
  },
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forget-password', component: ForgotPasswordComponent },
      { path: 'Verify-Code', component: VerifyResetCodeComponent },
      { path: 'Reset-Password', component: ResetPasswordComponent }

    ]
  }
  , {
    path: '**', component: NotfoundComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
