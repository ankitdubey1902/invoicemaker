import React, { useState } from 'react';
import { 
  Building2, Mail, Phone, MapPin, Calendar, Hash, 
  Plus, Trash2, Percent, User, Eye, EyeOff,
  MessageSquare, FileSignature, Copyright, HelpCircle, DollarSign, Settings, Sparkles
} from 'lucide-react';

export default function InvoiceForm({
  invoiceData,
  visibleFields,
  columns,
  onRenameColumn,
  onAddColumn,
  onRemoveColumn,
  onRestoreColumn,
  onCustomValueChange,
  onToggleVisibility,
  onChange,
  onNestedChange,
  onLineItemChange,
  onAddLineItem,
  onRemoveLineItem
}) {
  const [showColSettings, setShowColSettings] = useState(false);

  // Check if standard system columns are currently missing
  const hasDesc = columns.some(c => c.id === 'description');
  const hasQty = columns.some(c => c.id === 'quantity');
  const hasPrice = columns.some(c => c.id === 'unitPrice');

  // Helper to render visibility toggle buttons next to input fields
  const renderVisibilityToggle = (fieldName) => {
    const isVisible = visibleFields[fieldName];
    return (
      <button
        type="button"
        onClick={() => onToggleVisibility(fieldName)}
        className={`rounded p-1 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 ${
          isVisible ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-300 dark:text-slate-600'
        }`}
        title={isVisible ? "Included on PDF. Click to exclude." : "Excluded from PDF. Click to include."}
      >
        {isVisible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Invoice Info Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/50">
        <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
          <Hash className="h-5 w-5 text-indigo-500" />
          Invoice Info
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          
          {/* Document Title */}
          <div className={!visibleFields.invoiceTitle ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Document Title
              </label>
              {renderVisibilityToggle('invoiceTitle')}
            </div>
            <input
              type="text"
              value={invoiceData.invoiceTitle}
              onChange={(e) => onChange('invoiceTitle', e.target.value)}
              placeholder="Invoice"
              className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 px-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
            />
          </div>

          {/* Invoice Number */}
          <div className={!visibleFields.invoiceNumber ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Invoice Number
              </label>
              {renderVisibilityToggle('invoiceNumber')}
            </div>
            <div className="relative rounded-lg shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-slate-400 text-sm">#</span>
              </div>
              <input
                type="text"
                value={invoiceData.invoiceNumber}
                onChange={(e) => onChange('invoiceNumber', e.target.value)}
                placeholder="INV-0001"
                className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 pl-7 pr-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Date Issued */}
          <div className={!visibleFields.issueDate ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Date Issued
              </label>
              {renderVisibilityToggle('issueDate')}
            </div>
            <div className="relative rounded-lg shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="date"
                value={invoiceData.issueDate}
                onChange={(e) => onChange('issueDate', e.target.value)}
                className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 pl-9 pr-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Due Date */}
          <div className={!visibleFields.dueDate ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Due Date
              </label>
              {renderVisibilityToggle('dueDate')}
            </div>
            <div className="relative rounded-lg shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => onChange('dueDate', e.target.value)}
                className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 pl-9 pr-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 2. Brand Header Section (Contains Brand Logo settings separate from Sender address block) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/50">
        <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
          <Sparkles className="h-5 w-5 text-indigo-500" />
          Brand Header
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          
          {/* Logo / Brand Name */}
          <div className={!visibleFields.brandName ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Brand Logo Name
              </label>
              {renderVisibilityToggle('brandName')}
            </div>
            <input
              type="text"
              value={invoiceData.brandName}
              onChange={(e) => onChange('brandName', e.target.value)}
              placeholder="InvoiceMaker"
              className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 px-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
            />
          </div>

          {/* Brand Company Name */}
          <div className={!visibleFields.brandCompanyName ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Header Company Name
              </label>
              {renderVisibilityToggle('brandCompanyName')}
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Building2 className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={invoiceData.brandCompanyName}
                onChange={(e) => onChange('brandCompanyName', e.target.value)}
                placeholder="Acme Web Solutions Inc."
                className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 pl-9 pr-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Brand Email */}
          <div className={!visibleFields.brandEmail ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Header Email Address
              </label>
              {renderVisibilityToggle('brandEmail')}
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="email"
                value={invoiceData.brandEmail}
                onChange={(e) => onChange('brandEmail', e.target.value)}
                placeholder="billing@acmeweb.co"
                className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 pl-9 pr-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Brand Phone */}
          <div className={!visibleFields.brandPhone ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Header Phone Number
              </label>
              {renderVisibilityToggle('brandPhone')}
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Phone className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={invoiceData.brandPhone}
                onChange={(e) => onChange('brandPhone', e.target.value)}
                placeholder="+1 (555) 902-1143"
                className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 pl-9 pr-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 3. Sender Details Section (Symmetrical size, width, and control styles) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/50">
        <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
          <Building2 className="h-5 w-5 text-indigo-500" />
          Sender Details
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          
          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Sender Heading Label - Ordered First */}
            <div className={!visibleFields.senderLabel ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Sender Block Heading
                </label>
                {renderVisibilityToggle('senderLabel')}
              </div>
              <input
                type="text"
                value={invoiceData.senderLabel}
                onChange={(e) => onChange('senderLabel', e.target.value)}
                placeholder="From"
                className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 px-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
              />
            </div>

            {/* Sender Company Name - Ordered Second */}
            <div className={!visibleFields.senderCompanyName ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Company Name
                </label>
                {renderVisibilityToggle('senderCompanyName')}
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Building2 className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={invoiceData.sender.companyName}
                  onChange={(e) => onNestedChange('sender', 'companyName', e.target.value)}
                  placeholder="Acme Corp"
                  className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 pl-9 pr-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
                />
              </div>
            </div>

          </div>

          {/* Sender Email */}
          <div className={!visibleFields.senderEmail ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Email Address
              </label>
              {renderVisibilityToggle('senderEmail')}
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="email"
                value={invoiceData.sender.email}
                onChange={(e) => onNestedChange('sender', 'email', e.target.value)}
                placeholder="billing@acme.com"
                className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 pl-9 pr-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Sender Phone */}
          <div className={!visibleFields.senderPhone ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Phone Number
              </label>
              {renderVisibilityToggle('senderPhone')}
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Phone className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={invoiceData.sender.phone}
                onChange={(e) => onNestedChange('sender', 'phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 pl-9 pr-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Sender Address */}
          <div className={`sm:col-span-2 ${!visibleFields.senderAddress ? 'opacity-60 transition-opacity' : 'transition-opacity'}`}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Full Address
              </label>
              {renderVisibilityToggle('senderAddress')}
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 top-3 flex items-start pl-3">
                <MapPin className="h-4 w-4 text-slate-400" />
              </div>
              <textarea
                value={invoiceData.sender.address}
                onChange={(e) => onNestedChange('sender', 'address', e.target.value)}
                placeholder="123 Corporate Blvd, Suite 100&#10;New York, NY 10001"
                rows={3}
                className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 pl-9 pr-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500 resize-y"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 4. Client Details Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/50">
        <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
          <User className="h-5 w-5 text-indigo-500" />
          Client Details
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          
          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Client Heading Label - Ordered First */}
            <div className={!visibleFields.clientLabel ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Client Heading Label
                </label>
                {renderVisibilityToggle('clientLabel')}
              </div>
              <input
                type="text"
                value={invoiceData.clientLabel}
                onChange={(e) => onChange('clientLabel', e.target.value)}
                placeholder="Bill To"
                className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 px-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
              />
            </div>

            {/* Client Name / Company - Ordered Second */}
            <div className={!visibleFields.clientName ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Client Name / Company
                </label>
                {renderVisibilityToggle('clientName')}
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={invoiceData.client.name}
                  onChange={(e) => onNestedChange('client', 'name', e.target.value)}
                  placeholder="John Doe or Enterprise Inc."
                  className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 pl-9 pr-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
                />
              </div>
            </div>

          </div>

          {/* Client Email */}
          <div className={!visibleFields.clientEmail ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Email Address
              </label>
              {renderVisibilityToggle('clientEmail')}
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="email"
                value={invoiceData.client.email}
                onChange={(e) => onNestedChange('client', 'email', e.target.value)}
                placeholder="billing@client.com"
                className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 pl-9 pr-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Client Phone */}
          <div className={!visibleFields.clientPhone ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Phone Number
              </label>
              {renderVisibilityToggle('clientPhone')}
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Phone className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={invoiceData.client.phone}
                onChange={(e) => onNestedChange('client', 'phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 pl-9 pr-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Client Address */}
          <div className={`sm:col-span-2 ${!visibleFields.clientAddress ? 'opacity-60 transition-opacity' : 'transition-opacity'}`}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Billing Address
              </label>
              {renderVisibilityToggle('clientAddress')}
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 top-3 flex items-start pl-3">
                <MapPin className="h-4 w-4 text-slate-400" />
              </div>
              <textarea
                value={invoiceData.client.address}
                onChange={(e) => onNestedChange('client', 'address', e.target.value)}
                placeholder="456 Client St, Floor 5&#10;San Francisco, CA 94103"
                rows={3}
                className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 pl-9 pr-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500 resize-y"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 5. Line Items Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/50">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
            <Plus className="h-5 w-5 text-indigo-500" />
            Line Items
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowColSettings(!showColSettings)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-95 transition cursor-pointer"
            >
              <Settings className="h-3.5 w-3.5" />
              Configure Columns
            </button>
            <button
              type="button"
              onClick={onAddLineItem}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100 active:scale-95 dark:bg-indigo-950/40 dark:text-indigo-400 dark:hover:bg-indigo-900/40 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Item
            </button>
          </div>
        </div>

        {/* Dynamic Column Settings Drawer panel */}
        {showColSettings && (
          <div className="mb-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Rename / Configure Table Columns</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {columns.map((col) => (
                <div key={col.id} className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                  <input
                    type="text"
                    value={col.label}
                    onChange={(e) => onRenameColumn(col.id, e.target.value)}
                    className="flex-1 text-xs bg-transparent border-none outline-none font-medium text-slate-800 dark:text-slate-200"
                    placeholder="Column Label"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveColumn(col.id)}
                    disabled={columns.length === 1}
                    className="text-slate-400 hover:text-red-500 disabled:opacity-30 p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                    title="Delete Column"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Themed Add Custom Column button */}
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                type="button"
                onClick={onAddColumn}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 active:scale-95 transition dark:bg-indigo-950/40 dark:text-indigo-400 dark:hover:bg-indigo-900/40 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Custom Column
              </button>
            </div>

            {/* Restore Standard columns drawer */}
            {( !hasDesc || !hasQty || !hasPrice ) && (
              <div className="mt-3 pt-3 border-t border-slate-200/55 dark:border-slate-800/80">
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Restore Standard Columns</h4>
                <div className="flex flex-wrap gap-2">
                  {!hasDesc && (
                    <button
                      type="button"
                      onClick={() => onRestoreColumn('description', 'Description')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 active:scale-95 transition dark:bg-indigo-950/40 dark:text-indigo-400 dark:hover:bg-indigo-900/40 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" /> Restore Description
                    </button>
                  )}
                  {!hasQty && (
                    <button
                      type="button"
                      onClick={() => onRestoreColumn('quantity', 'Qty')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 active:scale-95 transition dark:bg-indigo-950/40 dark:text-indigo-400 dark:hover:bg-indigo-900/40 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" /> Restore Qty
                    </button>
                  )}
                  {!hasPrice && (
                    <button
                      type="button"
                      onClick={() => onRestoreColumn('unitPrice', 'Unit Price')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 active:scale-95 transition dark:bg-indigo-950/40 dark:text-indigo-400 dark:hover:bg-indigo-900/40 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" /> Restore Unit Price
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                {columns.map((col) => (
                  <th key={col.id} className="py-2 px-1 text-xs font-semibold text-slate-400 dark:text-slate-500">
                    {col.label}
                  </th>
                ))}
                <th className="py-2 px-1 text-xs font-semibold text-slate-400 dark:text-slate-500 w-28 text-right">Amount</th>
                <th className="py-2 pl-2 text-xs font-semibold text-slate-400 dark:text-slate-500 w-10 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
              {invoiceData.items.map((item, index) => {
                const amount = (item.quantity || 0) * (item.unitPrice || 0);
                return (
                  <tr key={item.id} className="group">
                    {columns.map((col) => {
                      if (col.id === 'description') {
                        return (
                          <td key={col.id} className="py-3 pr-2">
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) => onLineItemChange(index, 'description', e.target.value)}
                              placeholder="Description"
                              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-1.5 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                            />
                          </td>
                        );
                      }
                      if (col.id === 'quantity') {
                        return (
                          <td key={col.id} className="py-3 px-2 w-20">
                            <input
                              type="number"
                              min="1"
                              step="1"
                              value={item.quantity}
                              onChange={(e) => onLineItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                              className="w-full text-center rounded-lg border border-slate-200 bg-slate-50/50 py-1.5 px-1 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                            />
                          </td>
                        );
                      }
                      if (col.id === 'unitPrice') {
                        return (
                          <td key={col.id} className="py-3 px-2 w-32">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.unitPrice}
                              onChange={(e) => onLineItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-1.5 px-2 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                            />
                          </td>
                        );
                      }
                      // Custom field
                      return (
                        <td key={col.id} className="py-3 px-2 min-w-[120px]">
                          <input
                            type="text"
                            value={item.customValues?.[col.id] || ''}
                            onChange={(e) => onCustomValueChange(index, col.id, e.target.value)}
                            placeholder={col.label}
                            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-1.5 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                          />
                        </td>
                      );
                    })}
                    
                    {/* Editable amount textbox with fixed dark bg token */}
                    <td className="py-3 px-2 w-28 text-right">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.amount !== undefined ? item.amount : amount}
                        onChange={(e) => onLineItemChange(index, 'amount', parseFloat(e.target.value) || 0)}
                        className="w-full text-right rounded-lg border border-slate-200 bg-slate-50/50 py-1.5 px-2 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      />
                    </td>

                    <td className="py-3 pl-2 text-center">
                      <button
                        type="button"
                        onClick={() => onRemoveLineItem(item.id)}
                        disabled={invoiceData.items.length === 1}
                        className="text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                        title="Remove Item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile List View */}
        <div className="space-y-4 md:hidden">
          {invoiceData.items.map((item, index) => {
            const amount = (item.quantity || 0) * (item.unitPrice || 0);
            return (
              <div key={item.id} className="relative rounded-xl border border-slate-100 p-4 space-y-3 dark:border-slate-800">
                <div className="absolute top-2 right-2">
                  <button
                    type="button"
                    onClick={() => onRemoveLineItem(item.id)}
                    disabled={invoiceData.items.length === 1}
                    className="text-slate-400 hover:text-red-500 disabled:opacity-30 p-1 rounded-md transition cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Dynamically render row cards */}
                {columns.map((col) => {
                  if (col.id === 'description') {
                    return (
                      <div key={col.id}>
                        <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1">{col.label}</label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => onLineItemChange(index, 'description', e.target.value)}
                          placeholder="Description"
                          className="w-full rounded-lg border border-slate-200 bg-slate-50/55 px-3 py-1.5 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                        />
                      </div>
                    );
                  }
                  if (col.id === 'quantity') {
                    return (
                      <div key={col.id}>
                        <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1">{col.label}</label>
                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={item.quantity}
                          onChange={(e) => onLineItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                          className="w-full rounded-lg border border-slate-200 bg-slate-50/55 py-1.5 px-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                        />
                      </div>
                    );
                  }
                  if (col.id === 'unitPrice') {
                    return (
                      <div key={col.id}>
                        <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1">{col.label}</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => onLineItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                          className="w-full rounded-lg border border-slate-200 bg-slate-50/55 py-1.5 px-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                        />
                      </div>
                    );
                  }
                  // Custom fields
                  return (
                    <div key={col.id}>
                      <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1">{col.label}</label>
                      <input
                        type="text"
                        value={item.customValues?.[col.id] || ''}
                        onChange={(e) => onCustomValueChange(index, col.id, e.target.value)}
                        placeholder={col.label}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50/55 px-3 py-1.5 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      />
                    </div>
                  );
                })}

                {/* Editable Amount field on mobile view with corrected dark bg token */}
                <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-500 font-semibold">Amount:</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.amount !== undefined ? item.amount : amount}
                    onChange={(e) => onLineItemChange(index, 'amount', parseFloat(e.target.value) || 0)}
                    className="w-28 text-right rounded-lg border border-slate-200 bg-slate-50/50 py-1 px-2 text-xs outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Financial Adjustments & Currency Settings Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/50">
        <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
          <Percent className="h-5 w-5 text-indigo-500" />
          Adjustments & Currency
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          
          {/* Currency Type Dropdown select */}
          <div className={!visibleFields.currency ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Currency Symbol
              </label>
              {renderVisibilityToggle('currency')}
            </div>
            <div className="relative rounded-lg shadow-sm">
              <select
                value={invoiceData.currency}
                onChange={(e) => onChange('currency', e.target.value)}
                className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 px-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
              >
                <option value="₹">₹ (INR)</option>
                <option value="$">$ (USD)</option>
                <option value="€">€ (EUR)</option>
                <option value="£">£ (GBP)</option>
                <option value="¥">¥ (JPY)</option>
                <option value="CA$">CA$ (CAD)</option>
                <option value="A$">A$ (AUD)</option>
                <option value="">None (Empty)</option>
              </select>
            </div>
          </div>

          {/* Discount Rate */}
          <div className={!visibleFields.discountRate ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Discount Rate (%)
              </label>
              {renderVisibilityToggle('discountRate')}
            </div>
            <div className="relative rounded-lg shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Percent className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={invoiceData.discountRate}
                onChange={(e) => onChange('discountRate', parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 pl-9 pr-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Tax Rate */}
          <div className={!visibleFields.taxRate ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Tax Rate (%)
              </label>
              {renderVisibilityToggle('taxRate')}
            </div>
            <div className="relative rounded-lg shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Percent className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={invoiceData.taxRate}
                onChange={(e) => onChange('taxRate', parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 pl-9 pr-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 7. Notes, Terms & Footer Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/50">
        <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
          <MessageSquare className="h-5 w-5 text-indigo-500" />
          Notes, Terms & Footer
        </h2>
        <div className="space-y-4">
          
          {/* Payment Terms */}
          <div className={!visibleFields.paymentTerms ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <FileSignature className="h-3.5 w-3.5 text-slate-400" />
                Payment Terms
              </label>
              {renderVisibilityToggle('paymentTerms')}
            </div>
            <textarea
              value={invoiceData.paymentTerms}
              onChange={(e) => onChange('paymentTerms', e.target.value)}
              placeholder="e.g. Payment is due within 15 days..."
              rows={2}
              className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 px-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white resize-y"
            />
          </div>

          {/* Notes */}
          <div className={!visibleFields.notes ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                Invoice Notes
              </label>
              {renderVisibilityToggle('notes')}
            </div>
            <textarea
              value={invoiceData.notes}
              onChange={(e) => onChange('notes', e.target.value)}
              placeholder="e.g. Thank you for your business..."
              rows={2}
              className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 px-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white resize-y"
            />
          </div>

          {/* Footer Text */}
          <div className={!visibleFields.footer ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Copyright className="h-3.5 w-3.5 text-slate-400" />
                Footer Copyright Text
              </label>
              {renderVisibilityToggle('footer')}
            </div>
            <input
              type="text"
              value={invoiceData.footer}
              onChange={(e) => onChange('footer', e.target.value)}
              placeholder="e.g. © 2026 InvoiceMaker. All rights reserved."
              className="block w-full rounded-lg border border-slate-200 bg-slate-50/55 py-2 px-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
            />
          </div>

        </div>
      </div>

    </div>
  );
}
