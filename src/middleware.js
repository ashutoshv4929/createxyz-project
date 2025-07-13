import { NextResponse } from "next/server";

export const config = {
  matcher: "/integrations/:path*",
};

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-createxyz-project-id", "54f6fcc1-a91d-460e-a873-0b0e67350139");
  requestHeaders.set("x-createxyz-project-group-id", "1fd047b9-5d95-434e-a1f0-b5bff8d84b9c");


  request.nextUrl.href = `https://www.create.xyz/${request.nextUrl.pathname}`;

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}