import React from 'react';
import type { User, Page, ManagementTab, UserRole } from './types';
import { MOCK_USERS, MOCK_OCCURRENCES } from './constants';
import { PAGE_PERMISSIONS } from './permissions';
import Login from './pages/Login';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Management from './pages/Management';
import Audit from './pages/Audit';
import Tracking from './pages/Tracking';
import Scheduling from './pages/Scheduling';
import OccurrenceDetail from './pages/OccurrenceDetail';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [currentPage, setCurrentPage] = React.useState<Page>('Dashboard');
  const [currentManagementTab, setCurrentManagementTab] = React.useState<ManagementTab>('Usuários');
  const [selectedOccurrenceId, setSelectedOccurrenceId] = React.useState<string | null>(null);


  const handleProfileSelect = React.useCallback((role: UserRole): void => {
    const user = MOCK_USERS.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
      const availablePages = PAGE_PERMISSIONS[user.role] || [];
      if (availablePages.includes('Dashboard')) {
        setCurrentPage('Dashboard');
      } else if (availablePages.length > 0) {
        setCurrentPage(availablePages[0]);
      }
    } else {
      console.error(`Nenhum usuário mock encontrado para o perfil: ${role}`);
    }
  }, []);

  const handleLogout = React.useCallback(() => {
    setCurrentUser(null);
    setCurrentPage('Dashboard');
    setSelectedOccurrenceId(null);
  }, []);

  const handleNavigate = React.useCallback((page: Page) => {
    setCurrentPage(page);
    setSelectedOccurrenceId(null); // Reset detail view on navigation
  }, []);

  const handleViewOccurrence = React.useCallback((id: string) => {
    setSelectedOccurrenceId(id);
  }, []);
  
  const handleBackToDashboard = React.useCallback(() => {
    setSelectedOccurrenceId(null);
  }, []);

  const renderCurrentPage = () => {
    if (!currentUser) return null;

    if (selectedOccurrenceId) {
        const occurrence = MOCK_OCCURRENCES.find(o => o.id === selectedOccurrenceId);
        if (occurrence) {
            return <OccurrenceDetail occurrence={occurrence} onBack={handleBackToDashboard} />;
        }
    }

    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard onViewOccurrence={handleViewOccurrence} />;
      case 'Relatórios':
        return <Reports />;
      case 'Gestão':
        return <Management 
                  currentUser={currentUser} 
                  currentTab={currentManagementTab} 
                  setCurrentTab={setCurrentManagementTab} 
                />;
      case 'Auditoria':
        return <Audit />;
      case 'Rastreamento':
        return <Tracking />;
       case 'Agendamento':
        return <Scheduling />;
      default:
        return <Dashboard onViewOccurrence={handleViewOccurrence} />;
    }
  };

  if (!currentUser) {
    return <Login onSelectProfile={handleProfileSelect} />;
  }

  return (
    <div className="min-h-screen bg-bpass-dark text-white font-sans">
      <Header 
        currentUser={currentUser} 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        onLogout={handleLogout} 
      />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default App;