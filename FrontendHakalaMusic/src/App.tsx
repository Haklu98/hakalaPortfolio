import { useState } from 'react';
import Navigation from './components/navigation';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Portfolio from './pages/portfolio/Portfolio';
import Contact from './pages/contact/Contact';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('en');

  const renderPage = () => {
    switch(currentPage) {
      case 'about': return <About language={language} />;
      case 'portfolio': return <Portfolio language={language} />;
      case 'contact': return <Contact language={language} />;
      default: return <Home language={language} />;
    }
  };

  return (
    <div className="app">
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
      />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App
