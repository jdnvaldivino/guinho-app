import React from 'react';
import { MOCK_PATIOS } from '../../constants';
import type { Patio } from '../../types';
import Modal from '../../components/Modal';
import ToggleSwitch from '../../components/ToggleSwitch';

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);

const PatiosTable: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingPatio, setEditingPatio] = React.useState<Patio | null>(null);
    const [patios, setPatios] = React.useState<Patio[]>(MOCK_PATIOS);

    const openModal = (patio: Patio | null = null) => {
        setEditingPatio(patio);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPatio(null);
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Mock save
        console.log('Salvando pátio...');
        closeModal();
    };
    
    const handleToggle = (patioId: number, newStatus: boolean) => {
        setPatios(patios.map(p => p.id === patioId ? { ...p, active: newStatus } : p));
    };

    const headers = ['ID', 'Razão Social', 'CNPJ', 'Endereço', 'Responsável', 'Ativo', ''];

    return (
        <div>
            <div className="flex justify-start items-center mb-6 space-x-4">
                <button onClick={() => openModal()} className="text-white hover:text-bpass-yellow transition-colors flex items-center gap-2 text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 10-2 0v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V3z" />
                    </svg>
                    Adicionar novo pátio
                </button>
                 <div className="border-l border-gray-600 h-5"></div>
                <button className="text-white hover:text-bpass-yellow transition-colors flex items-center gap-2 text-sm font-medium">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm5 0a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm5 0a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1z" />
                    </svg>
                    Visualizar tabela
                </button>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {headers.map(header => (
                                <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {patios.map((patio) => (
                           <tr key={patio.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patio.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patio.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patio.cnpj}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patio.address}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patio.responsiblePerson}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <ToggleSwitch checked={patio.active} onChange={(newStatus) => handleToggle(patio.id, newStatus)} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => openModal(patio)} className="text-gray-600 hover:text-bpass-yellow"><EditIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingPatio ? 'Editar Pátio' : 'Adicionar Pátio'}>
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Razão Social</label>
                            <input type="text" name="name" id="name" defaultValue={editingPatio?.name || ''} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2" required />
                        </div>
                         <div>
                            <label htmlFor="cnpj" className="block text-sm font-medium text-gray-300">CNPJ</label>
                            <input type="text" name="cnpj" id="cnpj" defaultValue={editingPatio?.cnpj || ''} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-300">Endereço Completo</label>
                        <input type="text" name="address" id="address" defaultValue={editingPatio?.address || ''} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2" required />
                    </div>
                     <div>
                        <label htmlFor="responsiblePerson" className="block text-sm font-medium text-gray-300">Responsável pelo Pátio</label>
                        <input type="text" name="responsiblePerson" id="responsiblePerson" defaultValue={editingPatio?.responsiblePerson || ''} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2" required />
                    </div>
                    <div className="flex items-center pt-2">
                        <ToggleSwitch checked={editingPatio ? editingPatio.active : true} onChange={() => {}} />
                        <label htmlFor="active" className="ml-3 block text-sm font-medium text-gray-300">Ativo</label>
                    </div>
                    <div className="flex justify-end gap-4 pt-4 border-t border-bpass-light-gray mt-4">
                        <button type="button" onClick={closeModal} className="py-2 px-4 bg-bpass-light-gray rounded-lg hover:bg-gray-600 transition-colors">Cancelar</button>
                        <button type="submit" className="py-2 px-4 bg-bpass-yellow text-bpass-dark font-bold rounded-lg hover:bg-yellow-300 transition-colors">Salvar</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default PatiosTable;