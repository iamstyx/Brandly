import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Header from './components/Header'
import SideNav from './components/SideNav'
import IconController from './components/IconController'
import BackgroundController from './components/BackgroundController'
import LogoPreview from './components/LogoPreview'
import { UpdateStorageContext } from './context/UpdateStorageContext'

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [updateStorage, setUpdateStorage] = useState({});
  const [downloadIcon, setDownloadIcon] = useState();
  
  const handleDownload = () => {
    setDownloadIcon(Date.now());
    // Reset after a short delay
    setTimeout(() => {
        setDownloadIcon(null);
    }, 100);
  };
  
  return (
    <UpdateStorageContext.Provider value={{updateStorage, setUpdateStorage}}>
      <div className="min-h-screen w-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
        <Header DownloadIcon={handleDownload}/>
        
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden p-2 sm:p-4 lg:p-6 gap-4 lg:gap-6 relative">
          <div className="order-1 lg:order-3 lg:hidden flex-1 bg-white/80 backdrop-blur-xl rounded-xl shadow-sm border border-gray-100/50 overflow-y-auto min-w-0">
            <LogoPreview downloadIcon={downloadIcon} />
          </div>

          <aside className="order-2 lg:order-1 w-full lg:w-72 flex-shrink-0 bg-white/80 backdrop-blur-xl rounded-xl shadow-sm border border-gray-100/50">
            <SideNav selectedIndex={(value) => setSelectedIndex(value)} />
          </aside>

          <main className="order-3 lg:order-2 flex flex-col lg:flex-row flex-1 gap-4 lg:gap-6 min-w-0">
            <div className="w-full lg:w-[420px] flex-shrink-0 bg-white/80 backdrop-blur-xl rounded-xl shadow-sm border border-gray-100/50 overflow-y-auto">
              {selectedIndex == 0 ? 
                <IconController/> :
                <BackgroundController/>
              }
            </div>
            
            <div className="hidden lg:block flex-1 bg-white/80 backdrop-blur-xl rounded-xl shadow-sm border border-gray-100/50 overflow-y-auto min-w-0">
              <LogoPreview downloadIcon={downloadIcon} />
            </div>
          </main>
        </div>
      </div>
    </UpdateStorageContext.Provider>
  )
}

export default App
