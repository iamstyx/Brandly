import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { Check } from 'lucide-react'

function UpgradeDialog({ isOpen, onClose }) {
  const proFeatures = [
    'Access to 10,000+ premium icons',
    'Custom color palettes',
    'Advanced effects and filters',
    'Remove watermark',
    'Export in SVG, PNG, and PDF formats',
    'Priority customer support'
  ]

  const pricing = {
    monthly: 9.99,
    yearly: 99.99
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Upgrade to Brandly Pro
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500">
            Unlock premium features and take your logos to the next level
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="space-y-6 p-6 bg-white rounded-xl border border-gray-100">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Monthly</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold">${pricing.monthly}</span>
                <span className="text-gray-500">/month</span>
              </div>
            </div>
            <Button className="w-full" variant="outline">
              Choose Monthly
            </Button>
          </div>

          <div className="space-y-6 p-6 bg-primary/5 rounded-xl border border-primary/20 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 bg-primary text-[12px] text-white rounded-full font-medium">
                BEST VALUE
              </span>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Yearly</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold">${pricing.yearly}</span>
                <span className="text-gray-500">/year</span>
              </div>
              <div className="text-xs text-primary mt-1">Save 17%</div>
            </div>
            <Button className="w-full">Choose Yearly</Button>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="font-medium mb-4">Everything in Pro:</h4>
          <ul className="grid grid-cols-2 gap-3">
            {proFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpgradeDialog 