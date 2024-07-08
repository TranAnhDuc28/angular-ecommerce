import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/dto/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {


  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    // xử lý các mặt hàng có trong giỏ
    this.cartItems = this.cartService.cartItems;

    // xử lý tổng tiền
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // xử lý tổng số lượng
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    // tính tổng giá và số lượng của giỏ hàng
    this.cartService.computeCartTotals();
  }

  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }

  remove(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }
}
