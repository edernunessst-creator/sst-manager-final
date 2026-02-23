/**
 * @license
* SPDX-License-Identifier: Apache-2.0
*/

import { useState } from "react";
import { motion } from "framer-motion";
  MapPin, 
  User, 
  AlertTriangle, 
  History,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ChevronRight,
  ChevronLeft,
  ShieldAlert,
  BarChart3,
  TrendingUp,
  Target,
  ArrowUpRight,
  Plus,
  Camera,
  X,
  ClipboardList,
  ArrowRight,
  Filter,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE CLIENT ---
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- CONSTANTES E TIPOS ---

const CATEGORIAS_TECNICAS = [
  "Máquinas e Equipamentos",
  "Ergonomia",
  "Comportamental",
  "Ambiente / Organização",
  "Gestão / Organizacional",
  "Agentes Físicos",
  "Agentes Químicos",
  "Processo Operacional",
  "Tráfego Interno"
];

const SUBCATEGORIAS_MAP: Record<string, string[]> = {
  "Máquinas e Equipamentos": [
    "Dispositivo de segurança removido ou inoperante",
    "Intertravamento inativo",
    "Proteção fixa ausente",
    "Proteção móvel sem sensor funcional",
    "Botão de emergência inoperante",
    "Falha no sistema de parada de emergência",
    "Ausência de bloqueio e etiquetagem (LOTO)",
    "Máquina operando fora da especificação",
    "Manutenção corretiva recorrente (falha crônica)",
    "Modificação não autorizada em equipamento",
    "Sensor descalibrado",
    "Painel elétrico sem fechamento adequado",
    "Falta de aterramento",
    "Equipamento improvisado",
    "Falha na inspeção preventiva"
  ],
  "Ergonomia": [
    "Postura inadequada por layout inadequado",
    "Bancada fora da altura recomendada",
    "Movimentação manual excessiva de carga",
    "Giro de tronco repetitivo",
    "Alcance acima da zona confortável",
    "Ciclo repetitivo sem pausa adequada",
    "Ritmo de produção incompatível",
    "Assento sem regulagem",
    "Vibração excessiva",
    "Ferramenta sem adequação ergonômica",
    "Transporte manual acima do limite recomendado",
    "Iluminação inadequada para atividade fina"
  ],
  "Comportamental": [
    "Exposição ao risco",
    "Não utilização de EPI",
    "Uso inadequado de EPI",
    "Desvio do procedimento operacional",
    "Variabilidade operacional não autorizada",
    "Tomada de decisão fora do padrão seguro",
    "Comunicação ineficaz de risco",
    "Falha na percepção situacional",
    "Pressão produtiva influenciando decisão",
    "Operação simultânea sem coordenação"
  ],
  "Ambiente / Organização": [
    "Piso irregular",
    "Piso escorregadio",
    "Obstrução de rota de fuga",
    "Iluminação insuficiente",
    "Iluminação ofuscante",
    "Extintor obstruído",
    "Sinalização ausente",
    "Sinalização ilegível",
    "Materiais armazenados inadequadamente",
    "Cabos elétricos expostos",
    "Desorganização de área",
    "Resíduos fora de segregação",
    "Desnível sem proteção",
    "Ventilação insuficiente"
  ],
  "Gestão / Organizacional": [
    "Procedimento inexistente",
    "Procedimento desatualizado",
    "APR não elaborada",
    "Permissão de trabalho ausente",
    "Treinamento vencido",
    "ASO vencido",
    "Falha na comunicação interna",
    "Falta de supervisão",
    "Indicadores não monitorados",
    "Plano de ação vencido",
    "Reincidência sem ação corretiva",
    "Falta de recursos para controle",
    "Pressão produtiva impactando segurança"
  ],
  "Agentes Físicos": [
    "Ruído acima do limite",
    "Vibração excessiva",
    "Calor excessivo",
    "Radiação não ionizante",
    "Umidade excessiva"
  ],
  "Agentes Químicos": [
    "Produto sem identificação",
    "FDS ausente",
    "Armazenamento incompatível",
    "Vazamento",
    "Recipiente improvisado",
    "Falta de contenção secundária",
    "Manipulação sem EPI adequado",
    "Inalação potencial",
    "Ausência de ventilação localizada",
    "Mistura indevida de substâncias",
    "Falta de kit de emergência química",
    "Descarte inadequado"
  ],
  "Processo Operacional": [
    "Etapa crítica sem controle",
    "Sequência operacional alterada",
    "Falha na checagem pré-operacional",
    "Atividade simultânea conflitante",
    "Falta de validação antes de energização",
    "Comunicação falha entre turnos",
    "Mudança não gerenciada",
    "Procedimento não seguido",
    "Falta de inspeção periódica",
    "Atividade improvisada"
  ],
  "Tráfego Interno": [
    "Empilhadeira em velocidade excessiva",
    "Pedestre em área não segregada",
    "Ausência de segregação física",
    "Cruzamento sem espelho convexo",
    "Falta de sinalização horizontal",
    "Falta de sinalização vertical",
    "Transporte de carga instável",
    "Estacionamento irregular",
    "Iluminação insuficiente em rota",
    "Manobra em área restrita sem apoio",
    "Uso de celular durante condução",
    "Falta de habilitação interna"
  ]
};

