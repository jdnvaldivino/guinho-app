import React from 'react';
import { MOCK_GUINCHOS } from '../../constants';
import type { Guincho } from '../../types';
import Modal from '../../components/Modal';
import ToggleSwitch from '../../components/ToggleSwitch';

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);


const GuinchosTable: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingGuincho, setEditingGuincho] = React.useState<Guincho | null>(null);
    const [guinchos, setGuinchos] = React.useState<Guincho[]>(MOCK_GUINCHOS);

    const openModal = (guincho: Guincho | null = null) => {
        setEditingGuincho(guincho);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingGuincho(null);
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Mock save
        console.log('Salvando guincho...');
        closeModal();
    };
    
    const handleToggle = (guinchoId: number, newStatus: boolean) => {
        setGuinchos(guinchos.map(g => g.id === guinchoId ? { ...g, active: newStatus } : g));
    };

    const headers = ['ID', 'Nome', 'Placa', 'Marca', 'Modelo', 'Renavam', 'Ativo', ''];

    return (
        <div>
             <div className="flex justify-start items-center mb-6 space-x-4">
                <button onClick={() => openModal()} className="text-white hover:text-bpass-yellow transition-colors flex items-center gap-2 text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 10-2 0v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V3z" />
                    </svg>
                    Adicionar novo guincho
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
                        {guinchos.map((guincho) => (
                           <tr key={guincho.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{guincho.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guincho.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guincho.plate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guincho.brand}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guincho.model}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guincho.renavam}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <ToggleSwitch checked={guincho.active} onChange={(newStatus) => handleToggle(guincho.id, newStatus)} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => openModal(guincho)} className="text-gray-600 hover:text-bpass-yellow"><EditIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingGuincho ? 'Editar Guincho' : 'Adicionar Guincho'}>
                <form onSubmit={handleSave} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nome / Identificação</label>
                        <input type="text" name="name" id="name" defaultValue={editingGuincho?.name || ''} placeholder="Ex: Guincho Frota A-01" className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2" required />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="cnpj" className="block text-sm font-medium text-gray-300">CNPJ da Frota</label>
                            <input type="text" name="cnpj" id="cnpj" defaultValue={editingGuincho?.cnpj || ''} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2" required />
                        </div>
                         <div>
                            <label htmlFor="renavam" className="block text-sm font-medium text-gray-300">RENAVAM</label>
                            <input type="text" name="renavam" id="renavam" defaultValue={editingGuincho?.renavam || ''} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2" required />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <div>
                            <label htmlFor="plate" className="block text-sm font-medium text-gray-300">Placa</label>
                            <input type="text" name="plate" id="plate" defaultValue={editingGuincho?.plate || ''} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2" required />
                        </div>
                         <div>
                            <label htmlFor="brand" className="block text-sm font-medium text-gray-300">Marca</label>
                            <input type="text" name="brand" id="brand" defaultValue={editingGuincho?.brand || ''} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2" required />
                        </div>
                         <div>
                            <label htmlFor="model" className="block text-sm font-medium text-gray-300">Modelo</label>
                            <input type="text" name="model" id="model" defaultValue={editingGuincho?.model || ''} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2" required />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="color" className="block text-sm font-medium text-gray-300">Cor</label>
                        <input type="text" name="color" id="color" defaultValue={editingGuincho?.color || ''} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2" required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300">Fotos do Veículo</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                               <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <div className="flex text-sm text-gray-400">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-bpass-gray rounded-md font-medium text-bpass-yellow hover:text-yellow-300 focus-within:outline-none">
                                        <span>Carregar fotos</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                                    </label>
                                    <p className="pl-1">ou arraste e solte</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center pt-2">
                        <ToggleSwitch checked={editingGuincho?.active ?? true} onChange={() => {}} />
                        <label className="ml-3 block text-sm text-gray-300">Ativo</label>
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

export default GuinchosTable;