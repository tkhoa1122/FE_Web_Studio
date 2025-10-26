This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


them component loading

const result = await dispatch(loginUser(credentials));
    if (loginUser.fulfilled.match(result)) {
      return true;  // Thành công
    }

    export const useRequireAuth = (redirectUrl: string = '/login') => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Lưu URL hiện tại để redirect về sau
      const currentPath = window.location.pathname;
      localStorage.setItem('redirectAfterLogin', currentPath);
      
      // Redirect về login
      router.push(redirectUrl);
    }
  }, [isAuthenticated, isLoading, router, redirectUrl]);

  return { isAuthenticated, isLoading };
};

// tai sao ?Chỉ lưu ở client-side
if (typeof window !== 'undefined') {
  localStorage.setItem('accessToken', token);
}

const login = async (credentials: LoginRequestDTO) => {
  // TypeScript sẽ báo lỗi nếu thiếu trường hoặc sai type
  const result = await dispatch(loginUser(credentials));
  
  // Type guard
  if (loginUser.fulfilled.match(result)) {
    // result.payload có type LoginResponseDTO
    return true;
  }
  return false;
};


// ❌ Lặp lại code
const Component1 = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  // ...
}

// ✅ Reusable hook
const Component1 = () => {
  const { user, login, logout } = useAuth();
  // ...
}

    giai thich

    thử cookies
    login = google thông qua aws

TÓM TẮT FLOW

Khi app start
1. Redux store được tạo
2. Provider bọc toàn bộ app
3. Component mount → useAuth()
4. dispatch(checkAuthStatus())
5. Lấy token từ localStorage
6. Nếu có → set isAuthenticated=true
7. Header hiển thị user info

Khi login
1. Input username/password
2. Submit form
3. Call login()
4. dispatch(loginUser())
5. API call với axios
6. Response → save to localStorage
7. Redux state update
8. Component re-render
9. Redirect to target page

Khi gọi protected API
1. axios.post('/bookings', data)
2. Request interceptor → add token
3. Server verify token
4. Return response
5. If 401 → response interceptor → logout