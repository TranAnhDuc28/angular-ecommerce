import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// route bắt đầu từ cái cụ thể đến cái chung chung
const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/ products', pathMatch: 'full' },
];

@NgModule({
  // Các component và directive được khai báo trong module này
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
  ],
  // Các module khác cần thiết cho ứng dụng này
  imports: [
    BrowserModule,
    HttpClientModule, // Nhập HttpClientModule để kích hoạt các dịch vụ HTTP
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  // Các dịch vụ (services) được cung cấp bởi module này (nếu có)
  providers: [
    ProductService,
  ],
  // Component khởi động (bootstrap) của ứng dụng
  bootstrap: [AppComponent]
})
export class AppModule { }


/**
 * ===> HttpClientModule <===  
 * Cần được nhập vào để:
 * - Sử dụng các dịch vụ HTTP của Angular (HttpClient) để gọi API.
 * - Cho phép thực hiện các yêu cầu HTTP như GET, POST, PUT, DELETE từ ứng dụng đến server hoặc API.
 * - Cung cấp các phương thức tiện dụng để giao tiếp với các dịch vụ web và xử lý dữ liệu phản hồi (response).
 * - Nếu quên nhập HttpClientModule, các dịch vụ HTTP trong ứng dụng sẽ không hoạt động,
 * và sẽ gặp lỗi khi cố gắng sử dụng HttpClient để gọi API.
*/

