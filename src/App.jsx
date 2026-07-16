import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { Download, RefreshCcw, Sparkles, ZoomIn, ZoomOut, Maximize2, Printer } from 'lucide-react';

const initialInvoiceData = {
  invoiceNumber: 'INV-2026-089',
  issueDate: '2026-07-16',
  dueDate: '2026-07-31',
  currency: '₹',
  brandName: 'InvoiceMaker',
  brandCompanyName: 'Acme Web Solutions Inc.',
  brandEmail: 'billing@acmeweb.co',
  brandPhone: '+1 (555) 902-1143',
  invoiceTitle: 'Invoice',
  senderLabel: 'From',
  clientLabel: 'Bill To',
  sender: {
    companyName: 'Acme Web Solutions Inc.',
    email: 'billing@acmeweb.co',
    phone: '+1 (555) 902-1143',
    address: '742 Evergreen Terrace, Suite 300\nSpringfield, OR 97477',
  },
  client: {
    name: 'Cyberdyne Systems Corp',
    email: 'accounts@cyberdyne.io',
    phone: '+1 (555) 438-1991',
    address: '18111 Von Karman Avenue, Suite 600\nIrvine, CA 92612',
  },
  items: [
    { id: '1', description: 'Premium SaaS Platform Development (React, Node.js)', quantity: 1, unitPrice: 4500.00, amount: 4500.00, customValues: {} },
    { id: '2', description: 'UI/UX High-Fidelity Design Tokens (Figma design & code)', quantity: 1, unitPrice: 1800.00, amount: 1800.00, customValues: {} },
    { id: '3', description: 'Automated E2E Testing Suite Setup (Playwright & CI/CD)', quantity: 1, unitPrice: 950.00, amount: 950.00, customValues: {} },
  ],
  discountRate: 10,
  taxRate: 8.5,
  paymentTerms: 'Payment is due within 15 days of invoice date. Please send payments to our bank account or via our online billing dashboard. A late fee of 1.5% per month will be charged on overdue balances.',
  notes: 'Thank you for your business. We appreciate the opportunity to work with you and look forward to future collaborations!',
  footer: '© 2026 Acme Web Solutions Inc. All rights reserved.',
};

const emptyInvoiceData = {
  invoiceNumber: '',
  issueDate: new Date().toISOString().split('T')[0],
  dueDate: '',
  currency: '₹',
  brandName: 'InvoiceMaker',
  brandCompanyName: '',
  brandEmail: '',
  brandPhone: '',
  invoiceTitle: 'Invoice',
  senderLabel: 'From',
  clientLabel: 'Bill To',
  sender: { companyName: '', email: '', phone: '', address: '' },
  client: { name: '', email: '', phone: '', address: '' },
  items: [{ id: '1', description: '', quantity: 1, unitPrice: 0, amount: 0, customValues: {} }],
  discountRate: 0,
  taxRate: 0,
  paymentTerms: '',
  notes: '',
  footer: '',
};

const initialVisibleFields = {
  invoiceNumber: true,
  issueDate: true,
  dueDate: true,
  currency: true,
  invoiceTitle: true,
  senderLabel: true,
  clientLabel: true,
  
  // Brand Header Block Toggles
  brandName: true,
  brandCompanyName: true,
  brandEmail: true,
  brandPhone: true,
  
  // Billing block (From) details
  senderCompanyName: true,
  senderPhone: false, // Hidden by default inside address block, toggled separately
  senderEmail: false, // Hidden by default inside address block, toggled separately
  senderAddress: true,
  
  // Client details block
  clientName: true,
  clientPhone: true,
  clientEmail: true,
  clientAddress: true,
  discountRate: true,
  taxRate: true,
  paymentTerms: true,
  notes: true,
  footer: true,
};

const initialColumns = [
  { id: 'description', label: 'Description' },
  { id: 'quantity', label: 'Qty' },
  { id: 'unitPrice', label: 'Unit Price' },
];

