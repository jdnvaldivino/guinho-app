import React from 'react';
import { MOCK_OCCURRENCES, MOCK_SCHEDULE_DATA } from '../constants';
import type { Occurrence, TimeSlot } from '../types';

// Simple Calendar Component
const Calendar: React.FC<{ selectedDate: Date; onDateChange: (date: Date) => void; }> = ({ selectedDate, onDateChange }) => {
    // This is a mock calendar. In a real app, you'd use a library.
    const days = Array.from({ length: 30 }, (_, i) => {
        const date = new Date(2023, 10, i + 1); // Mocking November 2023
        return date;
    });

    return (
        <div className="grid grid-cols-7 gap-2">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => <div key={d} className="text-center text-xs text-gray-400 font-bold">{d}</div>)}
            {days.map(day => (
                <button
                    key={day.toISOString()}
                    onClick={() => onDateChange(day)}
                    className={`p-2 text-center rounded-full text-sm transition-colors ${
                        selectedDate.getDate() === day.getDate()
                            ? 'bg-bpass-yellow text-bpass-dark font-bold'
                            : 'hover:bg-bpass-light-gray'
                    }`}
                >
                    {day.getDate()}
                </button>
            ))}
        </div>
    );
};


const Scheduling: React.FC = () => {
    const [plate, setPlate] = React.useState('');
    const [foundOccurrence, setFoundOccurrence] = React.useState<Occurrence | null>(null);
    const [selectedDate, setSelectedDate] = React.useState(new Date('2023-11-20'));
    const [selectedSlot, setSelectedSlot] = React.useState<TimeSlot | null>(null);
    const [isConfirmed, setIsConfirmed] = React.useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const found = MOCK_OCCURRENCES.find(o => o.vehiclePlate.toLowerCase() === plate.toLowerCase());
        setFoundOccurrence(found || null);
        setIsConfirmed(false);
        setSelectedSlot(null);
    };

    const handleConfirm = () => {
        if (foundOccurrence && selectedSlot) {
            setIsConfirmed(true);
        }
    }
    
    const availableSlots = MOCK_SCHEDULE_DATA.find(d => new Date(d.date).getDate() === selectedDate.getDate())?.slots || [];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-bpass-yellow">Agendamento de Retirada</h1>
                <p className="text-gray-400">Agende a data e o horário para a retirada de veículos do pátio.</p>
            </div>

            <div className="bg-bpass-gray p-6 rounded-lg shadow-lg">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-lg mb-8">
                     <input
                        type="text"
                        placeholder="Digite a placa do veículo (ex: ABC-1234)"
                        value={plate}
                        onChange={e => setPlate(e.target.value)}
                        className="flex-grow appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-bpass-yellow focus:border-bpass-yellow sm:text-sm bg-bpass-light-gray text-white"
                    />
                    <button type="submit" className="py-2 px-6 bg-bpass-yellow text-bpass-dark font-bold rounded-lg hover:bg-yellow-300 transition-colors">Buscar</button>
                </form>

                {foundOccurrence ? (
                     <div className="space-y-8">
                        <div>
                             <h2 className="text-xl font-semibold text-bpass-yellow">Veículo Localizado</h2>
                            <div className="mt-4 bg-bpass-dark p-4 rounded-lg text-sm grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div><span className="text-gray-400">Placa:</span><br/>{foundOccurrence.vehiclePlate}</div>
                                <div><span className="text-gray-400">Modelo:</span><br/>{foundOccurrence.vehicleModel}</div>
                                <div><span className="text-gray-400">Proprietário:</span><br/>{foundOccurrence.owner.name}</div>
                                <div><span className="text-gray-400">Pátio:</span><br/>{foundOccurrence.impoundLot}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-semibold mb-4">1. Selecione a data</h3>
                                <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-4">2. Selecione o horário</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {availableSlots.map(slot => (
                                        <button
                                            key={slot.time}
                                            disabled={!slot.available}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`p-3 rounded-lg text-center transition-colors text-sm ${
                                                !slot.available ? 'bg-gray-700 text-gray-500 cursor-not-allowed' :
                                                selectedSlot?.time === slot.time ? 'bg-bpass-yellow text-bpass-dark font-bold' :
                                                'bg-bpass-light-gray hover:bg-gray-600'
                                            }`}
                                        >
                                            {slot.time}
                                        </button>
                                    ))}
                                    {availableSlots.length === 0 && <p className="text-gray-400 col-span-3">Nenhum horário disponível para esta data.</p>}
                                </div>
                            </div>
                        </div>

                         {selectedSlot && (
                            <div className="pt-8 border-t border-bpass-light-gray mt-8 text-center">
                                {!isConfirmed ? (
                                <>
                                <h3 className="text-lg font-semibold">Confirmar Agendamento</h3>
                                <p className="my-2">Você está agendando a retirada para <span className="font-bold text-bpass-yellow">{selectedDate.toLocaleDateString('pt-BR')}</span> às <span className="font-bold text-bpass-yellow">{selectedSlot.time}</span>.</p>
                                <button onClick={handleConfirm} className="mt-4 py-2 px-8 bg-bpass-yellow text-bpass-dark font-bold rounded-lg hover:bg-yellow-300 transition-colors">Confirmar</button>
                                </>
                                ) : (
                                <div className="text-green-400 font-bold text-xl">
                                    Agendamento confirmado com sucesso!
                                </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    plate && <div className="text-center text-gray-400 py-8">Nenhum veículo encontrado com a placa informada.</div>
                )}
            </div>
        </div>
    );
};

export default Scheduling;