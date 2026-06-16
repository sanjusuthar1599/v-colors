import { mediaAssets } from './mediaAssets.js'

export const company = {
  name: 'V.Colors',
  tagline: 'Manufacturer, Exporter & Supplier of Embroidery and Garment Fabrics',
  location: 'Surat, Gujarat, India',
  phone: 'Available on request',
  email: 'vcolors.surat@gmail.com',
  address: 'No.203, 1st Floor, Aastha Textile Tower, Opposite Adinath Market, Ring Road, Surat, Gujarat 395002, India',
  whatsapp: '919549539519',
  instagram: 'https://www.instagram.com/v_colors_/',
  proprietor: 'Mr. Manishbhai Mehta',
  established: 2009,
  legalStatus: 'Proprietorship',
  annualTurnover: '1.5 - 5 Cr',
  employees: 'Upto 10 People',
  gst: '24**********1ZF',
  gstRegistration: "Jul'17",
}

export const categories = [
  'Jari Net Embroidery Fabric',
  'Embroidery Fabrics',
  'Fancy Fabrics',
  'Velvet Fabrics',
  'Jacquard Fabric',
  'Readymade Laces',
  'Garment Fabrics',
  'New Items',
]

export const products = [
  {
    id: 'jari-net-embroidery-fabrics',
    name: 'Jari Net Embroidery Fabrics',
    category: 'Jari Net Embroidery Fabric',
    description: 'Woven multicolor machined embroidered net fabric for suit, kurti, lehenga and saree applications.',
    image: mediaAssets.products.embroideryFabric,
    price: 'Approx. INR 290 / Meter',
    moq: '50 Meter',
    specs: ['Color: Multicolor', 'Pattern: Embroided, Net', 'Attributes: Washable', 'Packaging: Polypack', 'Delivery: 1 Week'],
    applications: ['Suit & Kurti', 'Lehenga', 'Saree', 'Textile/Garment Industry'],
  },
  {
    id: 'industrial-embroidery-net-fabrics',
    name: 'Industrial Embroidery Net Fabrics',
    category: 'Embroidery Fabrics',
    description: 'White washable embroidered net fabric with delicate designs for formal, bridal and universal garment use.',
    image: mediaAssets.products.nylonNetFabric,
    price: 'Approx. INR 300 / Meter',
    moq: '200 Pieces',
    specs: ['Color: White', 'Pattern: Embroided', 'Attributes: Washable', 'Packaging: Polypack', 'Delivery: 1 Week'],
    applications: ['Formal wear', 'Bridal wear', 'Garments', 'Universal use'],
  },
  {
    id: 'jacquard-dress-material-fabric',
    name: 'Jacquard Dress Material Fabric',
    category: 'Jacquard Fabric',
    description: 'Jacquard dress material fabric supplied for garment manufacturers, wholesalers and textile buyers.',
    image: mediaAssets.products.jacquardFabric,
    price: 'INR 380 / Meter',
    priceAmount: 380,
    specs: ['Rich woven finish', 'Garment grade', 'Bulk supply', 'Made in India'],
    applications: ['Dress materials', 'Kurtis', 'Women wear', 'Garment manufacturing'],
  },
  {
    id: 'cotton-velvet-fabric',
    name: 'Cotton Velvet Fabric',
    category: 'Velvet Fabrics',
    description: 'Soft velvet fabric range including cotton velvet, velvet fabric, velvet lace and flocked velvet options.',
    image: mediaAssets.products.velvetFabric,
    price: 'INR 420 / Meter',
    priceAmount: 420,
    specs: ['Soft surface', 'Garment suitable', 'Multiple velvet variants', 'Quality checked'],
    applications: ['Women wear', 'Kids wear', 'Fashion garments', 'Decorative trims'],
  },
  {
    id: 'sequence-work-on-net-fabrics',
    name: 'Sequence Work On Net Fabrics',
    category: 'Fancy Fabrics',
    description: 'Multicolor net fabric with sequence work for garment, clothing and apparel applications.',
    image: mediaAssets.products.digitalPrintFabric,
    price: 'Approx. INR 600 / Meter',
    moq: '100 Meter',
    specs: ['Material: Net', 'Color: Multicolor', 'Attributes: Washable', 'Packaging: Polypack', 'Delivery: 1 Week'],
    applications: ['Evening wear', 'Special occasions', 'Garment manufacturing', 'Apparel'],
  },
  {
    id: 'readymade-lace',
    name: 'Readymade Lace',
    category: 'Readymade Laces',
    description: 'Readymade lace and velvet lace options for garment finishing, borders, sleeves and decorative detailing.',
    image: mediaAssets.products.fancyLace,
    price: 'INR 199 / Piece',
    priceAmount: 199,
    specs: ['Ready to use', 'Decorative finish', 'Bulk supply', 'Quality packed'],
    applications: ['Borders', 'Sleeves', 'Necklines', 'Ethnic wear'],
  },
]

export const stats = [
  { label: 'Years Since Establishment', value: 17 },
  { label: 'Listed Product Range', value: 47 },
  { label: 'Team Members', value: 10 },
  { label: 'GST Registered Since 2017', value: 9 },
]

export const processSteps = [
  'Procurement',
  'Production',
  'Quality Control',
  'Warehousing',
  'Packaging',
  'Sales & Marketing',
  'Transportation & Logistics',
  'Timely Dispatch',
]

export const exportMarkets = ['All India', 'Surat', 'Gujarat', 'Wholesale Buyers', 'Retail Buyers', 'Garment Industry']

export const testimonials = [
  {
    name: 'Large Product Line',
    role: 'Company USP',
    quote: 'V.Colors offers a wide range of brocade, viscose, nylon net, poly net, garment and jacquard fabrics.',
  },
  {
    name: 'Client Centric Approach',
    role: 'Why Us',
    quote: 'The company is focused on fulfilling buyer requirements within stipulated time frames with transparent dealings.',
  },
  {
    name: 'State-of-the-art Infrastructure',
    role: 'Manufacturing Strength',
    quote: 'The Surat infrastructure includes procurement, production, quality-control, warehousing, packaging and logistics units.',
  },
]

export const galleryImages = mediaAssets.gallery
