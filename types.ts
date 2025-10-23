// FIX: Removed self-import of `UserRole` which was causing a name conflict and breaking type declarations.
export enum UserRole {
    Admin = 'Administrador',
    Gestor = 'Gestor',
    Operador = 'Operador',
    AutoridadeTransito = 'Autoridade de Trânsito',
    Proprietario = 'Proprietário de Pátio',
    Motorista = 'Motorista de Guincho',
}

export enum GenericStatus {
    Ativo = 'Ativo',
    Inativo = 'Inativo',
}

export enum OccurrenceStatus {
    Todas = 'Todas',
    Acionamento = 'Acionamento',
    Execucao = 'Em Execução',
    Finalizada = 'Finalizada',
    Cancelada = 'Cancelada',
    AguardandoLiberacao = 'Aguardando Liberação',
    Liberado = 'Liberado',
    Pendente = 'Pendente',
}

export type Page = 'Dashboard' | 'Relatórios' | 'Gestão' | 'Auditoria' | 'Rastreamento' | 'Agendamento';

export type ManagementTab = 'Usuários' | 'Pátios' | 'Frotas de Guinchos' | 'Guinchos';

export interface User {
    id: number;
    name: string;
    email: string;
    password?: string;
    cpf: string;
    role: UserRole;
    status: GenericStatus;
    rg?: string;
    birthDate?: string;
    gender?: 'Masculino' | 'Feminino' | 'Outro';
    matricula?: string;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface OccurrenceHistory {
    timestamp: string;
    status: string;
    description: string;
    user: string;
}

export interface Occurrence {
    id: string;
    status: OccurrenceStatus;
    vehiclePlate: string;
    vehicleModel: string;
    location: string;
    towTruckDriver: string;
    impoundLot: string;
    currentLocation?: Coordinates;
    destinationLocation?: Coordinates;
    eta?: string;
    owner: {
        name: string;
        cpf: string;
        phone: string;
    };
    images: string[];
    history: OccurrenceHistory[];
}

export interface Patio {
    id: number;
    name: string;
    cnpj: string;
    address: string;
    responsiblePerson: string;
    active: boolean;
}

export interface Frota {
    id: number;
    name:string;
    cnpj: string;
    email: string;
    phone: string;
    address: string;
    active: boolean;
}

export interface Guincho {
    id: number;
    name: string;
    plate: string;
    brand: string;
    model: string;
    renavam: string;
    cnpj: string;
    color: string;
    active: boolean;
}

export interface AuditLog {
    id: number;
    timestamp: string;
    user: string;
    userRole: UserRole;
    action: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Schedule {
  date: string;
  slots: TimeSlot[];
}
