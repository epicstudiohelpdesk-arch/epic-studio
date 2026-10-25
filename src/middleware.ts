import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";
  const hostname = host.split(":")[0]; // strip port if present

  const isAdminSubdomain =
    hostname.startsWith("admin.") || hostname === "admin.epic-studio.in";

  // 1. Requests to the admin subdomain (e.g. admin.epic-studio.in or admin.localhost:3001)
  if (isAdminSubdomain) {
    const { pathname, search } = url;

    // Rewrite root "/" on admin subdomain to "/admin"
    if (pathname === "/" || pathname === "") {
      const rewriteUrl = new URL(`/admin${search}`, req.url);
      return NextResponse.rewrite(rewriteUrl);
    }

    // Direct vanity shortcuts on admin subdomain
    if (pathname === "/login") {
      const rewriteUrl = new URL(`/admin/login${search}`, req.url);
      return NextResponse.rewrite(rewriteUrl);
    }

    if (pathname === "/dashboard") {
      const rewriteUrl = new URL(`/admin/dashboard${search}`, req.url);
      return NextResponse.rewrite(rewriteUrl);
    }

    if (pathname === "/leads" || pathname === "/submissions") {
      const targetSearch = search ? `${search}&tab=leads` : "?tab=leads";
      const rewriteUrl = new URL(`/admin/dashboard${targetSearch}`, req.url);
      return NextResponse.rewrite(rewriteUrl);
    }

    if (pathname === "/calls") {
      const targetSearch = search ? `${search}&tab=calls` : "?tab=calls";
      const rewriteUrl = new URL(`/admin/dashboard${targetSearch}`, req.url);
      return NextResponse.rewrite(rewriteUrl);
    }

    if (pathname === "/analytics") {
      const targetSearch = search ? `${search}&tab=analytics` : "?tab=analytics";
      const rewriteUrl = new URL(`/admin/dashboard${targetSearch}`, req.url);
      return NextResponse.rewrite(rewriteUrl);
    }

    if (pathname === "/database") {
      const targetSearch = search ? `${search}&tab=database` : "?tab=database";
      const rewriteUrl = new URL(`/admin/dashboard${targetSearch}`, req.url);
      return NextResponse.rewrite(rewriteUrl);
    }

    // Pass through all other admin assets or API routes
    return NextResponse.next();
  }

  // 2. Production redirect: If someone opens epic-studio.in/admin, forward to admin.epic-studio.in
  const isProductionApex =
    hostname === "epic-studio.in" || hostname === "www.epic-studio.in";

  if (isProductionApex && url.pathname.startsWith("/admin")) {
    const redirectUrl = new URL(
      `https://admin.epic-studio.in${url.pathname}${url.search}`
    );
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes (handled directly)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - assets (public static images)
     * - fonts (public font files)
     * - favicon, robots, sitemap, manifest
     */
    "/((?!api|_next/static|_next/image|assets|fonts|favicon.ico|favicon_light.png|apple-icon.png|manifest.webmanifest|robots.txt|sitemap.xml).*)",
  ],
};
