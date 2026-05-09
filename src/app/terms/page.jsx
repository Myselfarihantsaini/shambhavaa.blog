import React from 'react';

export const metadata = {
  title: 'Terms & Conditions | Shambhavaa',
  description: 'The terms and conditions for using Shambhavaa.blog.',
};

export default function TermsPage() {
  return (
    <div className="container" style={{ padding: 'var(--spacing-lg) 0', maxWidth: '800px' }}>
      <section className="animate-fade-in">
        <h1 className="text-gold" style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>Terms & Conditions</h1>
        
        <div className="article-content" style={{ fontSize: '0.95rem' }}>
          <p>Last Updated: May 9, 2026</p>
          
          <p>
            Welcome to Shambhavaa.blog. By accessing this website, we assume you accept these terms and conditions. 
            Do not continue to use Shambhavaa.blog if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-gold">Intellectual Property Rights</h2>
          <p>
            Unless otherwise stated, Shambhavaa and/or its licensors own the intellectual property rights for all material 
            on Shambhavaa.blog. All intellectual property rights are reserved. You may access this from Shambhavaa.blog 
            for your own personal use subjected to restrictions set in these terms and conditions.
          </p>

          <p>You must not:</p>
          <ul>
            <li>Republish material from Shambhavaa.blog</li>
            <li>Sell, rent or sub-license material from Shambhavaa.blog</li>
            <li>Reproduce, duplicate or copy material from Shambhavaa.blog</li>
            <li>Redistribute content from Shambhavaa.blog</li>
          </ul>

          <h2 className="text-gold">User Comments</h2>
          <p>
            Parts of this website offer an opportunity for users to post and exchange opinions and information in certain 
            areas of the website. Shambhavaa does not filter, edit, publish or review Comments prior to their presence 
            on the website. Comments do not reflect the views and opinions of Shambhavaa, its agents and/or affiliates.
          </p>

          <h2 className="text-gold">Hyperlinking to our Content</h2>
          <p>
            The following organizations may link to our Website without prior written approval:
          </p>
          <ul>
            <li>Government agencies;</li>
            <li>Search engines;</li>
            <li>News organizations;</li>
          </ul>

          <h2 className="text-gold">Disclaimer of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions 
            relating to our website and the use of this website. Nothing in this disclaimer will:
          </p>
          <ul>
            <li>limit or exclude our or your liability for death or personal injury;</li>
            <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
            <li>limit any of our or your liabilities in any way that is not permitted under applicable law;</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
