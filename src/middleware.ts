export { default }  from "next-auth/middleware"
export const config = {matcher:["/edit"]}

//TODO expire is not working
// export async function middleware(request:NextRequest) {
//     let authCookie = request.cookies.get("token");
//     let token = authCookie?.value;
//
//     if(token == undefined) {
//         if(request.nextUrl.pathname.includes("/edit") || request.nextUrl.pathname.includes("/login/create")) {
//             console.log(new URL("/",request.url).toString());
//             return NextResponse.redirect(new URL("/",request.url))
//         }
//         return NextResponse.next();
//     }
//
//     let secret = process.env.JWT_SECRET;
//     if(secret == undefined) {
//         return NextResponse.next();
//     }
//     jwtVerify(token, new TextEncoder().encode(secret)).then((payload) => {
//         if(payload.payload.exp == payload.payload.iat || payload.payload.iat == undefined || payload.payload.exp == undefined) {
//             if(request.nextUrl.pathname.includes("/edit")) {
//                 return NextResponse.redirect(new URL("/"))
//             }
//         }
//     }).catch(() => {
//         // if the error thrown is because the JWT is unauthorized, return a 401 error
//         if(request.nextUrl.pathname.includes("/edit") || request.nextUrl.pathname.includes("/login/create")) {
//             return NextResponse.redirect(new URL("/"))
//         }
//         return NextResponse.next();
//     });
//     return NextResponse.next();
//     //TODO make it so if they are trying to get to an edit page when not logged in then throw err
// }
