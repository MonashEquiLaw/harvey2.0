import React from 'react';
import { StatsHeader } from './stats-header';
import { LeadsToolbar } from './leads-toolbar';
import { LeadsTable } from './leads-table';
import { LeadDetailSheet } from './lead-detail-sheet';
import { mockLeads } from './mock-data';

export default function Home() {
  const [leads, setLeads] = React.useState(mockLeads);
  const [selectedLead, setSelectedLead] = React.useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.caseType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLead = (lead: any) => {
    setSelectedLead(lead);
    setIsSheetOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Legal AI Lead Scoring & Intake
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Automated intake analysis, lead prioritization, and practice management sync.
            </p>
          </div>
        </header>

        {/* Stats Metrics */}
        <StatsHeader leads={leads} />

        {/* Toolbar & Data Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <LeadsToolbar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
          <LeadsTable 
            leads={filteredLeads} 
            onSelectLead={handleSelectLead} 
          />
        </div>
      </div>

      {/* Side Sheet Drawer for Details */}
      <LeadDetailSheet 
        lead={selectedLead} 
        isOpen={isSheetOpen} 
        onClose={() => setIsSheetOpen(false)} 
      />
    </main>
  );
}
