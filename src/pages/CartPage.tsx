import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from '../features/cart/cartSlice'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)

  if (items.length === 0) {
    return (
      <div className="state">
        <p>Giỏ hàng đang trống.</p>
        <Link to="/" className="btn btn-primary">
          Tiếp tục mua sắm
        </Link>
      </div>
    )
  }

  return (
    <section>
      <h1>Giỏ hàng</h1>
      <ul className="cart-list">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="cart-item">
            <img src={product.image} alt={product.title} />
            <div className="cart-item-info">
              <Link to={`/products/${product.id}`} className="card-title">
                {product.title}
              </Link>
              <span className="price">${product.price.toFixed(2)}</span>
            </div>
            <div className="qty">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))}
              >
                +
              </button>
            </div>
            <span className="line-total">${(product.price * quantity).toFixed(2)}</span>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => dispatch(removeFromCart(product.id))}
            >
              Xoá
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <button type="button" className="btn btn-outline" onClick={() => dispatch(clearCart())}>
          Xoá toàn bộ
        </button>
        <div className="total">
          Tổng tiền: <strong>${total.toFixed(2)}</strong>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/checkout')}>
          Thanh toán
        </button>
      </div>
    </section>
  )
}
