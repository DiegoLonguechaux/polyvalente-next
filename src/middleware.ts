import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token && (token.role === "admin" || token.role === "super_admin"),
  },
});

export const config = {
  matcher: ["/admin", "/admin/evenements/:path*", "/admin/users/:path*"],
};
