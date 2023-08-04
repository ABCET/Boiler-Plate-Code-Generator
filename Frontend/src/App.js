import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import DropDown from './components/DropDown';
import './App.css';

const App = () => {
  const [selectedStack, setSelectedStack] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedComponent, setSelectedComponent] = useState(''); // New state for selected component
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(''); // New state for selected algorithm
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStackChange = (selectedValue) => {
    setSelectedStack(selectedValue);
    setSelectedComponent(''); // Reset selected component when stack changes
    setSelectedAlgorithm(''); // Reset selected algorithm when stack changes
  };

  const handleLanguageChange = (selectedValue) => {
    setSelectedLanguage(selectedValue);
  };

  const handleComponentChange = (selectedValue) => {
    setSelectedComponent(selectedValue);
  };

  const handleAlgorithmChange = (selectedValue) => {
    setSelectedAlgorithm(selectedValue);
  };

  const generateCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/generate-code', {
        selectedStack,
        selectedLanguage,
        selectedComponent, // Pass selected component to the server
        selectedAlgorithm, // Pass selected algorithm to the server
      });

      setOutput(response.data.code);
    } catch (error) {
      console.error('Error generating code:', error);
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = output;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  // Create object for stack-specific libraries
  const stackLibraries = {
    'Frontend Development': [
      'JavaScript',
      'React',
      'Angular',
      'Vue.js',
      'Svelte',
      /* Add other frontend libraries here */
    ],
    'Backend Development': [
      'Node.js',
      'Express.js',
      'Django',
      'Ruby on Rails',
      /* Add other backend libraries here */
    ],
    'Mobile App Development': [
      'Flutter',
      'React Native',
      'Swift',
      'Kotlin',
      /* Add other mobile app libraries here */
    ],
    'AI/ML': [
      'Python',
      'TensorFlow',
      'PyTorch',
      'Scikit-learn',
      /* Add other ML/AI libraries here */
    ],
    'Database': [
      'MongoDB',
      'MySQL',
      'PostgreSQL',
      'SQLite',
      /* Add other database libraries here */
    ],
    'Data Visualization': [
      'D3.js',
      'Plotly',
      'Tableau',
      /* Add other data visualization libraries here */
    ],
  };

  // Get the relevant libraries based on the selected stack
  const getLibrariesForStack = () => stackLibraries[selectedStack] || [];

  return (
    <div className="container">
      <Header />

      <div className="content">
        {/* Left box */}
        <div className="left-box">
          <DropDown
            label="Select Stack"
            options={[
              'Frontend Development',
              'Backend Development',
              'Mobile App Development',
              'AI/ML',
              'Database',
              'Data Visualization',
              /* Add other stacks here */
            ]}
            onChange={handleStackChange}
          />

          {selectedStack === 'Frontend Development' && ( // Show component dropdown only for Frontend Development
            <>
              <DropDown
                label="Select Component"
                options={[
                  'Button',
                  'Form',
                  'Carousel',
                  'Navbar',
                  /* Add other frontend components here */
                ]}
                onChange={handleComponentChange}
              />
            </>
          )}

          {selectedStack === 'AI/ML' && ( // Show algorithm dropdown only for AI/ML
            <>
              <DropDown
                label="Select Algorithm"
                options={[
                  'Linear Regression',
                  'Logistic Regression',
                  'Random Forest',
                  'Neural Networks',
                  'Support Vector Machines',
                  /* Add other ML/AI algorithms here */
                ]}
                onChange={handleAlgorithmChange}
              />
            </>
          )}

          {/* Language/Library dropdown for all stacks */}
          <DropDown
            label="Select Language/Library"
            options={getLibrariesForStack()} // Get relevant libraries based on the selected stack
            onChange={handleLanguageChange}
          />

          <button onClick={generateCode} disabled={!selectedStack || !selectedLanguage || loading}>
            {loading ? 'Generating...' : 'Generate Code'}
          </button>
        </div>

        {/* Right box */}
        <div className="right-box">
          <pre>{output}</pre>
          <div className="button-container">
            <button onClick={copyToClipboard}>Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
