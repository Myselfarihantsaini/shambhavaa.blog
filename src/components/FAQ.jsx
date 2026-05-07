'use client';
import { useState } from 'react';

export default function FAQ({ questions }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div style={{ marginTop: '3rem', marginBottom: '3rem' }}>
      <h3 style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem' }}>Frequently Asked Questions</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {questions.map((item, index) => (
          <div 
            key={index} 
            style={{ 
              border: '1px solid var(--border-color)', 
              borderRadius: '8px', 
              overflow: 'hidden',
              background: openIndex === index ? 'rgba(212, 175, 55, 0.05)' : 'transparent'
            }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              style={{
                width: '100%',
                padding: '1.5rem',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{item.question}</span>
              <span style={{ 
                color: 'var(--accent-gold)', 
                fontSize: '1.5rem',
                transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>+</span>
            </button>
            <div style={{
              maxHeight: openIndex === index ? '500px' : '0',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              padding: openIndex === index ? '0 1.5rem 1.5rem 1.5rem' : '0 1.5rem'
            }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
