// page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import homeData from '../data/home.json';
import './globals.css';

export default function Home() {
  const [language, setLanguage] = useState('en');
  
  useEffect(() => {
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
      setLanguage(savedLang);
    }
    console.log('当前语言:', language);
    console.log('homeData内容:', homeData);
    console.log('中文内容:', homeData.zh);
  }, [language]);
    
    useEffect(() => {
      const savedLang = localStorage.getItem('preferred-language');
      if (savedLang) {
        setLanguage(savedLang);
      }
    }, [language]);

    // 🔽 在这里添加这两个函数 🔽
    const showWechatQR = () => {
      const modal = document.getElementById('wechatQRModal');
      if (modal) modal.style.display = 'block';
    };

    const closeWechatQR = () => {
      const modal = document.getElementById('wechatQRModal');
      if (modal) modal.style.display = 'none';
    };
    // 🔼 添加到这里结束 🔼
    
  const content = homeData[language as keyof typeof homeData];
    
  console.log('渲染内容:', content);
    
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'zh' : 'en';
    console.log('切换语言到:', newLang);
    setLanguage(newLang);
    localStorage.setItem('preferred-language', newLang);
  };

  return (
    <div className="home-container">
      <div className="home-layout">
        
        <div className="home-left-column">
          <div className="home-logo">
            <div className="ashtanga-text">{language === 'zh' ? '🌞' : '🌛'}</div>
          </div>
          
          <div className="home-name">{content.studioName}</div>
          
          <div className="home-contact-icons">
            <a href="mailto:infor@xbyoga.com" className="home-contact-icon">
              <i className="fas fa-envelope"></i>
            </a>
          <a href="javascript:void(0)" className="home-contact-icon" onClick={showWechatQR}>
              <i className="fab fa-weixin"></i>
            </a>
            <a href="https://www.instagram.com/xbyoga" className="home-contact-icon" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>

          <div className="home-member-section">
            <div className="auth-buttons">
              <button className="home-auth-btn icon-only login" title={language === 'en' ? 'Member Centre' : '会员中心'}>
                <i className="fas fa-user"></i>
              </button>
              <button
                className="lang-btn-single"
                onClick={toggleLanguage}
                title={language === 'en' ? 'Switch to Chinese' : '切换到英文'}
              >
                {language === 'en' ? '🇨🇳' : '🇬🇧'}
              </button>
            </div>
          </div>
        </div>

        <div className="home-right-column">
          <section className="home-section">
            <h2 className="home-section-title">{content.coursesTitle}</h2>
            <div className="home-items-list">
              <Link href="/courses/ashtanga" className="home-item">{content.ashtanga}</Link>
              <Link href="/courses/sanskrit" className="home-item">{content.sanskrit}</Link>
            </div>
          </section>

          <section className="home-section">
            <h2 className="home-section-title">{content.knowledgeTitle}</h2>
            <div className="home-items-list">
              <Link href="/knowledge/yoga-foundation" className="home-item">{content.yogaFoundation}</Link>
              <Link href="/knowledge/sanskrit-wisdom" className="home-item">{content.sanskritWisdom}</Link>
              <Link href="/knowledge/yoga-philosophy" className="home-item">{content.yogaPhilosophy}</Link>
            </div>
          </section>
        </div>
      </div>
          
          <div id="wechatQRModal" className="qr-modal">
                 <div className="qr-modal-content">
                   <span className="qr-close" onClick={closeWechatQR}>&times;</span>
                   <h3>{language === 'en' ? 'Add WeChat' : '添加微信'}</h3>
                   <img src="/images/wechat-qr.jpg" alt="WeChat QR Code" className="qr-image" />
                   <p>{language === 'en' ? 'Scan QR code to contact me' : '扫描二维码联系我'}</p>
                   <p className="qr-username">WeChat ID: xbyogi</p>
                 </div>
               </div>
    </div>
  );
}
// trigger deployment
