import React from 'react';
import type { Occurrence, OccurrenceHistory } from '../types';
import Modal from '../components/Modal';

// Timeline Component
const Timeline: React.FC<{ history: OccurrenceHistory[] }> = ({ history }) => (
    <div className="relative border-l-2 border-bpass-light-gray ml-3 pl-6">
        {history.map((item, index) => (
            <div key={index} className="mb-8">
                <div className="absolute -left-3.5 mt-1.5 h-6 w-6 rounded-full bg-bpass-yellow border-4 border-bpass-dark"></div>
                <p className="text-sm text-gray-400">{new Date(item.timestamp).toLocaleString('pt-BR')}</p>
                <h4 className="font-semibold text-white">{item.status}</h4>
                <p className="text-sm text-gray-300">{item.description} <span className="italic">por {item.user}</span></p>
            </div>
        ))}
         {history.length === 0 && <p className="text-gray-400">Nenhum histórico disponível.</p>}
    </div>
);

// Photo Gallery Component
const PhotoGallery: React.FC<{ images: string[] }> = ({ images }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

    const openImage = (src: string) => {
        setSelectedImage(src);
        setIsModalOpen(true);
    };

    const closeImage = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Veículo ${index + 1}`}
                        className="rounded-lg object-cover h-40 w-full cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => openImage(src)}
                    />
                ))}
            </div>
            {images.length === 0 && <p className="text-gray-400">Nenhuma foto disponível.</p>}
            <Modal isOpen={isModalOpen} onClose={closeImage} title="Visualizar Imagem">
                {selectedImage && <img src={selectedImage} alt="Visualização ampliada" className="rounded-lg w-full" />}
            </Modal>
        </>
    );
};


interface OccurrenceDetailProps {
    occurrence: Occurrence;
    onBack: () => void;
}

const OccurrenceDetail: React.FC<OccurrenceDetailProps> = ({ occurrence, onBack }) => {

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        Voltar para o Dashboard
                    </button>
                    <h1 className="text-2xl font-bold text-bpass-yellow">Detalhes da Ocorrência: {occurrence.id}</h1>
                    <p className="text-gray-400">Status atual: <span className="font-semibold text-white">{occurrence.status}</span></p>
                </div>
                <div className="flex gap-2">
                    <button className="py-2 px-4 bg-bpass-light-gray rounded-lg hover:bg-gray-600 transition-colors text-sm">Exportar PDF</button>
                    <button className="py-2 px-4 bg-bpass-light-gray rounded-lg hover:bg-gray-600 transition-colors text-sm">Imprimir</button>
                </div>
            </div>

            {/* Main Info */}
            <div className="bg-bpass-gray p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-bpass-yellow">Resumo</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm">
                    <div><p className="text-gray-400">Placa</p><p className="font-semibold">{occurrence.vehiclePlate}</p></div>
                    <div><p className="text-gray-400">Veículo</p><p className="font-semibold">{occurrence.vehicleModel}</p></div>
                    <div><p className="text-gray-400">Proprietário</p><p className="font-semibold">{occurrence.owner.name}</p></div>
                    <div><p className="text-gray-400">CPF do Prop.</p><p className="font-semibold">{occurrence.owner.cpf}</p></div>
                    <div><p className="text-gray-400">Local da Remoção</p><p className="font-semibold">{occurrence.location}</p></div>
                    <div><p className="text-gray-400">Pátio de Destino</p><p className="font-semibold">{occurrence.impoundLot}</p></div>
                    <div><p className="text-gray-400">Motorista</p><p className="font-semibold">{occurrence.towTruckDriver}</p></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* History */}
                <div className="bg-bpass-gray p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-6 text-bpass-yellow">Histórico do Fluxo</h2>
                    <Timeline history={occurrence.history} />
                </div>
                {/* Photos */}
                <div className="bg-bpass-gray p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-6 text-bpass-yellow">Fotos</h2>
                    <PhotoGallery images={occurrence.images} />
                </div>
            </div>
        </div>
    );
};

export default OccurrenceDetail;