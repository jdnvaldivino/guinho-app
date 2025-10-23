import React from 'react';
import type { ManagementTab, User } from '../types';
import { MANAGEMENT_TAB_PERMISSIONS } from '../permissions';
import UsersTable from './management/UsersTable';
import PatiosTable from './management/PatiosTable';
import GuinchosTable from './management/GuinchosTable';
import FrotasTable from './management/FrotasTable';

interface ManagementProps {
    currentUser: User;
    currentTab: ManagementTab;
    setCurrentTab: (tab: ManagementTab) => void;
}

const Management: React.FC<ManagementProps> = ({ currentUser, currentTab, setCurrentTab }) => {
    
    const availableTabs = MANAGEMENT_TAB_PERMISSIONS[currentUser.role] || [];

    React.useEffect(() => {
        // If the current tab is no longer available for the user (e.g., due to role change),
        // set it to the first available tab.
        if (availableTabs.length > 0 && !availableTabs.includes(currentTab)) {
            setCurrentTab(availableTabs[0]);
        }
    }, [availableTabs, currentTab, setCurrentTab]);


    const renderContent = () => {
        if (availableTabs.length === 0) {
             return (
                <div className="text-center py-10 text-gray-400">
                    <p>Você não tem permissão para acessar esta área.</p>
                </div>
            );
        }
        switch (currentTab) {
            case 'Usuários':
                return <UsersTable />;
            case 'Pátios':
                return <PatiosTable />;
            case 'Frotas de Guinchos':
                return <FrotasTable />;
            case 'Guinchos':
                return <GuinchosTable />;
            default:
                return <UsersTable />;
        }
    };
    
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-bpass-yellow">Gestão</h1>
                <p className="text-gray-400">Administre usuários, pátios, frotas e guinchos da plataforma.</p>
            </div>

            <div className="bg-bpass-dark p-0 sm:p-6 rounded-lg">
                 {availableTabs.length > 0 && (
                    <div className="border-b border-bpass-light-gray mb-6 px-6 sm:px-0">
                        <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                            {availableTabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setCurrentTab(tab)}
                                    className={`${
                                        currentTab === tab
                                            ? 'border-bpass-yellow text-bpass-yellow'
                                            : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}
                {renderContent()}
            </div>
        </div>
    );
};

export default Management;