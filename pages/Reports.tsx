
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_REPORTS_DATA } from '../constants';

const ChartContainer: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-bpass-gray p-6 rounded-lg shadow-lg h-[400px]">
        <h3 className="text-lg font-semibold mb-4 text-bpass-yellow">{title}</h3>
        {children}
    </div>
);


const Reports: React.FC = () => {
    const COLORS = ['#facc15', '#fbbf24', '#f59e0b', '#d97706', '#b45309'];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-bpass-yellow">Relatórios</h1>
                <p className="text-gray-400">Análise de dados e performance das operações.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ChartContainer title="Ocorrências por Período do Dia">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={MOCK_REPORTS_DATA.byPeriod} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
                            <XAxis dataKey="name" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#2e2e2e', border: '1px solid #444444' }}
                                labelStyle={{ color: '#ffffff' }}
                            />
                            <Legend />
                            <Bar dataKey="ocorrências" fill="#facc15" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>

                <ChartContainer title="Ocorrências por Status">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={MOCK_REPORTS_DATA.byStatus}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {MOCK_REPORTS_DATA.byStatus.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#2e2e2e', border: '1px solid #444444' }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>
        </div>
    );
};

export default Reports;
