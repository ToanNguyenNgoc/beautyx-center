import { useTranslation } from 'react-i18next';
import vi from '../../i18n/translation/vi.json';

type TextPathType = keyof typeof vi;
export function useTranslate() {
  const { t: initT, i18n } = useTranslation();
  const t = (text: TextPathType) => initT(text);
  const langs = {
    vi: { value: 'vi', icon: '', label:t('Vietnamese') },
    en: { value: 'en', icon: '', label:t('English') },
  }
  const onChangeLang = (lang: keyof typeof langs) => i18n.changeLanguage(lang);
  return {
    t,
    onChangeLang,
    list: Object.values(langs),
    currentLang: i18n.language,
  }
}