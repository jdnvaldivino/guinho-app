import { UserRole, GenericStatus, OccurrenceStatus, type User, type Occurrence, type Patio, type Frota, type Guincho, type AuditLog, type Schedule } from './types';

export const MOCK_USERS: User[] = [
    { id: 1, name: 'Admin User', email: 'admin@beepass.com', password: 'password', cpf: '111.111.111-11', role: UserRole.Admin, status: GenericStatus.Ativo },
    { id: 2, name: 'Gestor User', email: 'gestor@beepass.com', password: 'password', cpf: '222.222.222-22', role: UserRole.Gestor, status: GenericStatus.Ativo },
    { id: 3, name: 'Operador User', email: 'operador@beepass.com', password: 'password', cpf: '333.333.333-33', role: UserRole.Operador, status: GenericStatus.Ativo },
    { id: 4, name: 'Autoridade User', email: 'autoridade@beepass.com', password: 'password', cpf: '444.444.444-44', role: UserRole.AutoridadeTransito, status: GenericStatus.Ativo, matricula: '12345' },
    { id: 5, name: 'Proprietário User', email: 'proprietario@beepass.com', password: 'password', cpf: '555.555.555-55', role: UserRole.Proprietario, status: GenericStatus.Inativo },
    { id: 6, name: 'Motorista User', email: 'motorista@beepass.com', password: 'password', cpf: '666.666.666-66', role: UserRole.Motorista, status: GenericStatus.Ativo },
];

export const MOCK_OCCURRENCES: Occurrence[] = [
    {
        id: 'OC-001',
        status: OccurrenceStatus.Execucao,
        vehiclePlate: 'ABC-1234',
        vehicleModel: 'Honda Civic',
        location: 'Av. Paulista, 1000',
        towTruckDriver: 'Carlos Silva',
        impoundLot: 'Pátio Central',
        currentLocation: { lat: -23.5613, lng: -46.6565 },
        destinationLocation: { lat: -23.5489, lng: -46.6388 },
        eta: '12 min',
        owner: { name: 'Maria Joaquina', cpf: '123.456.789-00', phone: '(11) 98765-4321' },
        images: [
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        ],
        history: [
            { timestamp: '2023-10-28T08:00:00Z', status: 'Acionamento', description: 'Ocorrência registrada pelo sistema.', user: 'Sistema' },
            { timestamp: '2023-10-28T08:05:00Z', status: 'Em Execução', description: 'Guincho acionado e a caminho.', user: 'Operador User' },
            { timestamp: '2023-10-28T08:30:00Z', status: 'Em Execução', description: 'Veículo recolhido.', user: 'Carlos Silva' },
        ],
    },
    {
        id: 'OC-002', status: OccurrenceStatus.Finalizada, vehiclePlate: 'DEF-5678', vehicleModel: 'Toyota Corolla', location: 'R. Augusta, 500', towTruckDriver: 'João Pereira', impoundLot: 'Pátio Zona Sul',
        owner: { name: 'João da Silva', cpf: '987.654.321-00', phone: '(11) 91234-5678' },
        images: ['https://images.unsplash.com/photo-1542281286-9e0a16bb7366?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'],
        history: [
            { timestamp: '2023-10-27T14:00:00Z', status: 'Acionamento', description: 'Ocorrência registrada.', user: 'Operador User' },
            { timestamp: '2023-10-27T14:45:00Z', status: 'Em Execução', description: 'Veículo recolhido e a caminho do pátio.', user: 'João Pereira' },
            { timestamp: '2023-10-27T15:30:00Z', status: 'Finalizada', description: 'Veículo entregue no pátio.', user: 'João Pereira' },
        ],
    },
    { id: 'OC-003', status: OccurrenceStatus.Acionamento, vehiclePlate: 'GHI-9012', vehicleModel: 'VW Gol', location: 'Marginal Tietê', towTruckDriver: 'Marcos Andrade', impoundLot: 'Pátio Zona Leste', owner: { name: 'Pedro Alvares', cpf: '111.222.333-44', phone: '(11) 99999-8888' }, images: [], history: [] },
    { id: 'OC-004', status: OccurrenceStatus.Cancelada, vehiclePlate: 'JKL-3456', vehicleModel: 'Fiat Uno', location: 'Av. Faria Lima, 2500', towTruckDriver: 'Carlos Silva', impoundLot: 'Pátio Central', owner: { name: 'Ana Paula', cpf: '444.555.666-77', phone: '(11) 98888-7777' }, images: [], history: [] },
    { id: 'OC-005', status: OccurrenceStatus.AguardandoLiberacao, vehiclePlate: 'MNO-7890', vehicleModel: 'Chevrolet Onix', location: 'Av. 23 de Maio', towTruckDriver: 'João Pereira', impoundLot: 'Pátio Zona Sul', owner: { name: 'Lucas Martins', cpf: '777.888.999-00', phone: '(11) 97777-6666' }, images: [], history: [] },
    {
        id: 'OC-006',
        status: OccurrenceStatus.Execucao,
        vehiclePlate: 'XYZ-9876',
        vehicleModel: 'Ford Ka',
        location: 'R. da Consolação, 2000',
        towTruckDriver: 'Ricardo Lima',
        impoundLot: 'Pátio Zona Leste',
        currentLocation: { lat: -23.5880, lng: -46.6586 },
        destinationLocation: { lat: -23.5338, lng: -46.5714 },
        eta: '25 min',
        owner: { name: 'Fernanda Lima', cpf: '222.333.444-55', phone: '(11) 96666-5555' },
        images: [],
        history: [
            { timestamp: '2023-10-28T09:00:00Z', status: 'Acionamento', description: 'Solicitação de remoção recebida.', user: 'Autoridade User' },
            { timestamp: '2023-10-28T09:10:00Z', status: 'Em Execução', description: 'Guincho "Ricardo Lima" aceitou a chamada.', user: 'Sistema' },
        ],
    },
];


