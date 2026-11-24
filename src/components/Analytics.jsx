import Script from 'next/script';
import { ANALYTICS, ADSENSE } from '../config/site';

// Consent Mode v2: everything starts "denied" until the visitor chooses.
const consentDefaults = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
try{var c=JSON.parse(localStorage.getItem('shambhavaa-consent-v2')||'null');if(c){gtag('consent','update',{analytics_storage:c.analytics?'granted':'denied',ad_storage:c.ads?'granted':'denied',ad_user_data:c.ads?'granted':'denied',ad_personalization:c.ads?'granted':'denied'});}}catch(e){}
gtag('js',new Date());
gtag('config','${ANALYTICS.gaId}',{anonymize_ip:true});
`;

export function ConsentDefaults() {
  return <script id="consent-defaults" dangerouslySetInnerHTML={{ __html: consentDefaults }} />;
}

export default function Analytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.gaId}`} strategy="afterInteractive" />
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE.client}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
    </>
  );
}
