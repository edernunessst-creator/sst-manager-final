import React, { useState } from 'react';
import { LayoutDashboard, ClipboardCheck, Users, ShieldAlert, PlusCircle } from 'lucide-react';

function App() {
  const [aba, setAba] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <header className="mb-8 border-b border-slate-800 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ShieldAlert className="text-blue-500" />
            SST Pro-Manager <span className="text-sm font-normal bg-blue-600 px-2 py-1 rounded">MVP</span>
          </h1>
          <p className="text-slate-400">Gestão de Riscos Ocupacionais e Conformidade</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setAba('dashboard')} className={`px-4 py-2 rounded ${aba === 'dashboard' ? 'bg-blue-600' : 'bg-slate-800'}`}>Dashboard</button>
          <button onClick={() => setAba('inspecao')} className={`px-4 py-2 rounded ${aba === 'inspecao' ? 'bg-blue-600' : 'bg-slate-800'}`}>Nova Inspeção</button>
        </div>
      </header>

      {aba === 'dashboard' ? (
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <LayoutDashboard className="text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold">Indicadores</h3>
            <p className="text-3xl font-bold mt-2">3% RAT</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <ClipboardCheck className="text-orange-400 mb-4" />
            <h3 className="text-xl font-semibold">Inspeções</h3>
            <p className="text-3xl font-bold mt-2">12/15</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <Users className="text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold">Treinamentos</h3>
            <p className="text-3xl font-bold mt-2">94%</p>
          </div>
        </main>
      ) : (
        <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <PlusCircle className="text-green-500" /> Iniciar Checklist de Campo
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Setor Industrial</label>
              <select className="w-full bg-slate-800 border border-slate-700 p-2 rounded">
                <option>Extrusão</option>
                <option>Montagem</option>
                <option>Almoxarifado</option>
              </select>
            </div>
            <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold mt-4">
              Gerar Formulário de Inspeção
            </button>
          </form>
        </div>
      )}

      <footer className="mt-12 text-center text-slate-600 text-sm">
        Intelbras - Gestão de SST | Unidade Tubarão
      </footer>
    </div>
  );
}

export default App;
