import React from 'react';

export const metadata = {
  title: 'Privacy Policy | Shambhavaa',
  description: 'Our privacy policy outlines how we handle your data and ensure your privacy on Shambhavaa.blog.',
};

export default function PrivacyPage() {
  return (
    <div className="container" style={{ padding: 'var(--spacing-lg) 0', maxWidth: '800px' }}>
      <section className="animate-fade-in">
        <h1 className="text-gold" style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>Privacy Policy</h1>
        
        <div className="article-content" style={{ fontSize: '0.95rem' }}>
          <p>Last Updated: May 9, 2026</p>
          
          <p>
            At Shambhavaa.blog, accessible from https://shambhavaa.blog, one of our main priorities is the privacy of our visitors. 
            This Privacy Policy document contains types of information that is collected and recorded by Shambhavaa.blog and how we use it.
          </p>

          <h2 className="text-gold">Log Files</h2>
          <p>
            Shambhavaa.blog follows a standard procedure of using log files. These files log visitors when they visit websites. 
            The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), 
            date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is 
            personally identifiable.
          </p>

          <h2 className="text-gold">Cookies and Web Beacons</h2>
          <p>
            Like any other website, Shambhavaa.blog uses 'cookies'. These cookies are used to store information including visitors' 
            preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the 
            users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>

          <h2 className="text-gold">Google DoubleClick DART Cookie</h2>
          <p>
            Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site 
            visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to 
            decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – 
            <a href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</a>
          </p>

          <h2 className="text-gold">Our Advertising Partners</h2>
          <p>
            Some of advertisers on our site may use cookies and web beacons. Our advertising partners include:
          </p>
          <ul>
            <li>Google (AdSense)</li>
          </ul>

          <h2 className="text-gold">Privacy Policies</h2>
          <p>
            Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in 
            their respective advertisements and links that appear on Shambhavaa.blog, which are sent directly to users' browser. 
            They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness 
            of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
          </p>

          <h2 className="text-gold">Third Party Privacy Policies</h2>
          <p>
            Shambhavaa.blog's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult 
            the respective Privacy Policies of these third-party ad servers for more detailed information.
          </p>

          <h2 className="text-gold">Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
          </p>
        </div>
      </section>
    </div>
  );
}
