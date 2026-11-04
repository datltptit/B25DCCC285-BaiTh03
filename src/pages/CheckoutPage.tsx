import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearCart, selectCartItems, selectCartTotal } from '../features/cart/cartSlice'

export default function CheckoutPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const [success, setSuccess] = useState(false)

  const handleOrder = () => {
    dispatch(clearCart())
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="state success">
        <h2>🎉 Đặt hàng thành công!</h2>
        <p>Cảm ơn bạn đã mua sắm tại ShopMini.</p>
        <Link to="/" className="btn btn-primary">
          Về trang chủ
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="state">
        <p>Giỏ hàng trống, không có gì để thanh toán.</p>
        <Link to="/" className="btn btn-primary">
          Tiếp tục mua sắm
        </Link>
      </div>
    )
  }

  return (
    <section>
      <h1>Thanh toán</h1>
      <ul className="cart-list">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="cart-item">
            <img src={product.image} alt={product.title} />
            <div className="cart-item-info">
              <span className="card-title">{product.title}</span>
              <span>
                {quantity} × ${product.price.toFixed(2)}
              </span>
            </div>
            <span className="line-total">${(product.price * quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <div className="total">
          Tổng thanh toán: <strong>${total.toFixed(2)}</strong>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleOrder}>
          Đặt hàng
        </button>
      </div>
    </section>
  )
}
