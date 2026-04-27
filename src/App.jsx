import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';

const SECRET_CODE = "2026FreeLanceD";
const MONTHLY_TARGET = 2000000;
const FIXED_TAX = 150000; // Havi fix adód

// Adatok a beküldött számláid alapján [cite: 13, 18, 29, 39, 50, 62, 71, 81]
const rawInvoices = [
  { date: '2026-01-29', amountHuf: 3304125 }, // E-2026-1 [cite: 13, 18]
  { date: '2026-03-02', amountHuf: 4322200 }, // E-2026-2 [cite: 29, 39]
  { date: '2026-03-26', amountHuf: 1706628 }, // E-2026-5 [cite: 50, 62]
  { date: '2026-04-02', amountHuf: 843986 }   // E-2026-6 [cite: 71, 81]
];

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('pwa_auth') === 'true');
  const [code, setCode] = useState('');

  const login = () => {
    if (code === SECRET_CODE) {
      localStorage.setItem('pwa_auth', 'true');
      setIsAuth(true);
    }
  };

  // Kumulatív adatok generálása a grafikonhoz
  const chartData = [
    { name: 'Jan', revenue: 3304125, target: 2000000 },
    { name: 'Feb', revenue: 3304125, target: 4000000 },
    { name: 'Már', revenue: 3304125 + 4322200 + 1706628, target: 6000000 },
    { name: 'Ápr', revenue: 3304125 + 4322200 + 1706628 + 843986, target: 8000000 },
  ];

  const totalGross = chartData[3].revenue;
  const monthsElapsed = 4;
  const taxableBase = totalGross - (FIXED_TAX * monthsElapsed);
  const netEkho = taxableBase > 0 ? taxableBase * 0.85 : 0; // 15% EKHO levonva

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white font-sans">
        <div className="w-full max-w-sm space-y-6 text-center">
          <h1 className="text-3xl font-black italic tracking-tighter">FREEOS.</h1>
          <input 
            type="password" 
            className="w-full p-4 rounded-2xl bg-slate-800 border border-slate-700 text-center text-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="PASSCODE"
            onChange={e => setCode(e.target.value)}
          />
          <button onClick={login} className="w-full py-4 bg-indigo-600 rounded-2xl font-bold uppercase tracking-widest shadow-lg">Belépés</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans text-slate-900 max-w-md mx-auto">
      <header className="flex justify-between items-center py-6">
        <div>
          <h2 className="text-xl font-black italic tracking-tighter text-indigo-900">FREEOS.</h2>
          <p className="text-[10px] font-bold text-slate-400">BUSINESS SUCCESS BT.</p>
        </div>
        <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Áprilisi állapot</p>
            <p className="text-xs font-bold text-green-600">Cél felett: +{(totalGross - 8000000).toLocaleString()} Ft</p>
        </div>
      </header>

      <div className="space-y-4 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Bruttó bevétel (YTD)</p>
            <p className="text-3xl font-black">{totalGross.toLocaleString()} Ft</p>
        </div>

        <div className="bg-indigo-600 p-6 rounded-3xl shadow-xl shadow-indigo-100 text-white">
            <p className="text-indigo-200 text-[10px] font-bold uppercase mb-1">Nettó kivehető (EKHO)</p>
            <p className="text-3xl font-black">{Math.floor(netEkho).toLocaleString()} Ft</p>
            <p className="text-[9px] text-indigo-300 mt-2">Levont fix adók: {(FIXED_TAX * monthsElapsed).toLocaleString()} Ft</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-64">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-6 text-center">Kumulatív vs Célvonal</p>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fill="#4f46e5" fillOpacity={0.1} />
            <Line type="monotone" dataKey="target" stroke="#e2e8f0" strokeDasharray="5 5" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default App;
