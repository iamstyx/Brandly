import React, { useContext, useEffect, useState } from 'react'
import { Slider } from './ui/slider'
import ColorPickerController from './ColourPickerController'
import { UpdateStorageContext } from '@/context/UpdateStorageContext'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select'

function BackgroundController() {
  const storageValue = JSON.parse(localStorage.getItem('value'));
  const [rounded, setRounded] = useState(storageValue?.bgRounded || 0);
  const [padding, setPadding] = useState(storageValue?.bgPadding || 0);
  const [color, setColor] = useState(storageValue?.bgColor || '#ffffff');
  const [pattern, setPattern] = useState(storageValue?.bgPattern || 'none');
  const [texture, setTexture] = useState(storageValue?.bgTexture || 'none');
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const updateValue = {
      ...storageValue,
      bgRounded: rounded,
      bgPadding: padding,
      bgColor: color,
      bgPattern: pattern,
      bgTexture: texture
    }
    setUpdateStorage(updateValue);
    localStorage.setItem('value', JSON.stringify(updateValue));
  }, [rounded, padding, color, pattern, texture])

  const getPatternStyle = (patternType) => {
    switch(patternType) {
      case 'dots':
        return 'radial-gradient(circle, currentColor 1px, transparent 1px)';
      case 'lines':
        return 'linear-gradient(45deg, currentColor 1px, transparent 1px)';
      case 'grid':
        return 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)';
      default:
        return 'none';
    }
  };

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Background Settings</h3>
          <p className="text-sm text-gray-500">Customize your background appearance</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Corner Radius</label>
              <span className="text-sm text-gray-500">{rounded}px</span>
            </div>
            <Slider 
              defaultValue={[rounded]} 
              max={512} 
              step={1}
              onValueChange={(e) => setRounded(e[0])}
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Padding</label>
              <span className="text-sm text-gray-500">{padding}px</span>
            </div>
            <Slider 
              defaultValue={[padding]} 
              max={100} 
              step={1}
              onValueChange={(e) => setPadding(e[0])}
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Background Color</label>
            <ColorPickerController 
              hideController={false}
              selectedColor={(color) => setColor(color)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Background Style</h3>
          <p className="text-sm text-gray-500">Add patterns and textures</p>
        </div>
        
        <Select value={pattern} onValueChange={setPattern}>
          <SelectTrigger>
            <SelectValue placeholder="Choose pattern" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="dots">Dots</SelectItem>
            <SelectItem value="lines">Lines</SelectItem>
            <SelectItem value="grid">Grid</SelectItem>
          </SelectContent>
        </Select>

        <Select value={texture} onValueChange={setTexture}>
          <SelectTrigger>
            <SelectValue placeholder="Choose texture" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="noise">Noise</SelectItem>
            <SelectItem value="paper">Paper</SelectItem>
            <SelectItem value="canvas">Canvas</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default BackgroundController