export const STATUSES = [
    { id: 'Todas', label: OccurrenceStatus.Todas },
    { id: 'Acionamento', label: OccurrenceStatus.Acionamento },
    { id: 'Execucao', label: OccurrenceStatus.Execucao },
    { id: 'Finalizada', label: OccurrenceStatus.Finalizada },
    { id: 'Cancelada', label: OccurrenceStatus.Cancelada },
    { id: 'AguardandoLiberacao', label: OccurrenceStatus.AguardandoLiberacao },
    { id: 'Liberado', label: OccurrenceStatus.Liberado },
    { id: 'Pendente', label: OccurrenceStatus.Pendente },
];

export const MOCK_REPORTS_DATA = {
    byPeriod: [
        { name: 'Manhã', ocorrências: 43 },
        { name: 'Tarde', ocorrências: 78 },
        { name: 'Noite', ocorrências: 55 },
        { name: 'Madrugada', ocorrências: 21 },
    ],
    byStatus: [
        { name: 'Finalizada', value: 120 },
        { name: 'Em Execução', value: 35 },
        { name: 'Cancelada', value: 15 },
        { name: 'Pendente', value: 25 },
    ],
};

export const MOCK_PATIOS: Patio[] = [
    { id: 1, name: 'Pátio Central Ltda.', cnpj: '11.111.111/0001-11', address: 'Rua do Pátio, 123, Centro', responsiblePerson: 'João da Silva', active: true },
    { id: 2, name: 'Guarda Bem Pátios', cnpj: '22.222.222/0001-22', address: 'Av. Principal, 456, Bairro Norte', responsiblePerson: 'Maria Oliveira', active: true },
    { id: 3, name: 'Pátio Seguro S/A', cnpj: '33.333.333/0001-33', address: 'Estrada Velha, 789, Zona Sul', responsiblePerson: 'Carlos Souza', active: false },
];

export const MOCK_FROTAS: Frota[] = [
    { id: 1, name: 'Guincho Rápido', cnpj: '44.444.444/0001-44', email: 'contato@guinchorapido.com', phone: '(11) 99999-1111', address: 'Rua das Frotas, 10', active: true },
    { id: 2, name: 'Frota Express', cnpj: '55.555.555/0001-55', email: 'contato@frotaexpress.com', phone: '(11) 99999-2222', address: 'Av. dos Guinchos, 20', active: true },
];

export const MOCK_GUINCHOS: Guincho[] = [
    { id: 1, name: 'Guincho A-01', plate: 'BRA-2E19', brand: 'Mercedes-Benz', model: 'Atego', renavam: '12345678901', cnpj: '44.444.444/0001-44', color: 'Branco', active: true },
    { id: 2, name: 'Guincho B-05', plate: 'MER-C05UL', brand: 'Volkswagen', model: 'Constellation', renavam: '10987654321', cnpj: '55.555.555/0001-55', color: 'Prata', active: true },
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
    { id: 1, timestamp: '2023-10-27T10:00:00Z', user: 'Admin User', userRole: UserRole.Admin, action: 'Criou o usuário "Gestor User"' },
    { id: 2, timestamp: '2023-10-27T10:05:00Z', user: 'Gestor User', userRole: UserRole.Gestor, action: 'Atualizou o pátio "Pátio Central Ltda."' },
    { id: 3, timestamp: '2023-10-27T11:20:00Z', user: 'Operador User', userRole: UserRole.Operador, action: 'Registrou nova ocorrência OC-005' },
    { id: 4, timestamp: '2023-10-27T11:30:00Z', user: 'Admin User', userRole: UserRole.Admin, action: 'Desativou o usuário "Proprietário User"' },
    { id: 5, timestamp: '2023-10-27T12:00:00Z', user: 'Autoridade User', userRole: UserRole.AutoridadeTransito, action: 'Consultou a placa JKL-3456' },
];

export const MOCK_SCHEDULE_DATA: Schedule[] = [
  {
    date: '2023-11-20',
    slots: [
      { time: '09:00', available: true },
      { time: '09:30', available: false },
      { time: '10:00', available: true },
      { time: '10:30', available: true },
      { time: '11:00', available: false },
    ],
  },
    {
    date: '2023-11-21',
    slots: [
      { time: '09:00', available: true },
      { time: '09:30', available: true },
      { time: '10:00', available: true },
      { time: '10:30', available: false },
      { time: '11:00', available: true },
    ],
  },
];