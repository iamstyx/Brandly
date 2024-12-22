import React, { useState } from 'react'
import { Button } from './ui/button'
import { Download } from 'lucide-react'
import UpgradeDialog from './UpgradeDialog'

function Header({DownloadIcon}) {
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)

  return (
    <header className="px-4 sm:px-6 lg:px-8 py-4 bg-white border-b border-gray-100 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-start">
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary text-transparent bg-clip-text">
            Brandly
          </span>
          <span className="text-[10px] sm:text-xs font-medium text-gray-400">Professional Logo Maker</span>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <Button variant="ghost" className="text-gray-500 gap-2 hidden sm:flex">
          <span className="text-sm">Need Help?</span>
        </Button>
        <Button 
          variant="outline" 
          className="gap-2 hidden sm:flex"
          onClick={() => setShowUpgradeDialog(true)}
        >
          <span className="text-sm">Upgrade to Pro</span>
          <span className="px-2 py-0.5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full text-[10px] font-semibold text-primary">PRO</span>
        </Button>
        <Button 
          className="flex gap-2 items-center bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary" 
          onClick={() => DownloadIcon()}
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export Logo</span>
        </Button>
      </div>
      {showUpgradeDialog && <UpgradeDialog isOpen={showUpgradeDialog} onClose={() => setShowUpgradeDialog(false)} />}
    </header>
  )
}

export default Header