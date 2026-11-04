import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchProducts } from '../features/products/productsSlice'
import ProductCard from '../components/ProductCard'

export default function HomePage() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((s) => s.products)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase()
    if (!k) return items
    return items.filter((p) => p.title.toLowerCase().includes(k))
  }, [items, keyword])

  return (
    <section>
      <div className="toolbar">
        <h1>Sản phẩm</h1>
        <input
          type="search"
          className="input search"
          placeholder="Tìm kiếm theo tên..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {status === 'loading' && <p className="state">Đang tải sản phẩm...</p>}

      {status === 'failed' && (
        <div className="state error">
          <p>{error}</p>
          <button type="button" className="btn btn-primary" onClick={() => dispatch(fetchProducts())}>
            Thử lại
          </button>
        </div>
      )}

      {status === 'succeeded' && filtered.length === 0 && (
        <p className="state">Không tìm thấy sản phẩm phù hợp.</p>
      )}

      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
