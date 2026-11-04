import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectCartCount } from '../features/cart/cartSlice'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

export default function Header() {
  const cartCount = useAppSelector(selectCartCount)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          🛍️ ShopMini
        </Link>

        <nav className="header-nav">
          <Link to="/cart" className="cart-link">
            🛒 Giỏ hàng
            <span className="badge">{cartCount}</span>
          </Link>

          <button type="button" className="btn btn-ghost" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
          </button>

          {user ? (
            <>
              <span className="username">Xin chào, {user.username}</span>
              <button type="button" className="btn btn-outline" onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Đăng nhập
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
