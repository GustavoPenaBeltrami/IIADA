export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/courses/:path*",
        "/course/:path*",
        "/api/courses/:path*",
        "/api/course/:path*",
    
    ]
}