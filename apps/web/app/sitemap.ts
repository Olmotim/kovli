import type { MetadataRoute } from "next";
import { secciones } from "@/lib/secciones";
import { breeds } from "@/data/breeds";

const BASE_URL = "https://kovli.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
    const rutasFijas = [
        "",
        "/razas",
        "/aviso-legal",
        "/privacidad",
        "/cookies",
        ...secciones.map((s) => s.href),
    ];
    const rutasRazas = breeds.map((b) => `/razas/${b.slug}`);

    return [...rutasFijas, ...rutasRazas].map((ruta) => ({
        url: `${BASE_URL}${ruta}`,
        lastModified: new Date(),
    }));
}