export default function App() {
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const [visibleFields, setVisibleFields] = useState(initialVisibleFields);
  const [columns, setColumns] = useState(initialColumns);
  const [zoom, setZoom] = useState(1);
  
  // Persistent Theme State Initializer
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme_preference');
      if (savedTheme !== null) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Keep track of the dynamically changing inner height of the preview sheet
  const [innerHeight, setInnerHeight] = useState(1075);
  
  const previewRef = useRef(null);
  const containerRef = useRef(null);

  // Sync dark mode class on html tag and write to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_preference', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_preference', 'light');
    }
  }, [darkMode]);

  // Recalculate dynamic inner height whenever data elements change
  useEffect(() => {
    if (previewRef.current) {
      const timer = setTimeout(() => {
        if (previewRef.current) {
          setInnerHeight(previewRef.current.offsetHeight);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [invoiceData, columns, visibleFields]);

  // Auto-fit calculation to scale preview based on parent container width
  const handleAutoFit = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const padding = window.innerWidth < 640 ? 32 : 48;
      const fitScale = (containerWidth - padding) / 800;
      setZoom(Math.min(1.5, Math.max(0.35, fitScale)));
    }
  };

  // Run auto-fit calculation on mount and window resize
  useEffect(() => {
    handleAutoFit();
    const timer = setTimeout(handleAutoFit, 100);

    window.addEventListener('resize', handleAutoFit);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleAutoFit);
    };
  }, []);

  const handleInputChange = (field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedInputChange = (section, field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleLineItemChange = (index, field, value) => {
    setInvoiceData((prev) => {
      const newItems = [...prev.items];
      const updatedItem = {
        ...newItems[index],
        [field]: value,
      };

      // Automatically recalculate amount if Qty or Price is edited
      if (field === 'quantity' || field === 'unitPrice') {
        updatedItem.amount = (updatedItem.quantity || 0) * (updatedItem.unitPrice || 0);
      }

      newItems[index] = updatedItem;
      return {
        ...prev,
        items: newItems,
      };
    });
  };

  // Handle custom value changes on line items
  const handleItemCustomValueChange = (index, colId, value) => {
    setInvoiceData((prev) => {
      const newItems = [...prev.items];
      newItems[index] = {
        ...newItems[index],
        customValues: {
          ...(newItems[index].customValues || {}),
          [colId]: value,
        },
      };
      return {
        ...prev,
        items: newItems,
      };
    });
  };

  const handleAddLineItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: Date.now().toString(),
          description: '',
          quantity: 1,
          unitPrice: 0,
          amount: 0,
          customValues: {},
        },
      ],
    }));
  };

  const handleRemoveLineItem = (id) => {
    setInvoiceData((prev) => {
      if (prev.items.length <= 1) return prev;
      return {
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      };
    });
  };

  const handleRenameColumn = (id, newLabel) => {
    setColumns((prev) =>
      prev.map((col) => (col.id === id ? { ...col, label: newLabel } : col))
    );
  };

  const handleAddColumn = () => {
    const newId = `custom_${Date.now()}`;
    setColumns((prev) => [
      ...prev,
      { id: newId, label: 'Custom Field' },
    ]);
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((item) => ({
        ...item,
        customValues: {
          ...(item.customValues || {}),
          [newId]: '',
        },
      })),
    }));
  };

  const handleRemoveColumn = (id) => {
    setColumns((prev) => prev.filter((col) => col.id !== id));
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        const newCustom = { ...(item.customValues || {}) };
        delete newCustom[id];
        return {
          ...item,
          customValues: newCustom,
        };
      }),
    }));
  };

  const handleRestoreColumn = (id, label) => {
    setColumns((prev) => {
      if (prev.some(col => col.id === id)) return prev;
      const newCols = [...prev];
      if (id === 'description') {
        newCols.unshift({ id, label });
      } else if (id === 'quantity') {
        const descIndex = newCols.findIndex(c => c.id === 'description');
        newCols.splice(descIndex + 1, 0, { id, label });
      } else if (id === 'unitPrice') {
        const qtyIndex = newCols.findIndex(c => c.id === 'quantity');
        const insertIndex = qtyIndex !== -1 ? qtyIndex + 1 : newCols.findIndex(c => c.id === 'description') + 1;
        newCols.splice(insertIndex, 0, { id, label });
      } else {
        newCols.push({ id, label });
      }
      return newCols;
    });
  };

  const handleToggleVisibility = (field) => {
    setVisibleFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleLoadDemo = () => {
    setInvoiceData(initialInvoiceData);
    setVisibleFields(initialVisibleFields);
    setColumns(initialColumns);
    setTimeout(handleAutoFit, 50);
  };

  const handleClearForm = () => {
    setInvoiceData(emptyInvoiceData);
    setVisibleFields(initialVisibleFields);
    setColumns(initialColumns);
    setTimeout(handleAutoFit, 50);
  };

  const handleExportPrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 print:bg-white print:text-black print:min-h-0">
      {/* App Header */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 print:p-0 print:m-0 print:max-w-none">
        
        {/* Actions bar for form control and preview utilities */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadDemo}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-350 dark:hover:bg-slate-800/60 transition active:scale-95 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              Load Demo Data
            </button>
            <button
              onClick={handleClearForm}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-355 dark:hover:bg-slate-800/60 transition active:scale-95 cursor-pointer"
            >
              <RefreshCcw className="h-3.5 w-3.5 text-slate-500" />
              Clear Form
            </button>
          </div>

          <div>
            <button
              onClick={handleExportPrint}
              className="relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 hover:from-violet-500 hover:to-indigo-500 active:scale-95 transition-all dark:shadow-indigo-500/10 cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Responsive Grid layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-start print:block print:w-full">
          
          {/* Left panel - Inputs */}
          <div className="space-y-6 lg:h-[80vh] lg:overflow-y-auto pr-2 pb-6 border-slate-200 dark:border-slate-800/50 lg:border-r lg:pr-6 print:hidden">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Invoice Details
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Fill in details. Use the <strong className="text-indigo-500">Eye icon</strong> to include or exclude fields on the printed invoice.
              </p>
            </div>
            <InvoiceForm
              invoiceData={invoiceData}
              visibleFields={visibleFields}
              columns={columns}
              onRenameColumn={handleRenameColumn}
              onAddColumn={handleAddColumn}
              onRemoveColumn={handleRemoveColumn}
              onRestoreColumn={handleRestoreColumn}
              onCustomValueChange={handleItemCustomValueChange}
              onToggleVisibility={handleToggleVisibility}
              onChange={handleInputChange}
              onNestedChange={handleNestedInputChange}
              onLineItemChange={handleLineItemChange}
              onAddLineItem={handleAddLineItem}
              onRemoveLineItem={handleRemoveLineItem}
            />
          </div>

          {/* Right panel - Paper Canvas Preview */}
          <div className="space-y-4 flex flex-col lg:h-[80vh] print:w-full print:p-0 print:m-0 print:h-auto">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center justify-between print:hidden">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  Live Preview
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Dynamic, pixel-perfect A4 print representation.
                </p>
              </div>
            </div>

            {/* Zoom Controls Toolbar */}
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm zoom-toolbar print:hidden">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Viewer Scale
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((prev) => Math.max(0.35, prev - 0.1))}
                  className="p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-95 transition cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200 w-10 text-center select-none">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoom((prev) => Math.min(1.5, prev + 0.1))}
                  className="p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-95 transition cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>
                <button
                  type="button"
                  onClick={() => setZoom(1.0)}
                  className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xxs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-95 transition cursor-pointer"
                  title="Reset zoom to 100%"
                >
                  Reset (100%)
                </button>
                <button
                  type="button"
                  onClick={handleAutoFit}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xxs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-95 transition cursor-pointer"
                  title="Auto Fit width to screen"
                >
                  <Maximize2 className="h-3 w-3" />
                  Fit Width
                </button>
              </div>
            </div>
            
            {/* The Live Invoice Preview Page Container */}
            <div 
              ref={containerRef}
              className="w-full bg-slate-100 dark:bg-slate-900/30 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start overflow-auto invoice-preview-container print:p-0 print:bg-white print:border-none print:shadow-none print:m-0 print:overflow-visible lg:flex-1"
            >
              {/* Proportional Zoom Wrapper */}
              <div 
                style={{ '--zoom-factor': zoom, '--inner-height': `${innerHeight}px` }} 
                className="transition-all duration-200 origin-top shrink-0 relative rounded shadow-sm border border-slate-200/50 dark:border-slate-800/40 preview-scale-wrapper mx-auto print:w-full print:h-auto print:shadow-none print:border-none print:overflow-visible print:m-0 print:p-0"
              >
                <div className="preview-invoice-inner shrink-0 print:w-full print:h-auto print:transform-none print:overflow-visible print:m-0 print:p-0">
                  <InvoicePreview 
                    invoiceData={invoiceData} 
                    visibleFields={visibleFields} 
                    columns={columns}
                    previewRef={previewRef} 
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Website footer with watermark */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6 text-center text-xs text-slate-400 dark:text-slate-500 font-medium tracking-wide print:hidden">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500 dark:text-slate-400">InvoiceMaker Pro</span>
            <span>•</span>
            <span>Pixel-Perfect Billing Solution</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <span className="text-red-500 text-sm animate-pulse">❤️</span>
            <span>for modern businesses</span>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (FAB) on small screens for easy PDF print/export */}
      <div className="fixed bottom-6 right-6 lg:hidden z-50 fab-container print:hidden">
        <button
          onClick={handleExportPrint}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:from-violet-500 hover:to-indigo-500 active:scale-95 transition-all dark:shadow-indigo-500/20 cursor-pointer"
          title="Print / Save PDF"
        >
          <Printer className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
