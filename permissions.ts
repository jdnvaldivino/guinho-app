import { UserRole, type ManagementTab, type Page } from './types';

export const MANAGEMENT_TAB_PERMISSIONS: Record<UserRole, ManagementTab[]> = {
    [UserRole.Admin]: ['Usuários', 'Pátios', 'Frotas de Guinchos', 'Guinchos'],
    [UserRole.Gestor]: ['Pátios', 'Frotas de Guinchos', 'Guinchos'],
    [UserRole.Operador]: [],
    [UserRole.AutoridadeTransito]: [],
    [UserRole.Proprietario]: ['Frotas de Guinchos', 'Guinchos'],
    [UserRole.Motorista]: [],
};

export const PAGE_PERMISSIONS: Record<UserRole, Page[]> = {
    [UserRole.Admin]: ['Dashboard', 'Relatórios', 'Gestão', 'Auditoria', 'Rastreamento', 'Agendamento'],
    [UserRole.Gestor]: ['Dashboard', 'Relatórios', 'Gestão', 'Auditoria', 'Rastreamento', 'Agendamento'],
    [UserRole.Operador]: ['Dashboard', 'Rastreamento', 'Agendamento'],
    [UserRole.AutoridadeTransito]: ['Dashboard', 'Rastreamento'],
    [UserRole.Proprietario]: ['Dashboard', 'Relatórios', 'Gestão', 'Rastreamento'],
    [UserRole.Motorista]: ['Dashboard', 'Rastreamento'],
};