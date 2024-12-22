import { Smile } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Slider } from "@/components/ui/slider"
import ColorPickerController from './ColourPickerController';
import { UpdateStorageContext } from '@/context/UpdateStorageContext';
import IconList from './IconList';
import { cn } from '@/lib/utils';


function IconController() {
    const storageValue=JSON.parse(localStorage.getItem('value'));

    const [size,setSize]=useState(storageValue?storageValue?.iconSize:280);
    const [rotate,setRotate]=useState(storageValue?storageValue?.iconRotate:0);
    const [color,setColor]=useState(storageValue?storageValue?.iconColor:'#4F46E5');
    const {updateStorage,setUpdateStorage}=useContext(UpdateStorageContext);
    const [icon,setIcon]=useState(storageValue?storageValue?.icon:'Smile');
    const [effects, setEffects] = useState({
        shadow: false,
        glow: false,
        gradient: false
    });

    useEffect(()=>{
        const updatedValue={
            ...storageValue,
            iconSize:size,
            iconRotate:rotate,
            iconColor:color,
            icon:icon,
            iconEffects:effects
        }
        setUpdateStorage(updatedValue);
        localStorage.setItem('value',JSON.stringify(updatedValue));
    },[size,rotate,color,icon,effects])


  return (
    <div className="space-y-8 p-6">
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Icon Settings</h3>
                <p className="text-sm text-gray-500">Customize your icon's appearance</p>
            </div>
            <div className="flex justify-center items-center py-4">
            <IconList selectedIcon={(icon)=>setIcon(icon)} />
            </div>
        </div>

        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Customization</h3>
                <p className="text-sm text-gray-500">Adjust size, rotation and color</p>
            </div>
            
            <div className="space-y-6">
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-700">Size</label>
                        <span className="text-sm text-gray-500">{size}px</span>
                    </div>
                    <Slider 
                        defaultValue={[size]} 
                        max={512} 
                        step={1}
                        className="py-2"
                        onValueChange={(e)=>setSize(e[0])}
                    />
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-700">Rotation</label>
                        <span className="text-sm text-gray-500">{rotate}°</span>
                    </div>
                    <Slider 
                        defaultValue={[rotate]} 
                        max={360} 
                        step={1}
                        className="py-2"
                        onValueChange={(e)=>setRotate(e[0])}
                    />
                </div>

                <div className="space-y-3 ">
                    <label className="text-sm font-medium text-gray-700">Color</label>
                    <div className="flex justify-center items-center">
                    <ColorPickerController
                        
                        hideController={true}
                        selectedColor={(color)=>setColor(color)}
                    />
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Effects</h3>
                <p className="text-sm text-gray-500">Add special effects to your icon</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
                <EffectToggle
                    label="Shadow"
                    active={effects.shadow}
                    onClick={() => setEffects(prev => ({ ...prev, shadow: !prev.shadow }))}
                />
                <EffectToggle
                    label="Glow"
                    active={effects.glow}
                    onClick={() => setEffects(prev => ({ ...prev, glow: !prev.glow }))}
                />
                <EffectToggle
                    label="Gradient"
                    active={effects.gradient}
                    onClick={() => setEffects(prev => ({ ...prev, gradient: !prev.gradient }))}
                />
            </div>
        </div>
    </div>
  )
}

function EffectToggle({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "p-3 rounded-lg border text-sm font-medium transition-all",
                active ? "border-primary bg-primary/5 text-primary" : "border-gray-200 text-gray-600"
            )}
        >
            {label}
        </button>
    );
}

export default IconController