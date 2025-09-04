
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Infraestructura — Portal interno de cursos (versión 1.1)
// Tema celeste, logo pirata ⚓️🏴‍☠️
// Incluye Azure Fundamentals e ITIL/Helpdesk

/********************
 * Configuración
 ********************/
const ACCESS_CODE = "infra2025";

const BRAND = {
  name: "Infraestructura",
  logo: "🏴‍☠️",
  primary: "#22aaff",
  primaryDark: "#0d8bd1",
};

const CATEGORIES = ["Todos", "Seguridad", "Redes", "Helpdesk", "Hardware", "Linux", "Cloud"];
const PROVIDERS = ["Todos", "Cisco", "Microsoft", "Linux Foundation", "TryHackMe", "IBM SkillsBuild", "Axelos"];
const LEVELS = ["Todos", "Principiante", "Intermedio", "Avanzado"];
const SORT_OPTIONS = [
  { key: "featured", label: "Destacados" },
  { key: "rating", label: "Mejor valorados" },
  { key: "duration", label: "Duración (horas)" },
];

/********************
 * Catálogo de cursos
 ********************/
const COURSES = [
  {
    id: "cisco-intro-cyber",
    title: "Introducción a la Ciberseguridad",
    provider: "Cisco",
    category: "Seguridad",
    level: "Principiante",
    rating: 4.8,
    durationHours: 6,
    free: true,
    url: "https://www.netacad.com/courses/introduction-to-cybersecurity",
    description: "Panorama de amenazas, CIA triad, buenas prácticas y roles en ciberseguridad.",
    tags: ["Fundamentos", "Amenazas", "Buenas prácticas"],
  },
  {
    id: "cisco-networking-basics",
    title: "Conceptos Básicos de Redes",
    provider: "Cisco",
    category: "Redes",
    level: "Principiante",
    rating: 4.7,
    durationHours: 8,
    free: true,
    url: "https://www.netacad.com/es/courses/networking-basics",
    description: "Modelo básico de redes, dispositivos, direccionamiento y troubleshooting inicial.",
    tags: ["TCP/IP", "Switching", "Routing"],
  },
  {
    id: "cisco-hardware-basics",
    title: "Fundamentos de Hardware de Computadoras",
    provider: "Cisco",
    category: "Hardware",
    level: "Principiante",
    rating: 4.6,
    durationHours: 10,
    free: true,
    url: "https://www.netacad.com/courses/computer-hardware-basics",
    description: "Componentes de hardware, armado básico, mantenimiento y diagnóstico.",
    tags: ["Componentes", "Mantenimiento"],
  },
  {
    id: "microsoft-sc900",
    title: "SC‑900: Security, Compliance & Identity Fundamentals",
    provider: "Microsoft",
    category: "Seguridad",
    level: "Principiante",
    rating: 4.7,
    durationHours: 10,
    free: true,
    url: "https://learn.microsoft.com/es-es/credentials/certifications/security-compliance-and-identity-fundamentals/",
    description: "Fundamentos de seguridad, cumplimiento e identidad en Microsoft 365 y Azure.",
    tags: ["Azure", "Defender", "Identidad"],
  },
  {
    id: "microsoft-az900",
    title: "AZ‑900: Azure Fundamentals",
    provider: "Microsoft",
    category: "Cloud",
    level: "Principiante",
    rating: 4.8,
    durationHours: 12,
    free: true,
    url: "https://learn.microsoft.com/en-us/certifications/exams/az-900/",
    description: "Conceptos básicos de la nube, servicios de Azure, precios, soporte y seguridad.",
    tags: ["Azure", "Cloud", "Fundamentos"],
  },
  {
    id: "linuxfoundation-intro",
    title: "Introducción a Linux (auditar gratis)",
    provider: "Linux Foundation",
    category: "Linux",
    level: "Principiante",
    rating: 4.8,
    durationHours: 40,
    free: true,
    url: "https://www.edx.org/learn/linux/the-linux-foundation-introduccion-a-linux",
    description: "Comandos, shell, archivos, redes y administración básica.",
    tags: ["Shell", "Sysadmin", "Archivos"],
  },
  {
    id: "tryhackme-presecurity",
    title: "TryHackMe: Pre‑Security Path",
    provider: "TryHackMe",
    category: "Seguridad",
    level: "Principiante",
    rating: 4.6,
    durationHours: 15,
    free: true,
    url: "https://tryhackme.com/path/outline/presecurity",
    description: "Ruta práctica para empezar en seguridad ofensiva/defensiva.",
    tags: ["Labs", "Hands‑on", "Networking"],
  },
  {
    id: "ibm-skillsbuild-cyber",
    title: "IBM SkillsBuild: Fundamentos de Ciberseguridad",
    provider: "IBM SkillsBuild",
    category: "Seguridad",
    level: "Principiante",
    rating: 4.5,
    durationHours: 6,
    free: true,
    url: "https://skillsbuild.org/es/students/course-catalog/cybersecurity",
    description: "Módulos introductorios con badges gratuitos de ciberseguridad.",
    tags: ["Badges", "Fundamentos"],
  },
  {
    id: "axelos-itil4",
    title: "ITIL® 4: Introducción al marco de gestión de servicios",
    provider: "Axelos",
    category: "Helpdesk",
    level: "Principiante",
    rating: 4.6,
    durationHours: 5,
    free: true,
    url: "https://www.axelos.com/certifications/itil-service-management",
    description: "Fundamentos de ITIL, gestión de servicios, procesos clave y terminología para helpdesk y soporte.",
    tags: ["ITIL", "Gestión de servicios", "Helpdesk"],
  },
];

