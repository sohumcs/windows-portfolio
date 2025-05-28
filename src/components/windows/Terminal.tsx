
import React, { useState, useRef, useEffect } from 'react';

export const Terminal = () => {
  const [history, setHistory] = useState<Array<{type: 'input' | 'output', content: string}>>([
    { type: 'output', content: 'Portfolio Terminal v1.0.0' },
    { type: 'output', content: 'Type "help" for available commands.' },
    { type: 'output', content: '' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  whoami      - Display user information',
      '  projects    - List all projects',
      '  skills      - Show technical skills',
      '  contact     - Display contact information',
      '  experience  - Show work experience',
      '  clear       - Clear the terminal',
      '  date        - Show current date and time',
      '  joke        - Tell a programmer joke',
      ''
    ],
    whoami: () => [
      'User: Passionate Software Developer',
      'Role: Full Stack Developer',
      'Status: Available for opportunities',
      'Experience: 5+ years in software development',
      ''
    ],
    projects: () => [
      'Recent Projects:',
      '  → E-Commerce Platform (React, Node.js)',
      '  → Social Media Dashboard (Vue.js, MongoDB)',
      '  → Task Management App (React, Firebase)',
      '  → Mobile Fitness Tracker (React Native)',
      '  → AI Chatbot Assistant (Python, TensorFlow)',
      ''
    ],
    skills: () => [
      'Technical Skills:',
      '  Frontend: React, Vue.js, TypeScript, Tailwind CSS',
      '  Backend: Node.js, Python, Express, Django',
      '  Database: PostgreSQL, MongoDB, Redis',
      '  Cloud: AWS, Docker, Kubernetes',
      '  Tools: Git, Webpack, Jest, Cypress',
      ''
    ],
    contact: () => [
      'Contact Information:',
      '  Email: developer@email.com',
      '  GitHub: github.com/yourusername',
      '  LinkedIn: linkedin.com/in/yourprofile',
      '  Portfolio: https://yourportfolio.dev',
      ''
    ],
    experience: () => [
      'Work Experience:',
      '  2022-Present: Senior Software Developer @ Tech Innovations Inc.',
      '  2020-2022: Full Stack Developer @ Digital Solutions Ltd.',
      '  2019-2020: Frontend Developer @ StartupXYZ',
      ''
    ],
    clear: () => {
      setHistory([
        { type: 'output', content: 'Portfolio Terminal v1.0.0' },
        { type: 'output', content: 'Type "help" for available commands.' },
        { type: 'output', content: '' }
      ]);
      return [];
    },
    date: () => [new Date().toLocaleString(), ''],
    joke: () => {
      const jokes = [
        'Why do programmers prefer dark mode? Because light attracts bugs!',
        'How many programmers does it take to change a light bulb? None, that\'s a hardware problem.',
        'Why do Java developers wear glasses? Because they can\'t C#!',
        'There are only 10 types of people: those who understand binary and those who don\'t.',
        'Why did the programmer quit his job? He didn\'t get arrays.'
      ];
      return [jokes[Math.floor(Math.random() * jokes.length)], ''];
    }
  };

  const executeCommand = (input: string) => {
    const trimmedInput = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'input' as const, content: `$ ${input}` }];
    
    if (trimmedInput === '') {
      setHistory([...newHistory, { type: 'output', content: '' }]);
      return;
    }

    if (commands[trimmedInput as keyof typeof commands]) {
      const output = commands[trimmedInput as keyof typeof commands]();
      if (Array.isArray(output)) {
        output.forEach(line => {
          newHistory.push({ type: 'output', content: line });
        });
      }
    } else {
      newHistory.push({ 
        type: 'output', 
        content: `Command not found: ${trimmedInput}. Type "help" for available commands.` 
      });
      newHistory.push({ type: 'output', content: '' });
    }

    setHistory(newHistory);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(currentInput);
    setCurrentInput('');
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="h-full bg-black text-green-400 font-mono text-sm flex flex-col">
      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, index) => (
          <div key={index} className={entry.type === 'input' ? 'text-white' : 'text-green-400'}>
            {entry.content}
          </div>
        ))}
        
        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-white mr-1">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white caret-green-400"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 text-gray-300 px-4 py-1 text-xs flex justify-between">
        <span>Portfolio Terminal</span>
        <span>{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};
