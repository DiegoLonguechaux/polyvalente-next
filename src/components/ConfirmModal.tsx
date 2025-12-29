"use client";

import { X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isDestructive?: boolean;
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, isDestructive = false }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay with transparency */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-primary-400 border border-gray-700 p-8 rounded-xl w-full max-w-lg shadow-2xl text-left">
        <button 
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide break-words pr-8">
            {title}
          </h3>
          
          <p className="text-gray-300 leading-relaxed break-words whitespace-normal">
            {message}
          </p>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="cursor-pointer px-5 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors font-medium uppercase text-sm tracking-wide"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="cursor-pointer px-5 py-2.5 rounded-lg font-bold text-primary-500 transition-colors uppercase text-sm tracking-wide shadow-lg bg-secondary text-primary hover:bg-secondary-200"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
