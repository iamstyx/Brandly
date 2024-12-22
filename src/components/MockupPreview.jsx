import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Phone, Shopping, CreditCard } from 'lucide-react';

function MockupPreview({ logo }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-6 p-6"
        >
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <img src={logo} className="w-24 h-24 object-contain" alt="Logo" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                    <p className="text-white text-sm font-medium">Website Header</p>
                </div>
            </div>

            <div className="relative aspect-square bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <img src={logo} className="w-16 h-16 object-contain" alt="Logo" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                    <p className="text-white text-sm font-medium">Social Media</p>
                </div>
            </div>
        </motion.div>
    );
}

export default MockupPreview; 