import { UpdateStorageContext } from '@/context/UpdateStorageContext';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { icons, Globe, Share2, Printer, Smartphone } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';



function LogoPreview({downloadIcon}) {

    const [storageValue,setStorageValue]=useState();
    const {updateStorage,setUpdateStorage}=useContext(UpdateStorageContext);
    const [previewMode, setPreviewMode] = useState('default'); // 'default', 'dark', 'light', '3d'
    const [previewSize, setPreviewSize] = useState('large'); // 'small', 'medium', 'large'

    useEffect(()=>{
        const storgeData=JSON.parse(localStorage.getItem('value'));
        setStorageValue(storgeData);
    },[updateStorage])

    useEffect(() => {
        if (downloadIcon) {
            downloadPngLogo();
            // Reset the downloadIcon state after triggering the download
            setUpdateStorage(prev => ({ ...prev, timestamp: Date.now() }));
        }
    }, [downloadIcon]);

    /**
     * Used to download the Logo in png format
     */
    const downloadPngLogo = () => {
        const downloadLogoDiv = document.getElementById('downloadLogoDiv');
        
        // Set fixed dimensions for the download
        const fixedWidth = 1000;
        const fixedHeight = 1000;
        
        // Create a clone of the element to avoid modifying the original
        const clonedDiv = downloadLogoDiv.cloneNode(true);
        document.body.appendChild(clonedDiv);
        
        // Style the cloned element
        clonedDiv.style.width = `${fixedWidth}px`;
        clonedDiv.style.height = `${fixedHeight}px`;
        clonedDiv.style.position = 'fixed';
        clonedDiv.style.top = '-9999px';
        clonedDiv.style.left = '-9999px';
        clonedDiv.style.transform = 'none'; // Reset any transforms
        
        // Function to load all images
        const loadImages = async (element) => {
            const images = element.getElementsByTagName('img');
            const imagePromises = Array.from(images).map(img => {
                if (img.complete) {
                    return Promise.resolve();
                }
                return new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                    // Force reload the image
                    const currentSrc = img.src;
                    img.src = '';
                    img.src = currentSrc;
                });
            });
            return Promise.all(imagePromises);
        };

        // Wait for images to load
        loadImages(clonedDiv).then(() => {
            const options = {
                backgroundColor: null,
                scale: 1,
                useCORS: true,
                allowTaint: true,
                logging: true,
                width: fixedWidth,
                height: fixedHeight,
                onclone: (clonedDoc) => {
                    const element = clonedDoc.getElementById(clonedDiv.id);
                    if (element) {
                        // Handle SVG elements
                        const svgs = element.getElementsByTagName('svg');
                        Array.from(svgs).forEach(svg => {
                            svg.setAttribute('width', fixedWidth);
                            svg.setAttribute('height', fixedHeight);
                        });
                        
                        // Handle images
                        const images = element.getElementsByTagName('img');
                        Array.from(images).forEach(img => {
                            img.style.width = '100%';
                            img.style.height = '100%';
                            img.style.objectFit = 'contain';
                        });
                    }
                }
            };

            html2canvas(clonedDiv, options).then(canvas => {
                try {
                    // Convert to PNG with transparency
                    const pngImage = canvas.toDataURL('image/png', 1.0);
                    
                    // Create and trigger download
                    const downloadLink = document.createElement('a');
                    downloadLink.href = pngImage;
                    downloadLink.download = `logo-${Date.now()}.png`;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    
                    // Cleanup
                    document.body.removeChild(downloadLink);
                    document.body.removeChild(clonedDiv);
                } catch (error) {
                    console.error('Error generating PNG:', error);
                    document.body.removeChild(clonedDiv);
                }
            }).catch(error => {
                console.error('Error capturing canvas:', error);
                document.body.removeChild(clonedDiv);
            });
        }).catch(error => {
            console.error('Error loading images:', error);
            document.body.removeChild(clonedDiv);
        });
    };


    const Icon=({name,color,size,rotate})=>{
        const LucidIcon=icons[name];
        if(!LucidIcon)
        {
            return ;
        }
        const effects = storageValue?.iconEffects || {};
        
        const getEffectStyles = () => {
            const styles = {
                transform: `rotate(${rotate}deg)`
            };
            
            if (effects.shadow) {
                styles.filter = `${styles.filter || ''} drop-shadow(0 4px 6px rgba(0,0,0,0.2))`;
            }
            if (effects.glow) {
                styles.filter = `${styles.filter || ''} drop-shadow(0 0 10px ${color})`;
            }
            if (effects.gradient) {
                const brighterColor = adjustColorBrightness(color, 40);
                styles.backgroundImage = `linear-gradient(45deg, ${color}, ${brighterColor})`;
                styles.WebkitBackgroundClip = 'text';
                styles.WebkitTextFillColor = 'transparent';
                styles.backgroundClip = 'text'; // For Firefox support
            }
            
            return styles;
        };

        return <LucidIcon 
            color={effects.gradient ? 'currentColor' : color} 
            size={size}
            style={getEffectStyles()}
        />;
    }

    const getPreviewStyles = () => {
        switch(previewMode) {
            case 'dark':
                return 'bg-gray-900 border-gray-800';
            case 'light':
                return 'bg-gray-50 border-gray-200';
            case '3d':
                return 'bg-white border-gray-100 shadow-2xl transform perspective-[1000px] rotate-y-6 hover:rotate-y-12 transition-transform duration-300';
            default:
                return 'bg-white border-gray-100';
        }
    };

    const getPreviewSize = () => {
        switch(previewSize) {
            case 'small':
                return 'w-[300px] h-[300px]';
            case 'medium':
                return 'w-[450px] h-[450px]';
            default:
                return 'w-[600px] h-[600px]';
        }
    };

    const getPatternStyle = (patternType) => {
        switch(patternType) {
            case 'dots':
                return `radial-gradient(${storageValue?.iconColor || '#000'} 1px, transparent 1px)`;
            case 'lines':
                return `linear-gradient(45deg, ${storageValue?.iconColor || '#000'} 1px, transparent 1px)`;
            case 'grid':
                return `linear-gradient(${storageValue?.iconColor || '#000'} 1px, transparent 1px), 
                        linear-gradient(90deg, ${storageValue?.iconColor || '#000'} 1px, transparent 1px)`;
            default:
                return 'none';
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center p-3 sm:p-4 lg:p-12 bg-[#fafafa] relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="relative w-full max-w-5xl">
                <div className="mb-3 sm:mb-4 lg:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div className="text-left">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Logo Preview</h2>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 lg:mt-2">Preview your logo in different contexts</p>
                    </div>
                    <div className="flex gap-2 sm:gap-4">
                        <Select value={previewMode} onValueChange={setPreviewMode}>


                        </Select>
                        <Select value={previewSize} onValueChange={setPreviewSize}>
                            <SelectTrigger className="h-8 sm:h-10 text-xs sm:text-sm">
                                <SelectValue placeholder="Size" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="small">Small</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className={cn(
                    "relative mx-auto rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300",
                    getPreviewStyles(),
                    {
                        'w-[200px] h-[200px] sm:w-[280px] sm:h-[280px]': previewSize === 'small',
                        'w-[250px] h-[250px] sm:w-[400px] sm:h-[400px]': previewSize === 'medium',
                        'w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px]': previewSize === 'large'
                    }
                )}>
                    <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                    <div 
                        className="absolute inset-0"
                        style={{
                            padding: storageValue?.bgPadding
                        }}
                    >
                        <div 
                            id="downloadLogoDiv"
                            className="h-full w-full flex items-center justify-center relative"
                            style={{
                                borderRadius: storageValue?.bgRounded,
                                backgroundColor: storageValue?.bgColor,
                                backgroundImage: getPatternStyle(storageValue?.bgPattern),
                                backgroundSize: storageValue?.bgPattern === 'grid' ? '20px 20px' : '10px 10px',
                                filter: storageValue?.bgTexture === 'noise' ? 'contrast(120%) brightness(120%)' : 
                                       storageValue?.bgTexture === 'paper' ? 'brightness(105%) saturate(85%)' :
                                       storageValue?.bgTexture === 'canvas' ? 'contrast(90%) brightness(110%)' : 'none'
                            }}
                        >
                            {storageValue?.icon?.includes('.png') ? (
                                <img 
                                    src={"/api/png/"+storageValue?.icon}
                                    className="transition-transform duration-300"
                                    style={{
                                        height: `${Math.min(storageValue?.iconSize, window.innerWidth * 0.8)}px`,
                                        width: `${Math.min(storageValue?.iconSize, window.innerWidth * 0.8)}px`,
                                        transform: `rotate(${storageValue?.iconRotate}deg)`
                                    }}
                                    alt="Logo"
                                />
                            ) : (
                                <Icon 
                                    name={storageValue?.icon} 
                                    color={storageValue?.iconColor}
                                    size={Math.min(storageValue?.iconSize, window.innerWidth * 0.8)}
                                    rotate={storageValue?.iconRotate}
                                />
                            )}
                        </div>
                    </div>
                    {previewMode === '3d' && (
                        <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent pointer-events-none" />
                    )}
                </div>
            </div>
        </div>
    )
}

function PreviewCard({title, icon: Icon}) {
    return (
        <div className="p-4 rounded-lg border border-gray-100 bg-white/50 hover:bg-white transition-colors cursor-pointer group">
            <Icon className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
            <p className="text-sm font-medium text-gray-600 mt-2">{title}</p>
        </div>
    )
}

// Helper function to adjust color brightness
const adjustColorBrightness = (color, percent) => {
    // Handle rgba colors
    if (color.startsWith('rgba')) {
        const [r, g, b, a] = color.match(/[\d.]+/g);
        const adjustedR = Math.min(255, Math.max(0, parseInt(r) + percent));
        const adjustedG = Math.min(255, Math.max(0, parseInt(g) + percent));
        const adjustedB = Math.min(255, Math.max(0, parseInt(b) + percent));
        return `rgba(${adjustedR}, ${adjustedG}, ${adjustedB}, ${a})`;
    }
    
    // Handle hex colors
    if (color.startsWith('#')) {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        const adjustedR = Math.min(255, Math.max(0, r + percent));
        const adjustedG = Math.min(255, Math.max(0, g + percent));
        const adjustedB = Math.min(255, Math.max(0, b + percent));
        
        const toHex = (n) => {
            const hex = n.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        
        return `#${toHex(adjustedR)}${toHex(adjustedG)}${toHex(adjustedB)}`;
    }
    
    return color; // Return original color if format not supported
};

function MockupPreview({ logo }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6"
        >
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <img src={logo} className="w-16 sm:w-24 h-16 sm:h-24 object-contain" alt="Logo" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                    <p className="text-white text-xs sm:text-sm font-medium">Website Header</p>
                </div>
            </div>

            <div className="relative aspect-square bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <img src={logo} className="w-12 sm:w-16 h-12 sm:h-16 object-contain" alt="Logo" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                    <p className="text-white text-xs sm:text-sm font-medium">Social Media</p>
                </div>
            </div>
        </motion.div>
    );
}

export default LogoPreview