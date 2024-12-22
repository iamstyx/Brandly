import * as lucideIcons from 'lucide-react';
import * as phosphorIcons from 'phosphor-react';
import { Icon as IconifyIcon } from '@iconify/react';

export const iconSources = {
  // Categorized Lucide icons
  essential: {
    name: 'Essential',
    icons: ['Home', 'Search', 'Settings', 'User', 'Mail', 'Heart', 'Star'],
    source: lucideIcons
  },
  business: {
    name: 'Business',
    icons: ['Briefcase', 'Building', 'CreditCard', 'PieChart', 'BarChart'],
    source: lucideIcons
  },
  
  // Phosphor icons
  phosphor: {
    name: 'Phosphor',
    icons: ['Horse', 'Dog', 'Cat', 'Bird', 'Fish'],
    source: phosphorIcons
  }
};

// Iconify collections for color icons
export const iconifyCollections = [
  {
    name: 'Logos',
    prefix: 'logos',
    icons: ['twitter', 'facebook', 'instagram', 'github', 'linkedin']
  },
  {
    name: 'Material Design',
    prefix: 'material-symbols',
    icons: ['home', 'settings', 'mail', 'phone', 'person']
  }
];

// Flaticon API integration
export const flaticonCategories = [
  { id: 'business', name: 'Business' },
  { id: 'social', name: 'Social Media' },
  { id: 'tech', name: 'Technology' },
  { id: 'nature', name: 'Nature' }
]; 