/********************
 * Utilidades y componentes UI
 ********************/
function classNames(...args: any[]) { return args.filter(Boolean).join(" "); }

function Star({ filled }: { filled: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" className={classNames("w-4 h-4", filled ? "opacity-100" : "opacity-60")}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.06 4.177a.563.563 0 00.424.308l4.6.668a.562.562 0 01.311.959l-3.325 3.24a.563.563 0 00-.162.498l.785 4.58a.562.562 0 01-.815.592l-4.115-2.163a.563.563 0 00-.524 0L7.65 18.52a.562.562 0 01-.814-.592l.784-4.58a.563.563 0 00-.162-.498l-3.325-3.24a.562.562 0 01.311-.959l4.6-.668a.563.563 0 00.425-.308l2.06-4.177z"/>
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating); const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (<Star key={i} filled={i < full || (half && i === full)} />))}
      <span className="text-sm opacity-70">{rating.toFixed(1)}</span>
    </div>
  );
}

function Tag({ children }: any) { return <span className="text-xs px-2 py-1 rounded-full bg-black/5">#{children}</span>; }

function PriceBadge({ free }: { free: boolean }) {
  return (<span className={classNames("text-xs px-2 py-1 rounded-full border", free ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-black/10")}>{free ? "Gratis" : "Pago"}</span>);
}

/********************
 * Autenticación simple (cliente)
 ********************/
function useAuth() {
  const [user, setUser] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("infra.user");
    const gate = localStorage.getItem("infra.gate");
    if (saved) setUser(saved);
    if (gate === "ok") setOk(true);
  }, []);

  function openGate(code: string) {
    const valid = code.trim() == ACCESS_CODE;
    if (valid) { localStorage.setItem("infra.gate", "ok"); setOk(true); }
    return valid;
  }

  function login(name: string) {
    const n = name.trim(); if (!n) return false;
    localStorage.setItem("infra.user", n); setUser(n); return true;
  }

  function logout() { localStorage.removeItem("infra.user"); setUser(null); }

  return { user, ok, openGate, login, logout };
}

/********************
 * Progreso por usuario
 ********************/
function useProgress(user: string | null) {
  const key = user ? `infra.progress:${user}` : null;
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => { if (!key) return; const raw = localStorage.getItem(key); setDone(raw ? JSON.parse(raw) : {}); }, [key]);

  function toggle(id: string) {
    if (!key) return; const next = { ...done, [id]: !done[id] }; setDone(next); localStorage.setItem(key, JSON.stringify(next));
  }
  return { done, toggle };
}

/********************
 * Tarjeta del curso
 ********************/
function CourseCard({ course, onOpen, checked, onCheck }: any) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="group rounded-2xl border border-black/10 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="relative h-36 bg-gradient-to-br from-sky-50 via-white to-sky-100">
        {course.level && (<span className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-sky-600 text-white">{course.level}</span>)}
        <div className="absolute right-3 top-3"><PriceBadge free={!!course.free} /></div>
        <div className="absolute inset-0 flex items-center justify-center text-5xl">📘</div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs px-2 py-1 rounded-full bg-sky-100 text-sky-700">{course.provider}</span>
          <span className="text-xs opacity-60">{course.category}</span>
        </div>
        <h3 className="font-semibold text-base leading-tight mb-1 line-clamp-2">{course.title}</h3>
        <p className="text-sm opacity-75 line-clamp-2 mb-3">{course.description}</p>
        <div className="flex items-center justify-between text-sm mb-3">
          <Stars rating={course.rating} />
          <span className="opacity-70">{course.durationHours}h</span>
        </div>
        <div className="flex items-center justify-between">
          <button onClick={() => onOpen(course)} className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm">Ver detalles</button>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={checked} onChange={() => onCheck(course.id)} className="w-4 h-4" />
            <span className="opacity-80">Marcar como hecho</span>
          </label>
        </div>
      </div>
    </motion.div>
  );
}

function DetailsModal({ course, onClose }: any) {
  if (!course) return null;
  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        <motion.div role="dialog" aria-modal="true" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} className="relative mx-auto mt-20 w-[92vw] max-w-2xl rounded-2xl bg-white shadow-xl border border-black/10">
          <div className="p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="text-xs px-2 py-1 rounded-full bg-sky-100 text-sky-700 w-fit mb-2">{course.provider} • {course.level}</div>
                <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
                <div className="flex items-center gap-3 text-sm opacity-80">
                  <Stars rating={course.rating} /><span>•</span><span>{course.durationHours}h estimadas</span>
                </div>
              </div>
              <button onClick={onClose} className="shrink-0 px-3 py-1.5 rounded-xl bg-sky-600 text-white text-sm">Cerrar</button>
            </div>
            <p className="opacity-80 mb-4">{course.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">{course.tags?.map((t: string) => <Tag key={t}>{t}</Tag>)}</div>
            <div className="flex items-center justify-between">
              <a href={course.url} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm">Ir al curso</a>
              <div className="text-xs opacity-60">Fuente: {course.provider}</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/********************
 * Pantallas de acceso
 ********************/
function GateScreen({ onUnlock }: { onUnlock: (code: string) => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-sky-50 to-white">
      <div className="w-[94vw] max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center text-xl">🏴‍☠️</div>
          <div>
            <div className="text-sm opacity-70">Portal interno</div>
            <h1 className="font-semibold">{BRAND.name}</h1>
          </div>
        </div>
        <p className="text-sm opacity-80 mb-4">Ingresá el <b>código de equipo</b> para acceder.</p>
        <input value={code} onChange={(e)=>setCode(e.target.value)} placeholder="Código de acceso" className="w-full px-3 py-2 rounded-xl border border-black/10 mb-2" />
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <button onClick={()=>{ if(!onUnlock(code)) setError("Código incorrecto"); }} className="w-full px-3 py-2 rounded-xl bg-sky-600 text-white">Desbloquear</button>
        <div className="text-xs opacity-60 mt-3">Tip: cambiá el código en la constante ACCESS_CODE.</div>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: (name: string)=>void }) {
  const [name, setName] = useState("");
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-sky-50 to-white">
      <div className="w-[94vw] max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center text-xl">🏴‍☠️</div>
          <h1 className="font-semibold">{BRAND.name}</h1>
        </div>
        <p className="text-sm opacity-80 mb-4">Elegí un <b>usuario</b> para guardar tu progreso en este navegador.</p>
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Tu nombre o alias" className="w-full px-3 py-2 rounded-xl border border-black/10 mb-3" />
        <button onClick={()=> onLogin(name)} className="w-full px-3 py-2 rounded-xl bg-sky-600 text-white">Entrar</button>
      </div>
    </div>
  );
}

/********************
 * App principal
 ********************/
export default function App() {
  const { user, ok, openGate, login, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [provider, setProvider] = useState(PROVIDERS[0]);
  const [level, setLevel] = useState(LEVELS[0]);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0].key);
  const [open, setOpen] = useState<any>(null);
  const { done, toggle } = useProgress(user);

  if (!ok) return <GateScreen onUnlock={(c)=>{return openGate(c);}} />;
  if (!user) return <LoginScreen onLogin={(n)=>{ if(login(n)){/* ok */} }} />;

  const filtered = useMemo(() => {
    let list = [...COURSES];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((c) => [c.title, c.description, ...(c.tags||[]), c.provider, c.category].join(" ").toLowerCase().includes(q));
    }
    if (category !== "Todos") list = list.filter((c) => c.category === category);
    if (provider !== "Todos") list = list.filter((c) => c.provider === provider);
    if (level !== "Todos") list = list.filter((c) => c.level === level);
    switch (sortBy) {
      case "rating": list.sort((a,b)=> b.rating - a.rating); break;
      case "duration": list.sort((a,b)=> b.durationHours - a.durationHours); break;
      default: list.sort((a,b)=> (b.free?1:0)-(a.free?1:0) || b.rating - a.rating);
    }
    return list;
  }, [query, category, provider, level, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50 text-black">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center text-lg">{BRAND.logo}</div>
            <span className="font-semibold">{BRAND.name}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 opacity-80 text-sm">
            <a href="#cursos" className="hover:opacity-100">Cursos</a>
            <a href="#equipo" className="hover:opacity-100">Equipo</a>
            <a href="#faq" className="hover:opacity-100">FAQ</a>
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <span className="opacity-80">Hola, <b>{user}</b></span>
            <button onClick={logout} className="px-3 py-1.5 rounded-xl border border-black/10">Salir</button>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 pt-10 pb-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
              Portal de Cursos del Equipo — {BRAND.name}
            </h1>
            <p className="opacity-80 mb-5">
              Seguridad, helpdesk, redes, hardware y Linux para crecer juntos. Todo curado, mayormente <b>gratis</b>.
            </p>
            <div className="flex items-center gap-2 text-sm opacity-70">
              <span>⭐ Catálogo verificado</span><span>•</span><span>Progreso por usuario</span><span>•</span><span>Acceso interno</span>
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
            <div className="text-sm font-medium mb-2">Buscá tu próximo curso</div>
            <div className="flex items-center gap-2">
              <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar por título, tema o tag" className="w-full px-3 py-2 rounded-xl border border-black/10 outline-none focus:ring-2 focus:ring-sky-200" />
              <button className="px-3 py-2 rounded-xl bg-sky-600 text-white">Buscar</button>
            </div>
            <div className="mt-3 text-xs opacity-70">Tip: probá "Linux", "SC‑900" o "Networking".</div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={()=>setCategory(c)} className={classNames("px-3 py-1.5 rounded-full border text-sm", c===category ? "bg-sky-600 text-white border-sky-600" : "bg-white/50 hover:bg-black/5 border-black/10")}>{c}</button>
          ))}
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div>
            <label className="text-xs block mb-1 opacity-70">Proveedor</label>
            <select value={provider} onChange={(e)=>setProvider(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-black/10 bg-white">{PROVIDERS.map(p=> <option key={p}>{p}</option>)}</select>
          </div>
          <div>
            <label className="text-xs block mb-1 opacity-70">Nivel</label>
            <select value={level} onChange={(e)=>setLevel(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-black/10 bg-white">{LEVELS.map(l=> <option key={l}>{l}</option>)}</select>
          </div>
          <div>
            <label className="text-xs block mb-1 opacity-70">Ordenar por</label>
            <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-black/10 bg-white">{SORT_OPTIONS.map(o=> <option key={o.key} value={o.key}>{o.label}</option>)}</select>
          </div>
        </div>
      </section>

      <section id="cursos" className="max-w-6xl mx-auto px-4 pb-10">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center mb-4">🔎</div>
            <h3 className="text-lg font-semibold mb-1">Sin resultados</h3>
            <p className="opacity-70 max-w-sm mx-auto">Ajustá filtros o probá otra palabra.</p>
          </div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filtered.map((c) => (
                <CourseCard key={c.id} course={c} onOpen={setOpen} checked={!!done[c.id]} onCheck={toggle} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <footer id="faq" className="py-10 border-t border-black/10 bg-white/60">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center text-xl mb-2">{BRAND.logo}</div>
            <p className="opacity-80 max-w-md">Este portal compila cursos gratuitos o freemium de proveedores reconocidos. Al hacer clic en "Ir al curso", se abre el sitio oficial.</p>
          </div>
          <div className="md:justify-self-end text-sm">
            <div className="font-medium mb-2">Preguntas frecuentes</div>
            <ul className="space-y-1 opacity-80 list-disc pl-5">
              <li>¿Acceso con contraseña? Sí: código de equipo configurable.</li>
              <li>¿Usuarios? Locales por navegador, sin backend.</li>
              <li>¿Progreso? Casillas por curso guardadas por usuario.</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-6 text-xs opacity-70">© {new Date().getFullYear()} {BRAND.name}. Sólo uso interno.</div>
      </footer>

      <DetailsModal course={open} onClose={()=>setOpen(null)} />
    </div>
  );
}
