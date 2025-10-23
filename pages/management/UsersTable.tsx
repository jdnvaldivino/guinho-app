import React from 'react';
import { MOCK_USERS } from '../../constants';
import { GenericStatus, UserRole } from '../../types';
import type { User } from '../../types';
import Modal from '../../components/Modal';

const getStatusClass = (status: GenericStatus) => {
    switch (status) {
        case GenericStatus.Ativo:
            return 'bg-green-200 text-green-800';
        case GenericStatus.Inativo:
            return 'bg-red-200 text-red-800';
        default:
            return 'bg-gray-200 text-gray-800';
    }
};

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);

const UsersTable: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingUser, setEditingUser] = React.useState<User | null>(null);
    const [selectedRole, setSelectedRole] = React.useState<UserRole>(UserRole.Operador);

    const openModal = (user: User | null = null) => {
        setEditingUser(user);
        setSelectedRole(user?.role || UserRole.Operador);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Mock save logic
        console.log('Salvando usuário...');
        closeModal();
    };
    
    const headers = ['Nome', 'Email', 'CPF', 'Perfil', 'Status', 'Ações'];

    return (
        <div>
             <div className="flex justify-start items-center mb-6 space-x-4">
                <button onClick={() => openModal()} className="text-white hover:text-bpass-yellow transition-colors flex items-center gap-2 text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 10-2 0v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V3z" />
                    </svg>
                    Adicionar novo usuário
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
                        {MOCK_USERS.map((user) => (
                           <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.cpf}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(user.status)}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => openModal(user)} className="text-gray-600 hover:text-bpass-yellow"><EditIcon /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingUser ? 'Editar Usuário' : 'Adicionar Usuário'}>
                <form onSubmit={handleSave} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nome Completo</label>
                            <input type="text" name="name" id="name" defaultValue={editingUser?.name || ''} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                            <input type="email" name="email" id="email" defaultValue={editingUser?.email || ''} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2" required />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">{editingUser ? 'Nova Senha' : 'Senha'}</label>
                        <input type="password" name="password" id="password" placeholder={editingUser ? 'Deixe em branco para não alterar' : '••••••••'} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2" required={!editingUser} />
                    </div>

                    {/* Personal Docs */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="cpf" className="block text-sm font-medium text-gray-300">CPF</label>
                            <input type="text" name="cpf" id="cpf" placeholder="000.000.000-00" defaultValue={editingUser?.cpf || ''} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2" />
                        </div>
                        <div>
                            <label htmlFor="rg" className="block text-sm font-medium text-gray-300">RG</label>
                            <input type="text" name="rg" id="rg" placeholder="00.000.000-0" defaultValue={editingUser?.rg || ''} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2" />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-300">Data de Nascimento</label>
                            <input type="date" name="birthDate" id="birthDate" defaultValue={editingUser?.birthDate || ''} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2" />
                        </div>
                        <div>
                           <label htmlFor="gender" className="block text-sm font-medium text-gray-300">Gênero</label>
                            <select name="gender" id="gender" defaultValue={editingUser?.gender || ''} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2">
                                <option>Masculino</option>
                                <option>Feminino</option>
                                <option>Outro</option>
                            </select>
                        </div>
                    </div>
                    {/* Role and Status */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-300">Perfil</label>
                            <select name="role" id="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value as UserRole)} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2">
                                {Object.values(UserRole).map(role => <option key={role} value={role}>{role}</option>)}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-300">Status</label>
                            <select name="status" id="status" defaultValue={editingUser?.status || GenericStatus.Ativo} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2">
                                <option value={GenericStatus.Ativo}>Ativo</option>
                                <option value={GenericStatus.Inativo}>Inativo</option>
                            </select>
                        </div>
                    </div>
                     {/* Facial Photo */}
                    <div className="col-span-1 md:col-span-2">
                         <label className="block text-sm font-medium text-gray-300">Foto Facial (opcional)</label>
                        <div className="mt-1 flex items-center">
                            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-bpass-light-gray">
                                <svg className="h-full w-full text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </span>
                             <label htmlFor="facial-photo-upload" className="ml-5 bg-bpass-gray py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-bpass-light-gray focus-within:outline-none cursor-pointer">
                                <span>Carregar foto</span>
                                <input id="facial-photo-upload" name="facial-photo-upload" type="file" className="sr-only" />
                            </label>
                        </div>
                    </div>

                    {/* Conditional Fields */}
                    {selectedRole === UserRole.AutoridadeTransito && (
                         <div>
                            <label htmlFor="matricula" className="block text-sm font-medium text-gray-300">Matrícula</label>
                            <input type="text" name="matricula" id="matricula" defaultValue={editingUser?.matricula || ''} className="mt-1 block w-full bg-bpass-light-gray border-gray-600 rounded-md shadow-sm focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm text-white p-2" />
                        </div>
                    )}
                    {selectedRole === UserRole.Proprietario && (
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300">Documentos</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <div className="flex text-sm text-gray-400">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-bpass-gray rounded-md font-medium text-bpass-yellow hover:text-yellow-300 focus-within:outline-none">
                                            <span>Carregar arquivos</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                                        </label>
                                        <p className="pl-1">ou arraste e solte</p>
                                    </div>
                                    <p className="text-xs text-gray-500">Foto do RG/CNH e uma selfie segurando o documento</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-4 border-t border-bpass-light-gray mt-6">
                        <button type="button" onClick={closeModal} className="py-2 px-4 bg-bpass-light-gray rounded-lg hover:bg-gray-600 transition-colors">Cancelar</button>
                        <button type="submit" className="py-2 px-4 bg-bpass-yellow text-bpass-dark font-bold rounded-lg hover:bg-yellow-300 transition-colors">Salvar</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default UsersTable;