const SETORES = [
  "Pintura", "ASU Tubo loose", "ASU Capa", "ASU teste", "Drop extrusora", 
  "Drop bobina", "Drop teste", "UTP Trefilação", "UTP Banchers / monotorção", 
  "UTP Capa", "UTP fracionadora / embalagem", "AQ", "Expedição", 
  "Almoxarifado", "Manutenção mecânica", "Manutenção elétrica", 
  "Manutenção predial", "RH / Corporativo SGI", "Engenharia", "SST"
];

const TURNOS = ["Turno A", "Turno B", "Turno C", "Turno D", "Comercial"];
const LIDERANÇAS = ["Ismael", "Leonardo", "Edgard", "Ramon", "Danilo", "Ana Abel", "Alexandre"];

interface PlanoDeAcao {
  id: string;
  descricaoAcao: string;
  responsavel: string;
  prazo: string;
  status: 'Aberto' | 'Em Andamento' | 'Concluído';
  dataConclusao?: string;
  evidenciaFinal?: string;
}

interface Desvio {
  id: string;
  categoria: string;
  subcategoria: string;
  descricaoComplementar: string;
  foto?: string;
  probabilidade: number;
  severidade: number;
  pesoTecnicoW: number;
  justificativaW: string;
  score: number;
  classificacao: 'Baixo' | 'Médio' | 'Alto' | 'Crítico';
  responsavel: string;
  prazo: string;
  status: 'Aberto' | 'Em Tratamento' | 'Fechado';
  planoDeAcao: PlanoDeAcao;
}

interface Inspecao {
  id: string;
  data_hora: string;
  setor: string;
  turno: string;
  lider: string;
  usuario_responsavel: string;
  desvios: Desvio[];
  created_at: string;
}

// --- COMPONENTES AUXILIARES ---

