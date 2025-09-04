# Infraestructura — Portal interno de cursos

## Desarrollo
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Deploy rápido (Vercel)
1. Crea un repo en GitHub y sube estos archivos.
2. Ve a https://vercel.com/new e importa el repo.
3. Framework: **Vite**. Root: `/`.
4. Deploy → obtendrás una URL `https://<proyecto>.vercel.app`.

## Acceso interno
- Código de equipo: `infra2025` (cambiar en `src/App.tsx`, constante ACCESS_CODE).
- Cada usuario crea su alias al entrar. El progreso se guarda en su navegador.

> Nota: El código de acceso es **cliente** (no es seguridad fuerte). Para password a nivel plataforma, usa Vercel Middleware con Basic Auth o un backend real (Supabase/Auth0).
