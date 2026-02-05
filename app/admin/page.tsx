"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    XCircle,
    ExternalLink,
    Search,
    Filter,
    Clock,
    Eye,
    MoreVertical,
    RefreshCw,
    LogOut,
    User,
    Image as ImageIcon,
    FileText
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function AdminDashboard() {
    const [registros, setRegistros] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("todos");
    const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

    const fetchRegistros = async () => {
        setLoading(true);
        // NOTA: En producción, esto requiere auth.
        // Por ahora, traemos todo lo que el RLS permita (configurado para authenticated)
        const { data, error } = await supabase
            .from('RegistraYa_vcard_registros')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setRegistros(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchRegistros();
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from('RegistraYa_vcard_registros')
            .update({ status: newStatus })
            .eq('id', id);

        if (!error) {
            setRegistros(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
        } else {
            alert("Error al actualizar estado. Verifica tus permisos de Admin.");
        }
    };

    const filtered = registros.filter(r => {
        const matchesSearch = r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || r.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "todos" || r.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (loading && registros.length === 0) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-navy text-white p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black uppercase italic tracking-tighter">Admin Dashboard</h1>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-1">Gestión de vCards RegistraYa!</p>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={fetchRegistros} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                            <RefreshCw size={20} className={cn(loading && "animate-spin")} />
                        </button>
                        <div className="bg-primary px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-orange cursor-pointer">
                            Cerrar Sesión
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
                    {['todos', 'pendiente', 'pagado', 'entregado'].map(s => (
                        <div
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            className={cn(
                                "p-6 rounded-3xl border cursor-pointer transition-all",
                                statusFilter === s ? "bg-primary/10 border-primary" : "bg-white/5 border-white/10 hover:border-white/20"
                            )}
                        >
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">{s}</p>
                            <p className="text-3xl font-black">{registros.filter(r => s === 'todos' || r.status === s).length}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden">
                    <div className="p-8 border-b border-white/10 flex flex-col md:flex-row justify-between gap-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar por nombre o email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-16 py-4 outline-none focus:border-primary/40 transition-all font-bold"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black uppercase tracking-widest text-white/40 bg-white/[0.02]">
                                    <th className="px-8 py-6">Usuario</th>
                                    <th className="px-8 py-6">Plan</th>
                                    <th className="px-8 py-6">Comprobante</th>
                                    <th className="px-8 py-6">Estado</th>
                                    <th className="px-8 py-6">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {filtered.map((r) => (
                                    <tr key={r.id} className="hover:bg-white/[0.02] transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden flex items-center justify-center">
                                                    {r.foto_url ? <img src={r.foto_url} className="w-full h-full object-cover" /> : <User size={20} />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm">{r.nombre}</p>
                                                    <p className="text-[10px] text-white/40">{r.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={cn(
                                                "px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                                r.plan === 'pro' ? "bg-primary/20 text-primary" : "bg-white/10 text-white/40"
                                            )}>
                                                {r.plan}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            {r.comprobante_url ? (
                                                <button
                                                    onClick={() => setSelectedReceipt(r.comprobante_url)}
                                                    className="flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                                                >
                                                    <ImageIcon size={16} /> Ver Recibo
                                                </button>
                                            ) : (
                                                <span className="text-[10px] text-white/20 uppercase font-black">Sin Archivo</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className={cn(
                                                    "w-2 h-2 rounded-full",
                                                    r.status === 'pagado' ? "bg-accent" : r.status === 'pendiente' ? "bg-yellow-500" : "bg-white/20"
                                                )} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">
                                                    {r.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                {r.status === 'pendiente' && (
                                                    <button
                                                        onClick={() => updateStatus(r.id, 'pagado')}
                                                        className="p-3 bg-accent/20 text-accent rounded-xl hover:bg-accent transition-all hover:text-white"
                                                        title="Aprobar Pago"
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                )}
                                                <a
                                                    href={`/card/${r.slug || r.id}`}
                                                    target="_blank"
                                                    className="p-3 bg-white/5 text-white/40 rounded-xl hover:bg-white/10 hover:text-white transition-all"
                                                    title="Ver Perfil"
                                                >
                                                    <Eye size={18} />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal para ver comprobante */}
            <AnimatePresence>
                {selectedReceipt && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedReceipt(null)}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="max-w-4xl w-full bg-navy rounded-[48px] overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-8 border-b border-white/10 flex justify-between items-center">
                                <h3 className="text-xl font-black uppercase italic italic tracking-tighter">Comprobante de Pago</h3>
                                <button onClick={() => setSelectedReceipt(null)} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-white/40 hover:text-white">
                                    Cerrar
                                </button>
                            </div>
                            <div className="p-8 flex items-center justify-center min-h-[400px]">
                                {selectedReceipt.endsWith('.pdf') ? (
                                    <iframe src={selectedReceipt} className="w-full h-[600px] rounded-2xl" />
                                ) : (
                                    <img src={selectedReceipt} className="max-h-[600px] w-auto rounded-2xl shadow-2xl" />
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
