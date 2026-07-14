import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const RUTAS_PROTEGIDAS = ["/cuenta"];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // No poner código entre createServerClient y getUser(): getUser() refresca
  // el token de sesión si hace falta, y ese refresco es lo que mantiene la
  // sesión viva entre peticiones (sin esto, expiraría silenciosamente).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const esRutaProtegida = RUTAS_PROTEGIDAS.some((ruta) =>
    request.nextUrl.pathname.startsWith(ruta),
  );

  if (esRutaProtegida && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
