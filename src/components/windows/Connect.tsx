
import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, MessageCircle } from 'lucide-react';

export const Connect = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="w-8 h-8" />,
      description: 'Check out my open source projects and contributions',
      url: 'https://github.com',
      color: 'bg-gray-800 hover:bg-gray-700'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-8 h-8" />,
      description: 'Connect with me professionally',
      url: 'https://linkedin.com',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Email',
      icon: <Mail className="w-8 h-8" />,
      description: 'Send me a direct message',
      url: 'mailto:developer@email.com',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      name: 'Portfolio',
      icon: <ExternalLink className="w-8 h-8" />,
      description: 'Visit my personal website',
      url: 'https://yourportfolio.dev',
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <MessageCircle className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Let's Connect!</h1>
          <p className="text-gray-600 text-lg">
            I'm always excited to discuss new opportunities, collaborate on projects, or just chat about tech!
          </p>
        </div>

        {/* Social Links Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                ${link.color} text-white p-6 rounded-xl shadow-lg 
                transform hover:scale-105 transition-all duration-300
                block group
              `}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {link.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{link.name}</h3>
                  <p className="text-white/90 text-sm">{link.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-sm font-medium">
                    <span>Connect now</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Message</h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Tell me about your project or just say hi!"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Availability Status */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-800 font-medium">Currently available for new projects!</span>
          </div>
          <p className="text-green-700 text-sm mt-1">
            Response time: Usually within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
};
