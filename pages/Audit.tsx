import React from 'react';
import { MOCK_AUDIT_LOGS } from '../constants';
import { UserRole } from '../types';
import type { AuditLog } from '../types';

const Audit: React.FC = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedRole, setSelectedRole] = React.useState('Todos');

    const filteredLogs = MOCK_AUDIT_LOGS.filter(log => {
        const matchesSearch = searchTerm === '' || 
            log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.action.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRole = selectedRole === 'Todos' || log.userRole === selectedRole;

        return matchesSearch && matchesRole;
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-bpass-yellow">Auditoria do Sistema</h1>
                <p className="text-gray-400">Registro de todas as interações e atividades da plataforma.</p>
            </div>
            
            <div className="bg-bpass-gray p-6 rounded-lg shadow-lg">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Pesquisar por usuário ou ação..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="flex-grow appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm bg-bpass-light-gray text-white"
                    />
                    <select
                        value={selectedRole}
                        onChange={e => setSelectedRole(e.target.value)}
                        className="appearance-none block w-full sm:w-64 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm bg-bpass-light-gray text-white"
                    >
                        <option value="Todos">Todos os Perfis</option>
                        {Object.values(UserRole).map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-bpass-light-gray">
                        <thead className="bg-bpass-light-gray">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Data/Hora</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Usuário</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Perfil</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="bg-bpass-gray divide-y divide-bpass-light-gray">
                            {filteredLogs.map((log: AuditLog) => (
                                <tr key={log.id} className="hover:bg-bpass-light-gray transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{new Date(log.timestamp).toLocaleString('pt-BR')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{log.user}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{log.userRole}</td>
                                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-300">{log.action}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredLogs.length === 0 && (
                        <div className="text-center py-10 text-gray-400">
                            Nenhum registro encontrado para os filtros aplicados.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Audit;