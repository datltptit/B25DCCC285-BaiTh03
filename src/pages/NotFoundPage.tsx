import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="state">
      <h1>404</h1>
      <p>Trang bạn tìm không tồn tại.</p>
      <Link to="/" className="btn btn-primary">
        Về trang chủ
      </Link>
    </div>
  )
}
