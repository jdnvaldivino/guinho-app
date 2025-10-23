import React from 'react';
import { MOCK_OCCURRENCES } from '../constants';
import { OccurrenceStatus, type Occurrence, type Coordinates } from '../types';

const Tracking: React.FC = () => {
    const occurrencesInTransit = React.useMemo(() => MOCK_OCCURRENCES.filter(
        (occ) => occ.status === OccurrenceStatus.Execucao
    ), []);

    const [selectedOccurrence, setSelectedOccurrence] = React.useState<Occurrence | null>(null);
    const [mapUrl, setMapUrl] = React.useState<string>('about:blank');

    React.useEffect(() => {
        if (occurrencesInTransit.length > 0 && !selectedOccurrence) {
            setSelectedOccurrence(occurrencesInTransit[0]);
        }
    }, [occurrencesInTransit, selectedOccurrence]);

    React.useEffect(() => {
        if (selectedOccurrence?.currentLocation && selectedOccurrence.destinationLocation) {
            const current = selectedOccurrence.currentLocation;
            const dest = selectedOccurrence.destinationLocation;
            
            // Calculate bounding box with padding
            const PADDING = 0.05;
            const minLat = Math.min(current.lat, dest.lat) - PADDING;
            const maxLat = Math.max(current.lat, dest.lat) + PADDING;
            const minLng = Math.min(current.lng, dest.lng) - PADDING;
            const maxLng = Math.max(current.lng, dest.lng) + PADDING;
            
            const bbox = `${minLng},${minLat},${maxLng},${maxLat}`;

            const url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${current.lat},${current.lng}&marker=${dest.lat},${dest.lng}`;
            setMapUrl(url);
        } else {
             // Default view of São Paulo if no occurrence is selected or has no location
            const saoPauloBbox = "-46.8259,-23.7952,-46.3654,-23.3592";
            setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=${saoPauloBbox}&layer=mapnik`);
        }
    }, [selectedOccurrence]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-bpass-yellow">Rastreamento em Tempo Real</h1>
                <p className="text-gray-400">Acompanhe as ocorrências em transporte e a localização dos guinchos.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Map Section */}
                <div className="lg:col-span-2 bg-bpass-gray p-1 rounded-lg shadow-lg h-[600px] overflow-hidden">
                   <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        src={mapUrl}
                        className="rounded-lg"
                        style={{ filter: 'invert(1) hue-rotate(180deg) brightness(0.95) contrast(0.9)' }}
                    ></iframe>
                </div>

                {/* List Section */}
                <div className="lg:col-span-1 bg-bpass-gray p-4 rounded-lg shadow-lg h-[600px] flex flex-col">
                    <h2 className="text-lg font-semibold mb-4 text-bpass-yellow border-b border-bpass-light-gray pb-2">Ocorrências em Transporte</h2>
                    <div className="overflow-y-auto flex-grow">
                        <ul className="space-y-3">
                            {occurrencesInTransit.map(occ => (
                                <li key={occ.id}>
                                    <button
                                        onClick={() => setSelectedOccurrence(occ)}
                                        className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${selectedOccurrence?.id === occ.id ? 'bg-bpass-yellow text-bpass-dark' : 'bg-bpass-light-gray hover:bg-gray-600 text-white'}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <p className="font-bold">{occ.id}</p>
                                            <p className="text-sm font-mono">{occ.vehiclePlate}</p>
                                        </div>
                                        <p className="text-xs mt-1">{occ.vehicleModel}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                         {occurrencesInTransit.length === 0 && (
                            <div className="text-center py-10 text-gray-400">
                                Nenhum veículo em transporte no momento.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {selectedOccurrence && (
                 <div className="bg-bpass-gray p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-bpass-yellow">Resumo do Deslocamento: <span className="text-white font-normal">{selectedOccurrence.id}</span></h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-sm">
                        <div>
                            <p className="text-gray-400">Veículo</p>
                            <p className="font-semibold">{selectedOccurrence.vehiclePlate} - {selectedOccurrence.vehicleModel}</p>
                        </div>
                         <div>
                            <p className="text-gray-400">Motorista</p>
                            <p className="font-semibold">{selectedOccurrence.towTruckDriver}</p>
                        </div>
                         <div>
                            <p className="text-gray-400">Origem</p>
                            <p className="font-semibold">{selectedOccurrence.location}</p>
                        </div>
                         <div>
                            <p className="text-gray-400">Destino</p>
                            <p className="font-semibold">{selectedOccurrence.impoundLot}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-gray-400">Chegada em</p>
                            <p className="font-bold text-2xl text-bpass-yellow">{selectedOccurrence.eta}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tracking;