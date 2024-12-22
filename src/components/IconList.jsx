import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Smile, icons } from 'lucide-react'
import { iconList } from '../constants/icons.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from 'axios';


function IconList({selectedIcon}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [pngIconList, setPngIconList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const storageValue = JSON.parse(localStorage.getItem('value'));
    const [icon, setIcon] = useState(storageValue?.icon || 'Smile');

    useEffect(() => {
        getPngIcons();
    }, []);

    const Icon = ({name, color, size}) => {
        const LucidIcon = icons[name];
        if (!LucidIcon) return null;
        return <LucidIcon color={color} size={size} />;
    };

    const getPngIcons = async () => {
        setIsLoading(true);
        try {
            const resp = await axios.get('/api/icons', {
                timeout: 5000,
                validateStatus: function (status) {
                    return status < 500;
                }
            });
            
            if (resp.status === 403) {
                console.warn('Access forbidden to icon API');
                setPngIconList([]);
                return;
            }
            
            setPngIconList(Array.isArray(resp.data) ? resp.data : []);
        } catch (error) {
            console.error('Failed to fetch PNG icons:', error.message);
            setPngIconList([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Icon</label>
                <div 
                    onClick={() => setOpenDialog(true)}
                    className="p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 
                    border border-gray-200 rounded-lg w-[60px] h-[60px] 
                    flex items-center justify-center transition-colors">
                    {icon?.includes('.png') ? (
                        <img src={"/png/" + icon} className="w-6 h-6" alt="Selected icon" />
                    ) : (
                        <Icon name={icon || 'Smile'} color={'#4F46E5'} size={24} />
                    )}
                </div>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Choose an Icon</DialogTitle>
                        <DialogDescription className="text-sm text-gray-500">
                            Select an icon for your logo from our collection of basic and color icons.
                        </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="icon" className="w-full">
                        <TabsList className="w-full mb-4">
                            <TabsTrigger value="icon" className="flex-1">Basic Icons</TabsTrigger>
                            <TabsTrigger value="color-icon" className="flex-1">Color Icons</TabsTrigger>
                        </TabsList>
                        <TabsContent value="icon">
                            <div className="grid grid-cols-6 gap-2 max-h-[400px] overflow-y-auto p-2">
                                {iconList.map((icon, index) => (
                                    <div 
                                        key={index}
                                        className="aspect-square p-3 flex items-center justify-center
                                        border border-gray-100 rounded-lg cursor-pointer
                                        hover:border-primary hover:bg-primary/5 transition-colors"
                                        onClick={() => {
                                            selectedIcon(icon);
                                            setOpenDialog(false);
                                            setIcon(icon);
                                        }}
                                    >
                                        <Icon name={icon} color={'#4F46E5'} size={20} />
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="color-icon">
                            <div className="grid grid-cols-6 gap-2 max-h-[400px] overflow-y-auto p-2">
                                {isLoading ? (
                                    <div className="col-span-6 py-8 text-center text-gray-500">
                                        <span className="animate-pulse">Loading icons...</span>
                                    </div>
                                ) : pngIconList.length > 0 ? (
                                    pngIconList.map((icon, index) => (
                                        <div 
                                            key={index}
                                            className="aspect-square p-3 flex items-center justify-center
                                            border border-gray-100 rounded-lg cursor-pointer
                                            hover:border-primary hover:bg-primary/5 transition-colors"
                                            onClick={() => {
                                                selectedIcon(icon);
                                                setOpenDialog(false);
                                                setIcon(icon);
                                            }}
                                        >
                                            <img 
                                                src={"/api/png/" + icon} 
                                                className="w-6 h-6" 
                                                alt={icon}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/fallback-icon.png';
                                                }}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-6 py-8 text-center text-gray-500">
                                        <p>Unable to load color icons</p>
                                        <button 
                                            onClick={() => getPngIcons()}
                                            className="text-primary hover:underline text-sm mt-2"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default IconList