import React from 'react';
import { STATUSES, MOCK_OCCURRENCES } from '../constants';
import type { Occurrence } from '../types';
import { OccurrenceStatus } from '../types';

const DashboardCard: React.FC<{ title: string; count: number; isActive: boolean; onClick: () => void; }> = ({ title, count, isActive, onClick }) => (
    <div
        onClick={onClick}
        className={`p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${isActive ? 'bg-bpass-yellow text-bpass-dark' : 'bg-bpass-gray hover:bg-bpass-light-gray'}`}
    >
        <h3 className="text-sm font-medium truncate">{title}</h3>
        <p className="mt-1 text-3xl font-semibold">{count}</p>
    </div>
);

interface DashboardProps {
    onViewOccurrence: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewOccurrence }) => {
    const [activeStatus, setActiveStatus] = React.useState<OccurrenceStatus>(OccurrenceStatus.Todas);
    
    const filteredOccurrences = MOCK_OCCURRENCES.filter(
        (occ) => activeStatus === OccurrenceStatus.Todas || occ.status === activeStatus
    );

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-bpass-yellow">Acompanhamento de Ocorrências</h1>
                <p className="text-gray-400">Visualize o status de todas as operações em tempo real.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
                {STATUSES.slice(0, 14).map((status) => (
                    <DashboardCard
                        key={status.id}
                        title={status.label}
                        count={status.id === 'Todas' ? MOCK_OCCURRENCES.length : MOCK_OCCURRENCES.filter(o => o.status === status.label).length}
                        isActive={activeStatus === status.label}
                        onClick={() => setActiveStatus(status.label)}
                    />
                ))}
            </div>
            
            <div className="bg-bpass-gray p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-bpass-yellow">Detalhes das Ocorrências: <span className="text-white font-normal">{activeStatus}</span></h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-bpass-light-gray">
                        <thead className="bg-bpass-light-gray">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Veículo</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Localização</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Motorista Guincho</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pátio</th>
                            </tr>
                        </thead>
                        <tbody className="bg-bpass-gray divide-y divide-bpass-light-gray">
                            {filteredOccurrences.map((occ: Occurrence) => (
                                <tr key={occ.id} onClick={() => onViewOccurrence(occ.id)} className="hover:bg-bpass-light-gray transition-colors cursor-pointer">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{occ.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-200 text-yellow-800">{occ.status}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{occ.vehiclePlate} - {occ.vehicleModel}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{occ.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{occ.towTruckDriver}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{occ.impoundLot}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {filteredOccurrences.length === 0 && (
                        <div className="text-center py-10 text-gray-400">
                            Nenhuma ocorrência encontrada para este status.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;