const BadgeClassificacao = ({ classificacao }: { classificacao: string }) => {
  const styles: Record<string, string> = {
    'Baixo': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Médio': 'bg-amber-100 text-amber-700 border-amber-200',
    'Alto': 'bg-orange-100 text-orange-700 border-orange-200',
    'Crítico': 'bg-red-100 text-red-700 border-red-200 animate-pulse'
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[classificacao] || ''}`}>
      {classificacao}
    </span>
  );
};

// --- APP PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'form' | 'dashboard'>('form');
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [inspecoes, setInspecoes] = useState<Inspecao[]>([]);
  const [expandedCats, setExpandedCats] = useState<string[]>([]);
  const [modalDesvio, setModalDesvio] = useState<{ cat: string, sub: string } | null>(null);
  const [showMethodology, setShowMethodology] = useState(false);
  const [selectedInspecao, setSelectedInspecao] = useState<Inspecao | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [headerData, setHeaderData] = useState({
    data: new Date().toISOString().split('T')[0],
    setor: '',
    turno: '',
    lider: ''
  });
  const [currentDesvios, setCurrentDesvios] = useState<Desvio[]>([]);

  // Modal State para novo desvio
  const [tempDesvio, setTempDesvio] = useState<Partial<Desvio>>({
    probabilidade: 1,
    severidade: 1,
    pesoTecnicoW: 1,
    justificativaW: '',
    descricaoComplementar: '',
    responsavel: '',
    prazo: '',
    planoDeAcao: {
      id: '',
      descricaoAcao: '',
      responsavel: '',
      prazo: '',
      status: 'Aberto'
    }
  });

  // Dashboard Filters
  const [filterPeriod, setFilterPeriod] = useState({ start: '', end: '' });

  useEffect(() => {
    const fetchInspecoes = async () => {
      const { data, error } = await supabase
        .from('inspecoes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Erro ao buscar inspeções:", error);
      } else if (data) {
        setInspecoes(data);
      }
    };

    fetchInspecoes();

    // Realtime Subscription
    const channel = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', table: 'inspecoes', schema: 'public' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setInspecoes(prev => {
              if (prev.some(ins => ins.id === payload.new.id)) return prev;
              return [payload.new as Inspecao, ...prev];
            });
          } else if (payload.eventType === 'UPDATE') {
            setInspecoes(prev => prev.map(ins => ins.id === payload.new.id ? payload.new as Inspecao : ins));
          } else if (payload.eventType === 'DELETE') {
            setInspecoes(prev => prev.filter(ins => ins.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getClassificacao = (score: number): Desvio['classificacao'] => {
    if (score <= 6) return 'Baixo';
    if (score <= 18) return 'Médio';
    if (score <= 36) return 'Alto';
    return 'Crítico';
  };

  const handleOpenModal = (cat: string, sub: string) => {
    setModalDesvio({ cat, sub });
    setTempDesvio({
      probabilidade: 1,
      severidade: 1,
      pesoTecnicoW: 1,
      justificativaW: '',
      descricaoComplementar: '',
      responsavel: '',
      prazo: '',
      planoDeAcao: {
        id: crypto.randomUUID(),
        descricaoAcao: '',
        responsavel: '',
        prazo: '',
        status: 'Aberto'
      }
    });
  };

  const saveDesvio = () => {
    if (!tempDesvio.justificativaW || !tempDesvio.responsavel || !tempDesvio.prazo || !tempDesvio.planoDeAcao?.descricaoAcao) {
      alert("Por favor, preencha todos os campos obrigatórios, incluindo a justificativa do W e a descrição da ação.");
      return;
    }

    const score = (tempDesvio.probabilidade || 1) * (tempDesvio.severidade || 1) * (tempDesvio.pesoTecnicoW || 1);
    
    const newDesvio: Desvio = {
      id: crypto.randomUUID(),
      categoria: modalDesvio!.cat,
      subcategoria: modalDesvio!.sub,
      descricaoComplementar: tempDesvio.descricaoComplementar || '',
      probabilidade: tempDesvio.probabilidade || 1,
      severidade: tempDesvio.severidade || 1,
      pesoTecnicoW: tempDesvio.pesoTecnicoW || 1,
      justificativaW: tempDesvio.justificativaW || '',
      score,
      classificacao: getClassificacao(score),
      responsavel: tempDesvio.responsavel || '',
      prazo: tempDesvio.prazo || '',
      status: 'Aberto',
      planoDeAcao: {
        ...tempDesvio.planoDeAcao!,
        responsavel: tempDesvio.responsavel || '', // Por padrão, o mesmo do desvio
        prazo: tempDesvio.prazo || '' // Por padrão, o mesmo do desvio
      } as PlanoDeAcao
    };

    setCurrentDesvios([...currentDesvios, newDesvio]);
    setModalDesvio(null);
  };

  const finalizeInspecao = async () => {
    setSubmitting(true);
    try {
      const novaInspecao: Inspecao = {
        id: crypto.randomUUID(),
        data_hora: new Date(headerData.data).toISOString(),
        setor: headerData.setor,
        turno: headerData.turno,
        lider: headerData.lider,
        usuario_responsavel: headerData.lider, // Simplificado para o protótipo
        desvios: currentDesvios,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('inspecoes')
        .insert([novaInspecao])
        .select();

      if (error) {
        alert('ERRO DO SUPABASE: ' + error.message);
        console.error(error);
        return;
      }

      if (data && data.length > 0) {
        setInspecoes(prev => [data[0] as Inspecao, ...prev]);
      }

      // Reset
      setCurrentDesvios([]);
      setFormStep(1);
      setHeaderData({
        data: new Date().toISOString().split('T')[0],
        setor: '',
        turno: '',
        lider: ''
      });
      setActiveTab('dashboard');
    } catch (err: any) {
      alert('ERRO INESPERADO: ' + err.message);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // KPIs
  const stats = useMemo(() => {
    const filtered = inspecoes.filter(ins => {
      if (!filterPeriod.start && !filterPeriod.end) return true;
      const d = new Date(ins.data_hora);
      const s = filterPeriod.start ? new Date(filterPeriod.start) : new Date(0);
      const e = filterPeriod.end ? new Date(filterPeriod.end) : new Date();
      e.setHours(23, 59, 59);
      return d >= s && d <= e;
    });

    const totalIns = filtered.length;
    const insComDesvio = filtered.filter(i => i.desvios.length > 0).length;
    const percComDesvio = totalIns > 0 ? (insComDesvio / totalIns) * 100 : 0;

    let totalScore = 0;
    let totalDesvios = 0;
    let planosConcluidos = 0;
    let planosNoPrazo = 0;
    let totalPlanos = 0;
    const catCount: Record<string, number> = {};
    const leaderStats: Record<string, { totalDesvios: number, totalScore: number, totalIns: number }> = {};

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    filtered.forEach(ins => {
      if (!leaderStats[ins.lider]) {
        leaderStats[ins.lider] = { totalDesvios: 0, totalScore: 0, totalIns: 0 };
      }
      leaderStats[ins.lider].totalIns++;

      ins.desvios.forEach(d => {
        totalScore += d.score;
        totalDesvios++;
        catCount[d.categoria] = (catCount[d.categoria] || 0) + 1;
        
        leaderStats[ins.lider].totalDesvios++;
        leaderStats[ins.lider].totalScore += d.score;

        // Planos de Ação
        if (d.planoDeAcao) {
          totalPlanos++;
          const prazo = new Date(d.planoDeAcao.prazo);
          if (d.planoDeAcao.status === 'Concluído') {
            planosConcluidos++;
            if (d.planoDeAcao.dataConclusao) {
              const conclusao = new Date(d.planoDeAcao.dataConclusao);
              if (conclusao <= prazo) planosNoPrazo++;
            } else {
              planosNoPrazo++; // Se não tem data mas tá concluído, assume no prazo no protótipo
            }
          } else {
            // Se não concluído, checar se está no prazo em relação a hoje
            if (today <= prazo) planosNoPrazo++;
          }
        }
      });
    });

    const avgCriticidade = totalDesvios > 0 ? totalScore / totalDesvios : 0;
    const percPlanosNoPrazo = totalPlanos > 0 ? (planosNoPrazo / totalPlanos) * 100 : 0;

    return { totalIns, percComDesvio, avgCriticidade, totalDesvios, catCount, leaderStats, totalPlanos, planosConcluidos, percPlanosNoPrazo };
  }, [inspecoes, filterPeriod]);

  const updatePlanoStatus = async (inspecaoId: string, desvioId: string, newStatus: PlanoDeAcao['status']) => {
    let novaListaDeDesvios: Desvio[] = [];
    const novas = inspecoes.map(ins => {
      if (ins.id === inspecaoId) {
        novaListaDeDesvios = ins.desvios.map(d => {
          if (d.id === desvioId) {
            return {
              ...d,
              planoDeAcao: {
                ...d.planoDeAcao,
                status: newStatus,
                dataConclusao: newStatus === 'Concluído' ? new Date().toISOString() : undefined
              }
            };
          }
          return d;
        });
        return {
          ...ins,
          desvios: novaListaDeDesvios
        };
      }
      return ins;
    });

    const { error } = await supabase
      .from('inspecoes')
      .update({ desvios: novaListaDeDesvios })
      .eq('id', inspecaoId);

    if (error) {
      console.error("Erro ao atualizar status do plano:", error);
      alert("Erro ao sincronizar atualização com o banco de dados.");
    } else {
      setInspecoes(novas);
      // Atualizar modal selecionado se aberto
      if (selectedInspecao?.id === inspecaoId) {
        setSelectedInspecao(novas.find(i => i.id === inspecaoId) || null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20">
      {/* Header Fixo */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-xl">
              <ShieldAlert className="text-emerald-400 w-5 h-5" />
            </div>
            <div>
              <h1 className="font-black text-lg leading-tight tracking-tight">SST <span className="text-emerald-600">PRO</span></h1>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">Risk Management System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'form' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Inspeção
            </button>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'dashboard' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        <AnimatePresence mode="wait">
          {activeTab === 'form' ? (
            <motion.div 
              key="form-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {formStep === 1 ? (
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden">
                  <div className="p-10 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Nova Inspeção Técnica</h2>
                    <p className="text-slate-500 mt-2 font-medium">Identifique o local e a liderança responsável pela área.</p>
                  </div>
                  <div className="p-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Data da Ronda</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                          <input 
                            type="date" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 font-bold outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            value={headerData.data}
                            onChange={e => setHeaderData({...headerData, data: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Setor Industrial</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                          <select 
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 font-bold outline-none focus:ring-2 focus:ring-emerald-500 appearance-none transition-all"
                            value={headerData.setor}
                            onChange={e => setHeaderData({...headerData, setor: e.target.value})}
                          >
                            <option value="">Selecione o Setor</option>
                            {SETORES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Turno</label>
                        <select 
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 font-bold outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                          value={headerData.turno}
                          onChange={e => setHeaderData({...headerData, turno: e.target.value})}
                        >
                          <option value="">Selecione o Turno</option>
                          {TURNOS.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Líder da Área</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                          <select 
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 font-bold outline-none focus:ring-2 focus:ring-emerald-500 appearance-none transition-all"
                            value={headerData.lider}
                            onChange={e => setHeaderData({...headerData, lider: e.target.value})}
                          >
                            <option value="">Selecione o Líder</option>
                            {LIDERANÇAS.map(l => <option key={l} value={l}>{l}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                    <button 
                      disabled={!headerData.setor || !headerData.turno || !headerData.lider}
                      onClick={() => setFormStep(2)}
                      className="w-full bg-slate-900 text-white font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-3 hover:bg-slate-800 transition-all disabled:opacity-50 shadow-xl shadow-slate-200"
                    >
                      Iniciar Auditoria de Campo <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Header de Resumo da Inspeção */}
                  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-100 p-3 rounded-2xl">
                        <ClipboardList className="text-emerald-600 w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900">{headerData.setor}</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{headerData.turno} • {headerData.lider}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Desvios Registrados</p>
                      <p className="text-2xl font-black text-emerald-600">{currentDesvios.length}</p>
                    </div>
                  </div>

                  {/* Accordion de Categorias */}
                  <div className="space-y-3">
                    {CATEGORIAS_TECNICAS.map((cat) => {
                      const isOpen = expandedCats.includes(cat);
                      const catDesvios = currentDesvios.filter(d => d.categoria === cat);
                      
                      return (
                        <div key={cat} className="bg-white rounded-[1.5rem] shadow-sm border border-slate-200 overflow-hidden">
                          <button 
                            onClick={() => setExpandedCats(isOpen ? expandedCats.filter(c => c !== cat) : [...expandedCats, cat])}
                            className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-2 h-2 rounded-full ${catDesvios.length > 0 ? 'bg-red-500 animate-pulse' : 'bg-slate-200'}`} />
                              <span className="font-black text-slate-700 uppercase tracking-wider text-xs">{cat}</span>
                              {catDesvios.length > 0 && (
                                <span className="bg-red-100 text-red-700 text-[10px] font-black px-2 py-0.5 rounded-lg">
                                  {catDesvios.length}
                                </span>
                              )}
                            </div>
                            <ChevronRight className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} size={18} />
                          </button>
                          
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden bg-slate-50/50"
                              >
                                <div className="p-4 grid grid-cols-1 gap-2">
                                  {SUBCATEGORIAS_MAP[cat].map(sub => (
                                    <button 
                                      key={sub}
                                      onClick={() => handleOpenModal(cat, sub)}
                                      className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group"
                                    >
                                      <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{sub}</span>
                                      <Plus size={16} className="text-slate-300 group-hover:text-emerald-500" />
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  {/* Lista de Desvios Atuais */}
                  {currentDesvios.length > 0 && (
                    <div className="mt-10 space-y-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Desvios Identificados nesta Ronda</h4>
                      {currentDesvios.map((d, idx) => (
                        <div key={d.id} className="bg-white p-6 rounded-[1.5rem] border-l-4 border-l-red-500 shadow-sm border border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="bg-red-50 p-3 rounded-xl">
                              <AlertTriangle className="text-red-600 w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d.categoria}</p>
                              <h4 className="font-bold text-slate-800">{d.subcategoria}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <BadgeClassificacao classificacao={d.classificacao} />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score: {d.score}</span>
                              </div>
                            </div>
                          </div>
                          <button 
                            onClick={() => setCurrentDesvios(currentDesvios.filter(item => item.id !== d.id))}
                            className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-4 pt-8">
                    <button onClick={() => setFormStep(1)} className="flex-1 bg-white border border-slate-200 text-slate-600 font-black py-5 rounded-[1.5rem] hover:bg-slate-50 transition-all">
                      Voltar
                    </button>
                    <button 
                      onClick={finalizeInspecao}
                      className="flex-[2] bg-emerald-600 text-white font-black py-5 rounded-[1.5rem] hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                    >
                      Finalizar Inspeção Técnica
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="dashboard-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              {/* Filtros Dashboard */}
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Filter size={18} className="text-emerald-600" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Filtros Estratégicos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input 
                      type="date"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                      value={filterPeriod.start}
                      onChange={e => setFilterPeriod({...filterPeriod, start: e.target.value})}
                    />
                    <span className="text-slate-300 font-bold">→</span>
                    <input 
                      type="date"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                      value={filterPeriod.end}
                      onChange={e => setFilterPeriod({...filterPeriod, end: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setShowMethodology(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 hover:bg-emerald-100 transition-all"
                  >
                    <ClipboardList size={14} />
                    Metodologia de Cálculo
                  </button>
                  <button 
                    onClick={() => {
                      if(confirm("Limpar base de dados local?")) {
                        localStorage.removeItem('sst_inspecoes_v3');
                        setInspecoes([]);
                      }
                    }}
                    className="text-[10px] font-black text-red-400 uppercase tracking-widest hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
                  >
                    Limpar Base
                  </button>
                </div>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 relative overflow-hidden group">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Criticidade Média</p>
                  <div className="flex items-end gap-2">
                    <p className="text-4xl font-black text-slate-900">{stats.avgCriticidade.toFixed(1)}</p>
                    <BadgeClassificacao classificacao={getClassificacao(stats.avgCriticidade)} />
                  </div>
                  <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(stats.avgCriticidade / 48) * 100}%` }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">% Inspeções c/ Desvio</p>
                  <p className="text-4xl font-black text-slate-900">{stats.percComDesvio.toFixed(1)}%</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-2">Ref. Mercado: 22%</p>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total de Desvios</p>
                  <p className="text-4xl font-black text-red-600">{stats.totalDesvios}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-2">Aguardando tratativa</p>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Planos no Prazo</p>
                  <div className="flex items-end gap-2">
                    <p className={`text-4xl font-black ${stats.percPlanosNoPrazo >= 90 ? 'text-emerald-600' : 'text-amber-500'}`}>
                      {stats.percPlanosNoPrazo.toFixed(0)}%
                    </p>
                    <span className="text-[10px] font-bold text-slate-400 mb-1.5">{stats.planosConcluidos}/{stats.totalPlanos}</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 mt-2 flex items-center gap-1">
                    <Clock size={12} /> Meta: 100%
                  </p>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Auditorias Realizadas</p>
                  <p className="text-4xl font-black text-slate-900">{stats.totalIns}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-2">Meta Mensal: 45</p>
                </div>
              </div>

              {/* Ranking por Categoria e Desempenho Líder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                  <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                    <BarChart3 size={16} className="text-emerald-600" /> Ranking de Desvios por Categoria
                  </h3>
                  <div className="space-y-6">
                    {Object.entries(stats.catCount as Record<string, number>)
                      .sort((a, b) => (b[1] as number) - (a[1] as number))
                      .map(([cat, count], idx) => (
                        <div key={cat} className="space-y-2">
                          <div className="flex justify-between items-center text-xs font-bold">
                            <span className="text-slate-600">{cat}</span>
                            <span className="text-slate-900">{count} desvios</span>
                          </div>
                          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(count / (stats.totalDesvios || 1)) * 100}%` }}
                              className="h-full bg-slate-900 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                  <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                    <User size={16} className="text-emerald-600" /> Desempenho por Liderança
                  </h3>
                  <div className="space-y-6">
                    {Object.entries(stats.leaderStats as Record<string, { totalDesvios: number, totalScore: number, totalIns: number }>)
                      .sort((a, b) => a[1].totalDesvios - b[1].totalDesvios) // Menos desvios primeiro
                      .map(([leader, data], idx) => {
                        const avgScore = data.totalDesvios > 0 ? data.totalScore / data.totalDesvios : 0;
                        return (
                          <div key={leader} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-md transition-all">
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[10px] font-black text-slate-400 border border-slate-200">
                                {idx + 1}
                              </div>
                              <div>
                                <h4 className="font-black text-slate-800 text-sm">{leader}</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                  {data.totalIns} Inspeções • {data.totalDesvios} Desvios
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Criticidade Média</p>
                              <div className="flex items-center justify-end gap-2">
                                <span className="text-sm font-black text-slate-900">{avgScore.toFixed(1)}</span>
                                <BadgeClassificacao classificacao={getClassificacao(avgScore)} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Histórico Estratégico */}
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs flex items-center gap-2">
                    <History size={16} className="text-emerald-600" /> Histórico de Auditorias Técnicas
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <tr>
                        <th className="px-8 py-5">Data</th>
                        <th className="px-8 py-5">Setor</th>
                        <th className="px-8 py-5">Desvios</th>
                        <th className="px-8 py-5">Criticidade</th>
                        <th className="px-8 py-5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {inspecoes.map(ins => {
                        const maxScore = ins.desvios.length > 0 ? Math.max(...ins.desvios.map(d => d.score)) : 0;
                        return (
                          <tr 
                            key={ins.id} 
                            onClick={() => setSelectedInspecao(ins)}
                            className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                          >
                            <td className="px-8 py-6 text-xs font-bold text-slate-500">{new Date(ins.data_hora).toLocaleDateString('pt-BR')}</td>
                            <td className="px-8 py-6 text-xs font-black text-slate-900">{ins.setor}</td>
                            <td className="px-8 py-6">
                              <span className={`text-xs font-black ${ins.desvios.length > 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                                {ins.desvios.length} Ocorrências
                              </span>
                            </td>
                            <td className="px-8 py-6">
                              {ins.desvios.length > 0 ? <BadgeClassificacao classificacao={getClassificacao(maxScore)} /> : <span className="text-[10px] font-bold text-slate-300">N/A</span>}
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                                <CheckCircle2 size={12} /> 
                                <span>Auditado</span>
                                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0" />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modal de Registro de Desvio */}
      <AnimatePresence>
        {modalDesvio && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1">{modalDesvio.cat}</p>
                  <h3 className="text-xl font-black text-slate-900">{modalDesvio.sub}</h3>
                </div>
                <button onClick={() => setModalDesvio(null)} className="p-2 hover:bg-slate-200 rounded-full transition-all">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
                {/* Avaliação de Risco */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <ShieldAlert size={14} className="text-emerald-600" /> Avaliação de Risco PxSxW
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Probabilidade (P)</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                        value={tempDesvio.probabilidade}
                        onChange={e => setTempDesvio({...tempDesvio, probabilidade: Number(e.target.value)})}
                      >
                        <option value={1}>1 - Raro</option>
                        <option value={2}>2 - Possível</option>
                        <option value={3}>3 - Frequente</option>
                        <option value={4}>4 - Muito Frequente</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Severidade (S)</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                        value={tempDesvio.severidade}
                        onChange={e => setTempDesvio({...tempDesvio, severidade: Number(e.target.value)})}
                      >
                        <option value={1}>1 - Leve</option>
                        <option value={2}>2 - Moderada</option>
                        <option value={3}>3 - Grave</option>
                        <option value={4}>4 - Catastrófica</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Peso Técnico (W)</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                        value={tempDesvio.pesoTecnicoW}
                        onChange={e => setTempDesvio({...tempDesvio, pesoTecnicoW: Number(e.target.value)})}
                      >
                        <option value={1}>1 - Robusto</option>
                        <option value={2}>2 - Parcial</option>
                        <option value={3}>3 - Inexistente</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Classificação Automática</p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-2xl font-black text-slate-900">Score: {(tempDesvio.probabilidade || 1) * (tempDesvio.severidade || 1) * (tempDesvio.pesoTecnicoW || 1)}</p>
                        <BadgeClassificacao classificacao={getClassificacao((tempDesvio.probabilidade || 1) * (tempDesvio.severidade || 1) * (tempDesvio.pesoTecnicoW || 1))} />
                      </div>
                    </div>
                    <AlertCircle className="text-emerald-200 w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Justificativa Técnica do W <span className="text-red-500">*</span></label>
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 min-h-[100px] resize-none"
                      placeholder="Descreva por que este peso técnico foi atribuído (Ex: Falta de barreira física, sensor inativo há 2 dias...)"
                      value={tempDesvio.justificativaW}
                      onChange={e => setTempDesvio({...tempDesvio, justificativaW: e.target.value})}
                    />
                  </div>
                </div>

                {/* Descrição e Foto */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <ClipboardList size={14} className="text-emerald-600" /> Detalhes da Ocorrência
                  </h4>
                  <div className="space-y-4">
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 min-h-[80px] resize-none"
                      placeholder="Descrição complementar do desvio (Opcional)..."
                      value={tempDesvio.descricaoComplementar}
                      onChange={e => setTempDesvio({...tempDesvio, descricaoComplementar: e.target.value})}
                    />
                    <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                      <Camera size={18} /> Adicionar Foto (Opcional)
                    </button>
                  </div>
                </div>

                {/* Plano de Ação Automático */}
                <div className="p-8 bg-slate-900 rounded-[2rem] text-white space-y-6">
                  <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Target size={14} /> Plano de Ação Corretiva
                  </h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Descrição da Ação <span className="text-red-500">*</span></label>
                      <textarea 
                        className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-white placeholder:text-white/20"
                        placeholder="O que será feito para corrigir o desvio?"
                        value={tempDesvio.planoDeAcao?.descricaoAcao}
                        onChange={e => setTempDesvio({
                          ...tempDesvio, 
                          planoDeAcao: { ...tempDesvio.planoDeAcao!, descricaoAcao: e.target.value }
                        })}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Responsável <span className="text-red-500">*</span></label>
                        <input 
                          type="text"
                          className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500 text-white"
                          placeholder="Nome do executor"
                          value={tempDesvio.responsavel}
                          onChange={e => setTempDesvio({...tempDesvio, responsavel: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Prazo <span className="text-red-500">*</span></label>
                        <input 
                          type="date"
                          className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500 text-white"
                          value={tempDesvio.prazo}
                          onChange={e => setTempDesvio({...tempDesvio, prazo: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                <button onClick={() => setModalDesvio(null)} className="flex-1 bg-white border border-slate-200 text-slate-600 font-black py-4 rounded-2xl hover:bg-slate-100 transition-all">
                  Cancelar
                </button>
                <button 
                  onClick={saveDesvio}
                  className="flex-[2] bg-emerald-600 text-white font-black py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                >
                  Registrar Desvio e Plano
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal de Detalhes da Inspeção */}
      <AnimatePresence>
        {selectedInspecao && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-900 p-3 rounded-2xl">
                    <ClipboardList className="text-emerald-400 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Relatório de Auditoria Técnica</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                      {selectedInspecao.setor} • {new Date(selectedInspecao.data_hora).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <button onClick={() => setSelectedInspecao(null)} className="p-2 hover:bg-slate-200 rounded-full transition-all">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
                {/* Cabeçalho de Dados */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Setor</p>
                    <p className="text-sm font-black text-slate-800">{selectedInspecao.setor}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Turno</p>
                    <p className="text-sm font-black text-slate-800">{selectedInspecao.turno}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Líder</p>
                    <p className="text-sm font-black text-slate-800">{selectedInspecao.lider}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Desvios</p>
                    <p className="text-sm font-black text-red-600">{selectedInspecao.desvios.length}</p>
                  </div>
                </div>

                {/* Lista de Desvios e Planos */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <AlertTriangle size={14} className="text-red-500" /> Detalhamento de Ocorrências e Planos de Ação
                  </h4>
                  
                  {selectedInspecao.desvios.length === 0 ? (
                    <div className="p-12 text-center bg-emerald-50 rounded-[2rem] border border-emerald-100">
                      <CheckCircle2 size={40} className="text-emerald-600 mx-auto mb-4" />
                      <p className="text-sm font-bold text-emerald-800">Nenhum desvio identificado nesta auditoria.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {selectedInspecao.desvios.map((d) => {
                        const prazo = new Date(d.planoDeAcao.prazo);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const isDelayed = d.planoDeAcao.status !== 'Concluído' && today > prazo;
                        const daysDiff = Math.floor((today.getTime() - prazo.getTime()) / (1000 * 60 * 60 * 24));

                        return (
                          <div key={d.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
                            <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex justify-between items-start">
                              <div>
                                <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">{d.categoria}</p>
                                <h5 className="font-black text-slate-800">{d.subcategoria}</h5>
                                <div className="flex items-center gap-2 mt-2">
                                  <BadgeClassificacao classificacao={d.classificacao} />
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score: {d.score}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status do Plano</p>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                  d.planoDeAcao.status === 'Concluído' ? 'bg-emerald-100 text-emerald-700' :
                                  isDelayed ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                  {d.planoDeAcao.status} {isDelayed && `(${daysDiff}d atraso)`}
                                </span>
                              </div>
                            </div>
                            
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Evidência Técnica</h6>
                                <p className="text-sm text-slate-600 leading-relaxed italic">"{d.justificativaW}"</p>
                                {d.descricaoComplementar && (
                                  <p className="text-xs text-slate-500 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    {d.descricaoComplementar}
                                  </p>
                                )}
                              </div>
                              
                              <div className="space-y-4 bg-slate-900 p-6 rounded-2xl text-white">
                                <h6 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Plano de Ação Corretiva</h6>
                                <p className="text-sm font-bold">{d.planoDeAcao.descricaoAcao}</p>
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                  <div>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase">Responsável</p>
                                    <p className="text-xs font-black">{d.planoDeAcao.responsavel}</p>
                                  </div>
                                  <div>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase">Prazo Final</p>
                                    <p className={`text-xs font-black ${isDelayed ? 'text-red-400' : 'text-white'}`}>
                                      {new Date(d.planoDeAcao.prazo).toLocaleDateString('pt-BR')}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="pt-4">
                                  <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">Atualizar Status</p>
                                  <div className="flex gap-2">
                                    {['Aberto', 'Em Andamento', 'Concluído'].map((status) => (
                                      <button
                                        key={status}
                                        onClick={() => updatePlanoStatus(selectedInspecao.id, d.id, status as any)}
                                        className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border ${
                                          d.planoDeAcao.status === status 
                                            ? 'bg-emerald-600 border-emerald-600 text-white' 
                                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                                        }`}
                                      >
                                        {status}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100">
                <button 
                  onClick={() => setSelectedInspecao(null)}
                  className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 transition-all"
                >
                  Fechar Relatório
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal de Metodologia */}
      <AnimatePresence>
        {showMethodology && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-600 p-2 rounded-xl">
                    <ShieldAlert className="text-white w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Metodologia PxSxW</h3>
                </div>
                <button onClick={() => setShowMethodology(false)} className="p-2 hover:bg-slate-200 rounded-full transition-all">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar space-y-10">
                {/* A Fórmula */}
                <section className="space-y-4">
                  <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">A Fórmula do Risco</h4>
                  <div className="bg-slate-900 p-8 rounded-[2rem] text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <TrendingUp size={80} className="text-white" />
                    </div>
                    <p className="text-5xl font-black text-white tracking-tighter">R = P × S × W</p>
                    <p className="text-emerald-400 text-xs font-bold mt-4 uppercase tracking-widest">Risco = Probabilidade × Severidade × Peso Técnico</p>
                  </div>
                </section>

                {/* Variáveis */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Probabilidade (P)</p>
                    <ul className="text-[11px] space-y-2 font-bold text-slate-600">
                      <li className="flex justify-between"><span>1 - Raro</span> <span className="text-slate-400">Remoto</span></li>
                      <li className="flex justify-between"><span>2 - Possível</span> <span className="text-slate-400">Ocasional</span></li>
                      <li className="flex justify-between"><span>3 - Frequente</span> <span className="text-slate-400">Habitual</span></li>
                      <li className="flex justify-between"><span>4 - Muito Frequente</span> <span className="text-slate-400">Constante</span></li>
                    </ul>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Severidade (S)</p>
                    <ul className="text-[11px] space-y-2 font-bold text-slate-600">
                      <li className="flex justify-between"><span>1 - Leve</span> <span className="text-slate-400">Sem Afast.</span></li>
                      <li className="flex justify-between"><span>2 - Moderada</span> <span className="text-slate-400">Com Afast.</span></li>
                      <li className="flex justify-between"><span>3 - Grave</span> <span className="text-slate-400">Incapacitante</span></li>
                      <li className="flex justify-between"><span>4 - Catastrófica</span> <span className="text-slate-400">Fatalidade</span></li>
                    </ul>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Peso Técnico (W)</p>
                    <ul className="text-[11px] space-y-2 font-bold text-slate-600">
                      <li className="flex justify-between"><span>1 - Robusto</span> <span className="text-slate-400">Barreiras OK</span></li>
                      <li className="flex justify-between"><span>2 - Parcial</span> <span className="text-slate-400">Falha Sist.</span></li>
                      <li className="flex justify-between"><span>3 - Inexistente</span> <span className="text-slate-400">Crítico</span></li>
                    </ul>
                  </div>
                </div>

                {/* Classificação */}
                <section className="space-y-4">
                  <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Classificação Técnica do Risco</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-center">
                      <p className="text-lg font-black text-emerald-700">1 – 6</p>
                      <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Baixo</p>
                    </div>
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-center">
                      <p className="text-lg font-black text-amber-700">7 – 18</p>
                      <p className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Médio</p>
                    </div>
                    <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl text-center">
                      <p className="text-lg font-black text-orange-700">19 – 36</p>
                      <p className="text-[9px] font-bold text-orange-600 uppercase tracking-widest">Alto</p>
                    </div>
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-center">
                      <p className="text-lg font-black text-red-700">37 – 48</p>
                      <p className="text-[9px] font-bold text-red-600 uppercase tracking-widest">Crítico</p>
                    </div>
                  </div>
                </section>

                {/* Cálculo de Desempenho */}
                <section className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-4">
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Cálculo de Desempenho (Líder e Fábrica)</h4>
                  <div className="space-y-6 text-sm font-medium text-slate-600 leading-relaxed">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-slate-200 font-black text-xs">1</div>
                      <p><span className="font-black text-slate-900">Criticidade Média:</span> É a média aritmética simples de todos os scores de desvios registrados. <br/> <span className="text-[11px] font-mono bg-white px-2 py-1 rounded border border-slate-200 mt-1 inline-block">Σ(Scores) / Total de Desvios</span></p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-slate-200 font-black text-xs">2</div>
                      <p><span className="font-black text-slate-900">Performance de Liderança:</span> Mede a capacidade preventiva. Líderes com menor volume de desvios e menor criticidade média ocupam o topo do ranking.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-slate-200 font-black text-xs">3</div>
                      <p><span className="font-black text-slate-900">Indicador de Fábrica:</span> Consolida todos os setores para gerar o benchmark corporativo de segurança.</p>
                    </div>
                  </div>
                </section>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100">
                <button 
                  onClick={() => setShowMethodology(false)}
                  className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                >
                  Compreendido
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}</style>
    </div>
  );
}

