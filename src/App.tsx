import React from 'react';
import { LayoutDashboard, ClipboardCheck, Users, ShieldAlert } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <header className="mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ShieldAlert className="text-blue-500" />
          SST Pro-Manager <span className="text-sm font-normal bg-blue-600 px-2 py-1 rounded">MVP</span>
        </h1>
        <p className="text-slate-400">Gestão de Riscos Ocupacionais e Conformidade</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Indicadores */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-blue-500 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <LayoutDashboard className="text-blue-400" />
            <span className="text-xs text-green-400">FAP: 0.50</span>
          </div>
          <h3 className="text-xl font-semibold">Indicadores</h3>
          <p className="text-3xl font-bold mt-2">3% RAT</p>
          <p className="text-slate-500 text-sm mt-1">Unidade Tubarão</p>
        </div>

        {/* Card 2: Inspeções */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-blue-500 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <ClipboardCheck className="text-orange-400" />
          </div>
          <h3 className="text-xl font-semibold">Inspeções</h3>
          <p className="text-3xl font-bold mt-2">12/15</p>
          <p className="text-slate-500 text-sm mt-1">Checklists concluídos</p>
        </div>

        {/* Card 3: Treinamentos */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-blue-500 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <Users className="text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold">Treinamentos</h3>
          <p className="text-3xl font-bold mt-2">94%</p>
          <p className="text-slate-500 text-sm mt-1">Aderência normativa</p>
        </div>
      </main>

      <footer className="mt-12 text-center text-slate-600 text-sm">
        Intelbras - Gestão de SST | Foco em Prevenção Sistêmica
      </footer>
    </div>
  );
}

export default App;
