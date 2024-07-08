import { Injectable } from '@angular/core';
import { CartItem } from '../dto/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

/**
 * - Sử dụng Subject từ thư viện rxjs là rất phổ biến để quản lý luồng dữ liệu bất đồng bộ, 
 * đặc biệt trong các tình huống khi muốn thông báo và phản hồi thay đổi dữ liệu 
 * giữa các phần khác nhau của ứng dụng.
 * - next(value) trong Subject: Phát giá trị value tới tất cả các subscriber hiện tại.
 * Thường được sử dụng để thông báo thay đổi dữ liệu giữa các component, 
 * giúp chúng cập nhật trạng thái hoặc giao diện người dùng tương ứng.
 */


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(cartItem: CartItem) {
    // kiểm tra có sản phẩm nào trong giỏ hàng chưa
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined;

    if (this.cartItems.length > 0) {
      // tìm sản phẩm trong giỏ hàng dựa trên id sản phẩm
      // Array.find() -> trả về phần tử đầu tiên trong mảng mà hàm kiểm tra cung cấp trả về true. 
      // Nếu không tìm thấy phần tử nào thỏa mãn điều kiện, nó sẽ trả về undefined.
      existingCartItem = this.cartItems.find(item => item.id === cartItem.id);

      // kiểm tra nếu tìm được sản phẩm trong giỏ hàng
      alreadyExistsInCart = (existingCartItem != undefined)
    }

    if (alreadyExistsInCart) {
      // tăng số lượng sản phẩm lên 1
      existingCartItem!.quantity++;
    } else {
      // nếu sản phẩm chưa tồn tại trong giỏ hàng thì thêm mới
      this.cartItems.push(cartItem);
    }

    // tính tổng giá và tổng số lượng
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // thay đổi dữ liệu mới, tất cả các đăng ký sẽ nhận được giá trị mới
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }


  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (let cartItem of this.cartItems) {
      const subTotalPrice = cartItem.quantity * cartItem.unitPrice;
      console.log(`** name: ${cartItem.name}, quantity=${cartItem.quantity}, unitPrice=${cartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    // toFixed(2): hiển thị số hiển thị sau phần thập phân
    console.log(`totalPriceValue: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('------');
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      this.remove(cartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(cartItem: CartItem) {
    /**
     * findIndex() Phương thức của mảng (array) giúp bạn tìm vị trí (index) của phần tử đầu tiên
     * trong mảng thỏa mãn một điều kiện do một hàm callback cung cấp. 
     * Nếu không tìm thấy phần tử nào thỏa mãn điều kiện, findIndex() sẽ trả về -1
     */

    // tìm sản phẩm trong giỏ hàng dựa trên id sản phẩm
    const itemIndex = this.cartItems.findIndex(item => item.id === cartItem.id);

    // xóa sản phẩm trong giỏ hàng
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
    }

    // tính tổng giá và tổng số lượng
    this.computeCartTotals();
  }
}


