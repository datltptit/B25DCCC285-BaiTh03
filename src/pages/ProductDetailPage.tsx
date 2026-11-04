import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import { fetchProducts } from '../features/products/productsSlice'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { items, status } = useAppSelector((s) => s.products)

  // Cho phép vào thẳng trang chi tiết (F5) mà vẫn có dữ liệu
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  const product = items.find((p) => p.id === Number(id))

  if (status === 'idle' || status === 'loading') {
    return <p className="state">Đang tải sản phẩm...</p>
  }

  if (!product) {
    return (
      <div className="state">
        <p>Không tìm thấy sản phẩm.</p>
        <Link to="/" className="btn btn-primary">
          Về trang chủ
        </Link>
      </div>
    )
  }

  return (
    <section className="detail">
      <div className="detail-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="detail-info">
        <Link to="/" className="back">
          ← Quay lại
        </Link>
        <h1>{product.title}</h1>
        <p className="card-category">{product.category}</p>
        <p className="price price-lg">${product.price.toFixed(2)}</p>
        <p className="description">{product.description}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => dispatch(addToCart(product))}
        >
          Thêm vào giỏ
        </button>
      </div>
    </section>
  )
}
