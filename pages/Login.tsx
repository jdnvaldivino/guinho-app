import React from 'react';
import { UserRole } from '../types';

const BeeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M21.75,9.5c0,4.7-3.7,8.5-8.25,8.5h-3c-4.55,0-8.25-3.8-8.25-8.5s3.7-8.5,8.25-8.5h3C18.05,1,21.75,4.8,21.75,9.5z M19.75,9.5c0-3.6-2.8-6.5-6.25-6.5h-3c-3.45,0-6.25,2.9-6.25,6.5s2.8,6.5,6.25,6.5h3C16.95,16,19.75,13.1,19.75,9.5z" />
    <path d="M6,8H4.5V11H6V8z M9,7H7.5v4H9V7z M12,7h-1.5v4H12V7z M15,7h-1.5v4H15V7z M18,8h-1.5v3H18V8z" />
    <path d="M7.5,5.5A1.5,1.5,0,0,1,6,4V2.5A1.5,1.5,0,0,1,7.5,1h0A1.5,1.5,0,0,1,9,2.5V4A1.5,1.5,0,0,1,7.5,5.5Z" transform="rotate(-30 7.5 3.5)" />
    <path d="M16.5,5.5A1.5,1.5,0,0,0,18,4V2.5A1.5,1.5,0,0,0,16.5,1h0A1.5,1.5,0,0,0,15,2.5V4A1.5,1.5,0,0,0,16.5,5.5Z" transform="rotate(30 16.5 3.5)" />
  </svg>
);

interface LoginProps {
  onSelectProfile: (role: UserRole) => void;
}

const ProfileButton: React.FC<{ role: UserRole; onClick: () => void; }> = ({ role, onClick }) => (
    <button
        onClick={onClick}
        className="w-full text-left p-6 bg-bpass-gray rounded-lg shadow-lg hover:bg-bpass-light-gray transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
    >
        <div>
            <h3 className="text-xl font-bold text-white">{role}</h3>
            <p className="text-sm text-gray-400 mt-1">Entrar como {role}</p>
        </div>
        <div className="text-right mt-4">
            <span className="text-bpass-yellow font-bold text-lg">&rarr;</span>
        </div>
    </button>
);

const Login: React.FC<LoginProps> = ({ onSelectProfile }) => {
    const roles: UserRole[] = [
        UserRole.Admin,
        UserRole.Gestor,
        UserRole.Operador,
        UserRole.AutoridadeTransito,
        UserRole.Proprietario,
        UserRole.Motorista,
    ];

    return (
        <div className="min-h-screen bg-bpass-dark flex flex-col justify-center items-center p-4">
            <div className="max-w-4xl w-full text-center">
                <div className="inline-flex items-center justify-center gap-2 mb-4">
                    <BeeIcon className="h-10 w-10 text-bpass-yellow" />
                    <h1 className="text-4xl font-bold text-bpass-yellow">BeePass</h1>
                </div>
                <p className="text-gray-400 mt-2 mb-12">Selecione um perfil para acessar o sistema.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {roles.map(role => (
                        <ProfileButton 
                            key={role}
                            role={role}
                            onClick={() => onSelectProfile(role)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Login;