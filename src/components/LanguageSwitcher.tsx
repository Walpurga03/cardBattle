import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <button className={className} onClick={() => changeLanguage('de')}>Deutsch</button>
      <button className={className} onClick={() => changeLanguage('en')}>English</button>
    </div>
  );
};

export default LanguageSwitcher;