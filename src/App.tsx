import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/layout/Toast';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { PipelineView } from './components/pipeline/PipelineView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { AccountDrawer } from './components/dashboard/AccountDrawer';
import { BookDemoModal } from './components/modals/BookDemoModal';
import { NewAccountModal } from './components/modals/NewAccountModal';
import { NewDealModal } from './components/modals/NewDealModal';

const MainContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-[#e1e2ed] selection:bg-primary-container selection:text-white">
      {/* Shared Navigation */}
      <Navbar />

      {/* Dynamic View */}
      <main className="flex-1">
        {activeView === 'landing' && <LandingPage />}
        {activeView === 'dashboard' && <DashboardPage />}
        {activeView === 'pipeline' && <PipelineView />}
        {activeView === 'analytics' && <AnalyticsView />}
      </main>

      {/* Shared Footer */}
      <Footer />

      {/* Overlays & Modals */}
      <AccountDrawer />
      <BookDemoModal />
      <NewAccountModal />
      <NewDealModal />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
