import type { Product} from '../types/types';

   export const products: Product[] = [
    {
      id: '1',
      name: 'The Breeze',
      price: '₹ 32,999',
      originalPrice: '₹ 39,999',
      tonnage: '1 Ton',
      stars: 5,
      image: '/assets/ig/1.png',
      colors: ['#667eea', '#f093fb', '#4facfe', '#43e97b'],
      isNew: true,
      emi: '₹2,505',
      discount: '-50%',
      features: ['Inverter Technology', 'Copper Condenser', 'Smart WiFi Control', 'Anti-Bacterial Filter'],
      specifications: {
        'Cooling Capacity': '1 Ton (3.5 kW)',
        'Energy Rating': '5 Star',
        'Compressor': 'Inverter',
        'Refrigerant': 'R32',
        'Warranty': '3 Years'
      }
    },
    {
      id: '2',
      name: 'The Chill',
      price: '₹ 45,999',
      tonnage: '1.5 Ton',
      stars: 4,
      image: '/assets/ig/2.png',
      colors: ['#f093fb', '#667eea', '#43e97b', '#4facfe'],
      isBestseller: true,
      emi: '₹3,805',
      features: ['Dual Inverter', 'Gold Fin Condenser', 'Voice Control', 'PM 2.5 Filter'],
      specifications: {
        'Cooling Capacity': '1.5 Ton (5.2 kW)',
        'Energy Rating': '4 Star',
        'Compressor': 'Dual Inverter',
        'Refrigerant': 'R32',
        'Warranty': '3 Years'
      }
    },
    {
      id: '3',
      name: 'The Frost',
      price: '₹ 58,999',
      tonnage: '2 Ton',
      stars: 5,
      image: '/assets/ig/3.png',
      colors: ['#4facfe', '#43e97b', '#f093fb', '#667eea'],
      emi: '₹4,905',
      features: ['Variable Speed Compressor', 'Blue Fin Condenser', 'AI Mode', 'HEPA Filter'],
      specifications: {
        'Cooling Capacity': '2 Ton (7.0 kW)',
        'Energy Rating': '5 Star',
        'Compressor': 'Variable Speed',
        'Refrigerant': 'R32',
        'Warranty': '3 Years'
      }
    },
    {
      id: '4',
      name: 'The Arctic',
      price: '₹ 72,999',
      tonnage: '2 Ton',
      stars: 5,
      image: '/assets/ig/4.png',
      colors: ['#43e97b', '#4facfe', '#667eea', '#f093fb'],
      isPremium: true,
      emi: '₹6,005',
      features: ['Twin Rotary Compressor', 'Ocean Black Fin', 'Smart Sensors', 'UV Sanitization'],
      specifications: {
        'Cooling Capacity': '2 Ton (7.3 kW)',
        'Energy Rating': '5 Star',
        'Compressor': 'Twin Rotary',
        'Refrigerant': 'R32',
        'Warranty': '5 Years'
      }
    },
    {
      id: '5',
      name: 'The Polar',
      price: '₹ 38,999',
      tonnage: '1 Ton',
      stars: 4,
      image: '/assets/ig/5.png',
      colors: ['#a8edea', '#fed6e3', '#ffecd2', '#fcb69f'],
      emi: '₹3,205',
      features: ['Fixed Speed Compressor', 'Copper Tubes', 'Timer Function', 'Dust Filter'],
      specifications: {
        'Cooling Capacity': '1 Ton (3.4 kW)',
        'Energy Rating': '4 Star',
        'Compressor': 'Fixed Speed',
        'Refrigerant': 'R410A',
        'Warranty': '2 Years'
      }
    },
    {
      id: '6',
      name: 'The Glacier',
      price: '₹ 65,999',
      tonnage: '1.5 Ton',
      stars: 5,
      image: '/assets/ig/1.png',
      colors: ['#2c3e50', '#667eea', '#4facfe', '#43e97b'],
      emi: '₹5,505',
      features: ['Scroll Compressor', 'Hydrophilic Coating', 'Sleep Mode', 'Carbon Filter'],
      specifications: {
        'Cooling Capacity': '1.5 Ton (5.1 kW)',
        'Energy Rating': '5 Star',
        'Compressor': 'Scroll',
        'Refrigerant': 'R32',
        'Warranty': '4 Years'
      }
    }
  ];