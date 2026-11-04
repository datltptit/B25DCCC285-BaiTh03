ShopMini

Ứng dụng cửa hàng mini xây dựng bằng React + TypeScript (Vite). State toàn cục được quản lý bằng Context API và Redux Toolkit, state cục bộ của từng component dùng useState.

Dữ liệu sản phẩm lấy từ API: https://fakestoreapi.com/products

Chạy project
bash
npm install
npm run dev      # chạy dev tại http://localhost:5173
npm run build    # kiểm tra TypeScript + build

Tài khoản đăng nhập giả lập: tên đăng nhập tuỳ ý, mật khẩu 123456.

Chức năng
Các trang: Trang chủ (/), Chi tiết sản phẩm (/products/:id), Giỏ hàng (/cart), Đăng nhập (/login), Thanh toán (/checkout), trang 404.
Trang chủ: lưới sản phẩm responsive (1 cột điện thoại, 2 cột tablet, 4 cột desktop), ô tìm kiếm theo tên.
Header dùng chung: số lượng sản phẩm trong giỏ, tên người dùng, nút đăng xuất, nút đổi theme sáng/tối.
/checkout là protected route: chưa đăng nhập thì chuyển sang /login, đăng nhập xong quay lại trang trước đó.
Nút "Đặt hàng" ở trang Thanh toán xoá giỏ hàng và hiện thông báo thành công.
Dùng TypeScript đầy đủ, không dùng any.
Dữ liệu nào để ở đâu và vì sao

Nguyên tắc chọn nơi lưu state:

useState: dữ liệu chỉ một component dùng, mất đi khi rời trang cũng không sao.
Context API: dữ liệu nhỏ, ít thay đổi, cần chia sẻ cho nhiều component (theme, thông tin người dùng).
Redux Toolkit: dữ liệu nghiệp vụ lớn, nhiều trang cùng đọc và ghi, có logic cập nhật phức tạp hoặc gọi API bất đồng bộ (sản phẩm, giỏ hàng).
Dữ liệu	Nơi lưu	Vị trí trong code	Lý do
Theme sáng/tối (theme, toggleTheme)	Context	contexts/ThemeContext.tsx, hook useTheme()	Là dữ liệu giao diện toàn app, nhỏ, hiếm khi đổi, Header và nhiều nơi cần đọc. Không có logic phức tạp nên không cần Redux.
Người dùng đăng nhập (user, login, logout)	Context	contexts/AuthContext.tsx, hook useAuth()	Header, trang Login và ProtectedRoute đều cần biết trạng thái đăng nhập. Chỉ gồm một đối tượng user và hai hàm, dùng Context là đủ gọn.
Danh sách sản phẩm (items, status, error)	Redux (productsSlice)	features/products/productsSlice.ts	Dữ liệu lấy từ API bất đồng bộ, có 3 trạng thái loading, succeeded, failed, được dùng ở cả trang chủ và trang chi tiết. createAsyncThunk xử lý gọi API và trạng thái gọn hơn. Lưu một nơi nên không phải tải lại mỗi lần đổi trang.
Giỏ hàng (items gồm sản phẩm và số lượng)	Redux (cartSlice)	features/cart/cartSlice.ts	Nhiều nơi cùng đọc và sửa: ProductCard, trang chi tiết, trang giỏ hàng, trang thanh toán, Header. Có nhiều thao tác (thêm, xoá, đổi số lượng, xoá hết) và dữ liệu suy ra (tổng số lượng, tổng tiền) nên dùng reducer và selector để tập trung logic.
Tổng số lượng và tổng tiền	Redux selector (dữ liệu suy ra)	selectCartCount, selectCartTotal trong cartSlice.ts	Tính từ giỏ hàng, không lưu thêm state riêng để tránh dữ liệu bị lệch nhau.
Từ khoá tìm kiếm ở trang chủ (keyword)	useState	pages/HomePage.tsx	Chỉ trang chủ dùng, thay đổi liên tục khi gõ phím, không cần giữ lại khi chuyển trang.
Ô nhập tên đăng nhập, mật khẩu, thông báo lỗi (username, password, error)	useState	pages/LoginPage.tsx	Dữ liệu tạm của một form, chỉ có ý nghĩa trong trang đăng nhập. Đưa lên Context hay Redux sẽ gây phức tạp không cần thiết, và mật khẩu không nên lưu ở state toàn cục.
Cờ đặt hàng thành công (success)	useState	pages/CheckoutPage.tsx	Chỉ dùng để chuyển giao diện giữa màn hình thanh toán và màn hình thông báo thành công trong chính trang này.
Ghi chú thêm
Bên trong ThemeProvider và AuthProvider, giá trị được giữ bằng useState và chia sẻ xuống toàn app qua Context. Hàm toggleTheme, login, logout được bọc useCallback và giá trị Context được bọc useMemo để tránh render lại không cần thiết.
Redux store được cấu hình ở app/store.ts bằng configureStore. Hook có kiểu useAppDispatch và useAppSelector ở app/hooks.ts giúp dùng TypeScript đầy đủ, không cần any.
main.tsx bọc ứng dụng theo thứ tự: Redux Provider, ThemeProvider, AuthProvider, BrowserRouter.
Cấu trúc thư mục
src/
├── app/
│   ├── store.ts            (configureStore, RootState, AppDispatch)
│   └── hooks.ts            (useAppDispatch, useAppSelector)
├── features/
│   ├── products/productsSlice.ts
│   └── cart/cartSlice.ts
├── contexts/
│   ├── ThemeContext.tsx
│   └── AuthContext.tsx
├── components/
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   └── ProtectedRoute.tsx
├── layouts/MainLayout.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CartPage.tsx
│   ├── LoginPage.tsx
│   ├── CheckoutPage.tsx
│   └── NotFoundPage.tsx
├── types/index.ts          (Product, CartItem, User)
├── App.tsx                 (khai báo Routes)
└── main.tsx                (bọc Provider, ThemeProvider, AuthProvider, BrowserRouter)
