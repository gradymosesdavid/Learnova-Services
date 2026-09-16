import React, { useState, useEffect } from 'react';
import { PageId, SupportedLanguage } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { HomePage } from './pages/HomePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ManufacturingPage } from './pages/ManufacturingPage';
import { AutomobilePage } from './pages/AutomobilePage';
import { GeneralProgramsPage } from './pages/GeneralProgramsPage';
import { MandatoryCompliancePage } from './pages/MandatoryCompliancePage';
import { LeadershipQuizPage } from './pages/LeadershipQuizPage';
import { speechService } from './utils/speechSynthesis';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Handle global page audio trigger
  const handleTriggerPageAudio = () => {
    if (speechService.getState().isPlaying) {
      speechService.stop();
      return;
    }

    let readText = '';
    let title = '';

    switch (currentPage) {
      case 'home':
        readText =
          'Welcome to Learnova Services. Learn and Innovate Mindsets and Ideas. We are corporate HR professionals with over a decade of experience in Learning and Development, Leadership Development, Competency and Skill Development, and Organizational Development. Explore our simplified L&D RoI Accelerator Model delivering 3X return on investment and rapid deployment across Manufacturing, Automobile, IT and ITES, Hospitality, FMCG, Retail, and Service sectors.';
        title = 'Learnova Services Overview';
        break;
      case 'about':
        readText =
          'About Learnova Services. Learn and Innovate Mindsets and Ideas. We are corporate HR professionals with over a decade of experience in Learning & Development, Leadership Development, Competency & Skill Development and Organizational Development. We are certified Behavioural Trainers, certified by: AoN Learning & Development, British Council Train the Trainer, University of Cambridge Teaching Knowledge Test, Life Coach Middle Earth HR, and TESOL Teachers Board of Canada and Ministry of Human Resources Canada.';
        title = 'About Learnova Services & Global Certifications';
        break;
      case 'manufacturing':
        readText =
          'Server Motherboard Assembly Hands-on Learner Guide. Step by step guide to assemble a server motherboard with chipset, CPU, memory and key components. Follow strict ESD safety guidelines and verify every standoff, socket, and peripheral connector.';
        title = 'Manufacturing Server Motherboard Guide';
        break;
      case 'automobile':
        readText =
          'Assembling a car engine is an exercise in extreme precision. Foundational steps include preparing the bare engine block, installing the crankshaft, inserting pistons and connecting rods, mounting the cylinder head with spiral sequence torquing, and synchronizing the timing system.';
        title = 'Automobile Powertrain Assembly Guide';
        break;
      case 'general':
        readText =
          'General Developmental Programs. Core soft skills and transformational leadership topics tailored across Manufacturing and Automobile, IT and ITES, Hospitality, Retail and FMCG, and General Service industries.';
        title = 'General Developmental Programs';
        break;
      case 'mandatory':
        readText =
          'Mandatory and Compliance Training. Health Safety and Environment protocols, ISO 9001, ISO 27001 cybersecurity, GDPR and DPDP data privacy, HACCP food safety, and Anti-Money Laundering regulatory governance.';
        title = 'Mandatory & Regulatory Compliance';
        break;
      case 'leadership-quiz':
        readText =
          'Learnova Services 105-Question Leadership Self-Evaluation Assessment. Rate yourself from 1 to 5 across 7 core dimensions: Problem Solving, Decision Making, Design Thinking, Six Sigma, Business Communication, Myers-Briggs psychological drivers, and Leadership Style.';
        title = '105-Question Leadership Diagnostic';
        break;
      default:
        readText = 'Learnova Services. Learn and Innovate Mindsets and Ideas.';
        title = 'Learnova Services';
    }

    speechService.speak(readText, title, language);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1B4332] selection:bg-[#E07A5F] selection:text-white font-['Plus_Jakarta_Sans']">
      {/* Persistent Responsive Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
        onTriggerPageAudio={handleTriggerPageAudio}
      />

      {/* Main Page View Renderer */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            language={language}
            setLanguage={setLanguage}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'about' && (
          <AboutUsPage language={language} setLanguage={setLanguage} />
        )}

        {currentPage === 'manufacturing' && (
          <ManufacturingPage language={language} setLanguage={setLanguage} />
        )}

        {currentPage === 'automobile' && (
          <AutomobilePage language={language} setLanguage={setLanguage} />
        )}

        {currentPage === 'general' && (
          <GeneralProgramsPage language={language} setLanguage={setLanguage} />
        )}

        {currentPage === 'mandatory' && (
          <MandatoryCompliancePage language={language} setLanguage={setLanguage} />
        )}

        {currentPage === 'leadership-quiz' && (
          <LeadershipQuizPage language={language} setLanguage={setLanguage} />
        )}
      </main>

      {/* Persistent Floating Audio Controller */}
      <AudioPlayerBar language={language} />

      {/* Master Corporate Footer */}
      <Footer
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
      />
    </div>
  );
}
