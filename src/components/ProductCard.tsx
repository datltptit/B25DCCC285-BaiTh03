import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import type { Product } from '../types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch()

  return (
    <article className="card">
      <Link to={`/products/${product.id}`} className="card-image">
        <img src={product.image} alt={product.title} loading="lazy" />
      </Link>
      <div className="card-body">
        <Link to={`/products/${product.id}`} className="card-title" title={product.title}>
          {product.title}
        </Link>
        <p className="card-category">{product.category}</p>
        <div className="card-footer">
          <span className="price">${product.price.toFixed(2)}</span>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => dispatch(addToCart(product))}
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </article>
  )
}
