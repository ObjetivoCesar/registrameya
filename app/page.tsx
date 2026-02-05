"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, MessageSquare, ShieldCheck, Zap, ArrowRight, Smartphone, Search, Camera, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [clients, setClients] = useState(10);
  const [avgValue, setAvgValue] = useState(30);
  // Cálculo: Clientes * 12 meses * Valor * 0.4 (40% de pérdida por olvido)
  const annualLoss = Math.round(clients * 12 * avgValue * 0.4).toLocaleString();

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 scroll-smooth relative overflow-hidden">
      {/* Elementos vibrantes de fondo */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[60%] bg-primary/30 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-royal/20 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-accent/10 blur-[100px] rounded-full" />
      </div>
      {/* Navbar sutil */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-navy/5">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="text-xl md:text-2xl font-black tracking-tighter text-navy flex items-center gap-2">
            <span className="text-primary">!</span>Regístrame Ya
          </div>
          <a
            href="/registro"
            className="hidden md:flex bg-primary text-white px-6 py-2.5 rounded-button font-bold text-sm shadow-orange hover:scale-105 transition-transform"
          >
            Empezar ahora
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Decoración Background */}
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[80%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[60%] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-navy/5 shadow-soft mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-navy/60">Disponible en Ecuador</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-navy leading-[1.1] mb-8 tracking-tighter uppercase">
              Pierdes <span className="text-primary italic">4 de cada 10</span> trabajos solo porque te olvidan.
            </h1>

            <p className="text-lg md:text-xl text-navy/70 mb-10 leading-relaxed max-w-xl mx-auto lg:ml-0 font-medium">
              Eres excelente en lo que haces. Deja de ser un desconocido en la agenda de tus clientes. Aparece <span className="text-navy font-bold">con tu foto y especialidad</span> de inmediato.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/registro"
                className="bg-primary text-white px-10 py-5 rounded-button font-black text-lg shadow-orange flex items-center justify-center gap-3"
              >
                Quiero que me encuentren <ArrowRight size={20} />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-white text-navy px-8 py-5 rounded-button font-black text-lg border-2 border-navy/5 shadow-soft flex items-center justify-center gap-3"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-primary border-b-[6px] border-b-transparent ml-1" />
                </div>
                Ver Demo
              </motion.button>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-navy/50 text-xs font-bold uppercase tracking-widest pt-6">
              <ShieldCheck size={18} className="text-accent" /> Pago único · Sin App
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-cream bg-navy/10 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="avatar" />
                  </div>
                ))}
              </div>
              <p className="text-xs md:text-sm text-navy/60 font-black uppercase tracking-widest">
                <span className="text-navy">+200 Profesionales</span> ya registrados
              </p>
            </div>
          </motion.div>

          {/* Imagen Hero / Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative z-10 max-w-[450px] w-full">
              <Image
                src="/hero-person.png"
                alt="Especialista profesional"
                width={600}
                height={800}
                className="w-full h-auto drop-shadow-2xl hero-float"
                priority
              />
            </div>

            {/* Floatings */}
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/4 -left-4 md:-left-12 glass-card p-4 rounded-2xl z-20 flex items-center gap-4 border-primary/20"
            >
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">✅</div>
              <p className="text-xs font-black text-navy uppercase tracking-widest">¡Trabajo aceptado!</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Comparación Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-navy mb-6 tracking-tighter uppercase">
              ¿Por qué no te llaman de nuevo?
            </h2>
            <p className="text-lg md:text-xl text-navy/60 max-w-2xl mx-auto font-medium">
              No es por mal servicio. Es porque cuando buscan "Expertos" en su agenda, <span className="text-navy font-bold underline decoration-primary decoration-4">no saben quién eres tú</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch max-w-5xl mx-auto">
            {/* Antes */}
            <div className="bg-navy/5 p-10 rounded-[40px] border border-navy/5 flex flex-col items-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-8">El Olvido (Antes)</div>
              <div className="w-full max-w-[260px] bg-white rounded-[40px] border-[10px] border-navy shadow-xl p-6 min-h-[380px]">
                <div className="h-4 w-16 bg-navy/5 rounded-full mx-auto mb-8" />
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3 mb-4 opacity-20">
                    <div className="w-8 h-8 rounded-full bg-navy/10" />
                    <div className="h-2 w-20 bg-navy/10 rounded-full" />
                  </div>
                ))}
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-2xl border-2 border-red-100">
                  <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center text-lg">👷</div>
                  <div>
                    <p className="text-[10px] font-black text-navy italic">"Plomero" o "Juan"</p>
                    <p className="text-[8px] text-navy/40 font-bold uppercase tracking-widest">¿Cúal de todos era?</p>
                  </div>
                </div>
              </div>
              <p className="mt-8 text-navy/40 text-center font-black uppercase tracking-widest text-xs">Eres un número más</p>
            </div>

            {/* Después */}
            <div className="bg-primary/5 p-10 rounded-[40px] border border-primary/20 flex flex-col items-center relative">
              <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-8">Tu Marca (Después)</div>
              <div className="w-full max-w-[260px] bg-white rounded-[40px] border-[10px] border-navy shadow-orange p-6 min-h-[380px]">
                <div className="h-4 w-16 bg-navy/5 rounded-full mx-auto mb-8" />
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-4 border-4 border-cream shadow-lg overflow-hidden">
                    <img src="https://i.pravatar.cc/300?img=11" alt="pro" />
                  </div>
                  <h4 className="font-black text-navy leading-none">Manuel Pérez</h4>
                  <p className="text-[8px] font-black text-primary uppercase mt-1 tracking-widest">Plomero Maestro</p>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-cream rounded-xl flex items-center gap-3 border border-primary/10">
                    <MessageSquare size={14} className="text-primary" />
                    <div className="h-1.5 w-16 bg-primary/20 rounded-full" />
                  </div>
                  <div className="p-3 bg-cream rounded-xl flex items-center gap-3 border border-primary/10">
                    <Smartphone size={14} className="text-primary" />
                    <div className="h-1.5 w-20 bg-primary/20 rounded-full" />
                  </div>
                </div>
                <div className="mt-6 p-4 bg-primary text-white rounded-2xl text-center text-[10px] font-black uppercase tracking-widest shadow-orange">
                  Llamar ahora
                </div>
              </div>
              <p className="mt-8 text-primary text-center font-black uppercase tracking-widest text-xs">Imposible de olvidar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -10 }} className="glass-card p-10 rounded-card">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-soft">
                <Search className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-black text-navy mb-4 tracking-tighter uppercase">Buscan tu oficio y sales tú</h3>
              <p className="text-navy/60 leading-relaxed font-medium">
                Configuramos palabras clave estratégicas para que cuando busquen tu especialidad en su teléfono, aparezcas de primero.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="glass-card p-10 rounded-card border-primary/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 text-primary/5 group-hover:text-primary/10 transition-colors">
                <Camera size={80} />
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-soft relative z-10">
                <Camera className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-black text-navy mb-4 tracking-tighter uppercase relative z-10">Confianza al Instante</h3>
              <p className="text-navy/60 leading-relaxed font-medium relative z-10">
                Una foto profesional integrada hace que confíen en ti antes de hablarte. Te ves más pro y más confiable.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="glass-card p-10 rounded-card border-royal/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 text-royal/5 group-hover:text-royal/10 transition-colors">
                <Zap size={80} />
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-soft relative z-10">
                <Zap className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-black text-navy mb-4 tracking-tighter uppercase relative z-10">Galería Pro Incluida</h3>
              <p className="text-navy/60 leading-relaxed font-medium relative z-10">
                Muestra tus mejores 3 trabajos directamente en tu tarjeta. Tus clientes verán la calidad de lo que haces en segundos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sectores / Categorías Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-navy uppercase tracking-tighter italic">
              Especialistas que ya están ganando más
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {["🛠️ Restauración", "🎨 Pintura", "🔧 Taller Mecánico", "🔌 Electricidad", "🚿 Plomería", "🏗️ Albañilería", "🏥 Enfermería", "🧹 Limpieza"].map((cat) => (
              <motion.div
                key={cat}
                whileHover={{ scale: 1.05, backgroundColor: "#FF6B35", color: "#fff" }}
                className="px-6 py-4 rounded-2xl bg-cream text-navy font-black text-center border border-navy/5 shadow-soft transition-colors cursor-default text-sm flex items-center justify-center gap-2"
              >
                {cat}
              </motion.div>
            ))}
          </div>
          <p className="text-center mt-12 text-navy/40 font-bold uppercase tracking-widest text-xs">
            Si no ves tu sector, no te preocupes. Lo hacemos para <span className="text-navy">cualquier servicio</span>.
          </p>
        </div>
      </section>

      {/* Calculadora de Pérdidas */}
      <section className="py-24 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card p-8 md:p-16 rounded-[48px] border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-primary opacity-5 rotate-12 hidden lg:block">
              <Zap size={250} />
            </div>

            <div className="max-w-3xl relative z-10">
              <h2 className="text-4xl lg:text-7xl font-black text-navy mb-8 tracking-tighter uppercase">
                Calcula cuánto estás <span className="text-primary italic">dejando ir</span>
              </h2>
              <p className="text-xl text-navy/60 mb-12 font-medium">
                Si no estás en su agenda con marca personal, ese dinero se lo lleva tu competencia que sí lo está.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-10">
                  <div>
                    <div className="flex justify-between mb-4">
                      <p className="text-xs font-black text-navy/40 uppercase tracking-widest">¿Cuántos Clientes te llaman al mes?</p>
                      <span className="text-primary font-black">{clients}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={clients}
                      onChange={(e) => setClients(parseInt(e.target.value))}
                      className="w-full h-3 bg-navy/5 rounded-full appearance-none accent-primary cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-4">
                      <p className="text-xs font-black text-navy/40 uppercase tracking-widest">Valor de tu servicio (Promedio)</p>
                      <span className="text-primary font-black">${avgValue}</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={avgValue}
                      onChange={(e) => setAvgValue(parseInt(e.target.value))}
                      className="w-full h-3 bg-navy/5 rounded-full appearance-none accent-primary cursor-pointer"
                    />
                  </div>
                </div>

                <div className="bg-navy p-12 rounded-[40px] text-center text-white shadow-orange relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-4">Pérdida Anual Estimada</p>
                  <p className="text-7xl font-black text-primary mb-6">${annualLoss}</p>
                  <p className="text-xs font-bold opacity-70 leading-relaxed italic border-t border-white/5 pt-6">
                    "Recuperas los $10 de hoy con el primer cliente que sí te encuentre mañana."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precios" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-7xl font-black text-navy mb-6 tracking-tighter uppercase italic">
              Planes Profesionales
            </h2>
            <p className="text-xl text-navy/60 max-w-2xl mx-auto font-medium">
              Inversión única. Resultados para siempre.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Básico */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white border-4 border-navy/5 p-12 rounded-[40px] flex flex-col shadow-soft"
            >
              <h3 className="text-xl font-black text-navy/30 uppercase tracking-[0.2em] mb-4">Básico</h3>
              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-6xl font-black text-navy">$10</span>
                <span className="text-navy/30 font-black uppercase text-sm tracking-widest">Pago Único</span>
              </div>
              <ul className="space-y-5 mb-12 flex-grow">
                {["vCard Estratégica", "Tu Foto de Perfil", "Categoría de Búsqueda", "Historial de Llamadas", "Entrega en 1 hora"].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-navy/70 font-bold">
                    <CheckCircle className="text-accent" size={20} /> {item}
                  </li>
                ))}
              </ul>
              <a href="/registro" className="w-full py-5 bg-navy/5 text-navy font-black rounded-button text-center hover:bg-navy/10 transition-all uppercase tracking-widest text-sm">
                Elegir Básico
              </a>
            </motion.div>

            {/* Pro */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white border-4 border-primary p-12 rounded-[40px] flex flex-col relative shadow-orange"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">Más Recomendado</div>
              <h3 className="text-xl font-black text-primary uppercase tracking-[0.2em] mb-4">Pro</h3>
              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-6xl font-black text-navy">$20</span>
                <span className="text-navy/30 font-black uppercase text-sm tracking-widest">Pago Único</span>
              </div>
              <ul className="space-y-5 mb-12 flex-grow">
                {["Todo lo del Básico", "Código QR para Imprimir", "Galería de 3 Fotos de Trabajos", "Botón de WhatsApp Directo", "Diseño Premium Personalizado", "Soporte Prioritario"].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-navy font-black">
                    <CheckCircle className="text-primary" size={20} /> {item}
                  </li>
                ))}
              </ul>
              <a href="/registro" className="w-full py-5 bg-primary text-white font-black rounded-button shadow-orange text-center hover:bg-primary-dark transition-all uppercase tracking-widest text-sm">
                Elegir Pro y Crear Mi Contacto
              </a>
            </motion.div>
          </div>

          <div className="mt-20 text-center">
            <div className="inline-flex flex-wrap justify-center gap-8 items-center text-navy/30 font-black uppercase text-[10px] tracking-[0.2em]">
              <span className="flex items-center gap-2 grayscale"><ShieldCheck size={16} /> Pago SSL Seguro</span>
              <span className="flex items-center gap-2 grayscale"><Smartphone size={16} /> Sin mensualidades</span>
              <span className="flex items-center gap-2 grayscale"><Zap size={16} /> Listo en 60 mins</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-navy uppercase tracking-tighter italic">Preguntas Comunes</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "¿Tengo que seguir pagando después?", a: "Absolutamente no. Pagas una vez $10 o $20 y tienes tu contacto profesional para siempre. Sin mensualidades, sin trucos." },
              { q: "¿Cómo lo recibo?", a: "En exactamente 1 hora desde que confirmas tu pago, te enviamos un enlace a tu WhatsApp o correo con tu vCard y tu QR manual. Listo para usar." },
              { q: "¿Y si no sé nada de tecnología?", a: "No necesitas saber nada. Nosotros hacemos todo el trabajo pesado por ti. Tú solo nos pasas tus datos y listo." },
              { q: "¿Sirve para Android y iPhone?", a: "Sí, funciona perfectamente en todos los celulares modernos. Es tecnología nativa." }
            ].map((item, i) => (
              <details key={i} className="group glass-card rounded-3xl p-8 cursor-pointer border-navy/5">
                <summary className="flex items-center justify-between font-black text-navy list-none text-lg">
                  {item.q}
                  <ChevronRight size={24} className="group-open:rotate-90 transition-transform text-primary" />
                </summary>
                <p className="mt-6 text-navy/60 leading-relaxed font-bold">
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 p-8 bg-white rounded-[32px] shadow-soft border-2 border-primary/10">
              <div className="w-14 h-14 bg-accent/20 text-accent rounded-full flex items-center justify-center">
                <ShieldCheck size={32} />
              </div>
              <div className="text-left">
                <p className="font-black text-navy text-xl leading-none uppercase tracking-tighter">Garantía Total</p>
                <p className="text-[10px] text-navy/40 mt-1 uppercase font-black tracking-widest">Si no está en 60 min, no pagas nada.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-cream border-t border-navy/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-2xl font-black text-navy tracking-tighter">
            <span className="text-primary">!</span>Regístrame Ya
          </div>
          <p className="text-sm text-navy/30 font-black uppercase tracking-[0.2em]">© 2026 · Profesionales en Acción</p>
          <div className="flex gap-8 text-[10px] font-black text-navy/50 uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-primary transition-colors">Términos</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">Soporte</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
