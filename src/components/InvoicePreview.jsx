import React from 'react';

export default function InvoicePreview({ invoiceData, visibleFields, columns, previewRef }) {
  // Dynamic Currency Symbol prefix resolution
  const currencySymbol = visibleFields.currency && invoiceData.currency ? invoiceData.currency : '';

  // Calculations (respecting visibility toggles)
  const subtotal = invoiceData.items.reduce((acc, item) => {
    const amount = item.amount !== undefined ? item.amount : ((item.quantity || 0) * (item.unitPrice || 0));
    return acc + amount;
  }, 0);

  const showDiscount = visibleFields.discountRate && (invoiceData.discountRate || 0) > 0;
  const discountAmount = showDiscount ? (subtotal * ((invoiceData.discountRate || 0) / 100)) : 0;
  
  const taxableAmount = subtotal - discountAmount;
  
  const showTax = visibleFields.taxRate && (invoiceData.taxRate || 0) > 0;
  const taxAmount = showTax ? (taxableAmount * ((invoiceData.taxRate || 0) / 100)) : 0;
  
  const total = taxableAmount + taxAmount;

  // Formatting date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div
      ref={previewRef}
      id="invoice-capture-area"
      className="w-[800px] bg-white text-slate-800 p-12 shadow-md relative flex flex-col justify-between font-sans print:shadow-none print:p-0 select-none print:w-full print:max-w-none print:min-w-0 print:h-auto print:min-h-0 print:static print:border-none print:m-0"
      style={{ minHeight: '1075px' }} // Proportional A4 min-height
    >
      {/* 
        This wrapper expands naturally and houses the invoice content (header, billing, items, subtotal).
        Keeping them in one layout flows them naturally, eliminating the big blank middle gap.
      */}
      <div className="flex-1">
        
        {/* Top Header Grid */}
        <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8">
          <div>
            {/* Logo / Branding */}
            {visibleFields.brandName && invoiceData.brandName && (
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-base">
                  {invoiceData.brandName.substring(0, 2).toUpperCase()}
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  {invoiceData.brandName}
                </span>
              </div>
            )}
            
            {/* Brand Header Company Name */}
            {visibleFields.brandCompanyName && invoiceData.brandCompanyName && (
              <p className="text-xs text-slate-500 max-w-[280px] font-semibold">
                {invoiceData.brandCompanyName}
              </p>
            )}
            
            {/* Brand Header Email Details */}
            {visibleFields.brandEmail && invoiceData.brandEmail && (
              <p className="text-xs text-slate-500">{invoiceData.brandEmail}</p>
            )}
            {/* Brand Header Phone Details */}
            {visibleFields.brandPhone && invoiceData.brandPhone && (
              <p className="text-xs text-slate-500">{invoiceData.brandPhone}</p>
            )}
          </div>

          <div className="text-right">
            {visibleFields.invoiceTitle && invoiceData.invoiceTitle && (
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
                {invoiceData.invoiceTitle}
              </h1>
            )}
            
            {visibleFields.invoiceNumber && (
              <p className="text-sm font-semibold text-indigo-600 mt-1">
                #{invoiceData.invoiceNumber || 'INV-0001'}
              </p>
            )}
            
            <div className="mt-4 space-y-1 text-xs text-slate-500">
              {visibleFields.issueDate && invoiceData.issueDate && (
                <p>
                  <span className="font-medium text-slate-700">Date Issued:</span>{' '}
                  {formatDate(invoiceData.issueDate)}
                </p>
              )}
              {visibleFields.dueDate && invoiceData.dueDate && (
                <p>
                  <span className="font-medium text-slate-700">Due Date:</span>{' '}
                  {formatDate(invoiceData.dueDate)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Billing Info Columns */}
        <div className="grid grid-cols-2 gap-8 py-8 border-b border-slate-100">
          
          {/* Sender Address */}
          <div>
            {visibleFields.senderLabel && invoiceData.senderLabel && (
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                {invoiceData.senderLabel}
              </h3>
            )}
            {visibleFields.senderCompanyName && invoiceData.sender.companyName && (
              <p className="text-sm font-bold text-slate-900 mb-1">
                {invoiceData.sender.companyName}
              </p>
            )}
            {visibleFields.senderEmail && invoiceData.sender.email && (
              <p className="text-xs text-slate-500 mb-0.5">{invoiceData.sender.email}</p>
            )}
            {visibleFields.senderPhone && invoiceData.sender.phone && (
              <p className="text-xs text-slate-500 mb-0.5">{invoiceData.sender.phone}</p>
            )}
            {visibleFields.senderAddress && invoiceData.sender.address ? (
              <p className="text-xs text-slate-500 whitespace-pre-line leading-relaxed">
                {invoiceData.sender.address}
              </p>
            ) : null}
          </div>

          {/* Client Address - Pushed to the right side of the page, but text left-aligned */}
          <div className="flex justify-end">
            <div className="text-left">
              {visibleFields.clientLabel && invoiceData.clientLabel && (
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  {invoiceData.clientLabel}
                </h3>
              )}
              {visibleFields.clientName && invoiceData.client.name && (
                <p className="text-sm font-bold text-slate-900 mb-1">
                  {invoiceData.client.name}
                </p>
              )}
              {visibleFields.clientEmail && invoiceData.client.email && (
                <p className="text-xs text-slate-500 mb-0.5">{invoiceData.client.email}</p>
              )}
              {visibleFields.clientPhone && invoiceData.client.phone && (
                <p className="text-xs text-slate-500 mb-1">{invoiceData.client.phone}</p>
              )}
              {visibleFields.clientAddress && invoiceData.client.address ? (
                <p className="text-xs text-slate-500 whitespace-pre-line leading-relaxed">
                  {invoiceData.client.address}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="mt-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {columns.map((col) => (
                  <th 
                    key={col.id} 
                    className={`py-3 ${
                      col.id === 'description' ? 'pr-4' : 
                      col.id === 'quantity' ? 'px-4 text-center w-20' : 
                      col.id === 'unitPrice' ? 'px-4 text-right w-28' : 'px-4 text-left'
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
                <th className="py-3 pl-4 text-right w-28">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {invoiceData.items.map((item) => {
                const amount = item.amount !== undefined ? item.amount : ((item.quantity || 0) * (item.unitPrice || 0));
                return (
                  <tr key={item.id} className="text-slate-700">
                    {columns.map((col) => {
                      if (col.id === 'description') {
                        return (
                          <td key={col.id} className="py-4 pr-4 font-medium text-slate-900">
                            {item.description || <span className="text-slate-400 italic">Unnamed item</span>}
                          </td>
                        );
                      }
                      if (col.id === 'quantity') {
                        return (
                          <td key={col.id} className="py-4 px-4 text-center text-slate-500">
                            {item.quantity}
                          </td>
                        );
                      }
                      if (col.id === 'unitPrice') {
                        return (
                          <td key={col.id} className="py-4 px-4 text-right text-slate-500">
                            {currencySymbol}{(item.unitPrice || 0).toFixed(2)}
                          </td>
                        );
                      }
                      // Custom field value
                      return (
                        <td key={col.id} className="py-4 px-4 text-left text-slate-500 break-words max-w-[150px]">
                          {item.customValues?.[col.id] || ''}
                        </td>
                      );
                    })}
                    <td className="py-4 pl-4 text-right font-semibold text-slate-900">
                      {currencySymbol}{amount.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Calculations & Notes breakdown follows the table immediately */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <div className="grid grid-cols-12 gap-6">
            
            {/* Notes & Terms */}
            <div className="col-span-7 space-y-4">
              {visibleFields.paymentTerms && invoiceData.paymentTerms && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Payment Terms
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed whitespace-pre-line">
                    {invoiceData.paymentTerms}
                  </p>
                </div>
              )}
              
              {visibleFields.notes && invoiceData.notes && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Notes
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed whitespace-pre-line">
                    {invoiceData.notes}
                  </p>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="col-span-5 text-sm space-y-2">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span className="font-medium text-slate-950">{currencySymbol}{subtotal.toFixed(2)}</span>
              </div>
              
              {showDiscount && (
                <div className="flex justify-between text-slate-500">
                  <span>Discount ({invoiceData.discountRate}%):</span>
                  <span className="font-medium text-emerald-600">-{currencySymbol}{discountAmount.toFixed(2)}</span>
                </div>
              )}

              {showTax && (
                <div className="flex justify-between text-slate-500">
                  <span>Tax ({invoiceData.taxRate}%):</span>
                  <span className="font-medium text-slate-950">{currencySymbol}{taxAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between border-t border-slate-200 pt-3 text-base">
                <span className="font-bold text-slate-900">Total Due:</span>
                <span className="font-extrabold text-indigo-600">
                  {currencySymbol}{total.toFixed(2)}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Footer copyright is pinned to the absolute bottom of A4 pages */}
      {visibleFields.footer && invoiceData.footer && (
        <div className="mt-12 text-center text-xs text-slate-400 tracking-wide border-t border-slate-100 pt-6 whitespace-pre-line">
          {invoiceData.footer}
        </div>
      )}

    </div>
  );
}
