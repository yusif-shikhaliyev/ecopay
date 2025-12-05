import { Translations, Language } from './types';
import { Leaf, Recycle, CreditCard, CheckCircle, Smartphone } from 'lucide-react';

export const TEXTS: Translations = {
  [Language.AZE]: {
    welcome: "Xoş Gəlmisiniz",
    subtitle: "Təbiəti qoruyun, gələcəyi qazanın",
    scanCard: "Kartınızı Oxudun",
    scanCardSub: "Davam etmək üçün kartı terminala yaxınlaşdırın",
    selectMaterial: "Tullantı Növünü Seçin",
    plastic: "Plastik",
    paper: "Kağız",
    insertItems: "Tullantıları Daxil Edin",
    currentPoints: "Cari Xal",
    count: "Say",
    confirm: "Təsdiq Et",
    processing: "Hesablanır...",
    successTitle: "Uğurla Tamamlandı",
    successMessage: "Xallar hesabınıza uğurla yükləndi.",
    simulatedSensor: "Simulyasiya: Cihaz",
    paperComingSoon: "Tezliklə...",
  },
  [Language.ENG]: {
    welcome: "Welcome",
    subtitle: "Protect nature, earn the future",
    scanCard: "Scan Your Card",
    scanCardSub: "Tap your card on the reader to continue",
    selectMaterial: "Select Material Type",
    plastic: "Plastic",
    paper: "Paper",
    insertItems: "Insert Items",
    currentPoints: "Current Points",
    count: "Count",
    confirm: "Confirm",
    processing: "Processing...",
    successTitle: "Successfully Completed",
    successMessage: "Points have been successfully loaded to your account.",
    simulatedSensor: "Simulation: Sensor",
    paperComingSoon: "Coming Soon...",
  },
  [Language.RU]: {
    welcome: "Добро пожаловать",
    subtitle: "Берегите природу, зарабатывайте будущее",
    scanCard: "Сканируйте карту",
    scanCardSub: "Приложите карту к терминалу для продолжения",
    selectMaterial: "Выберите тип отходов",
    plastic: "Пластик",
    paper: "Бумага",
    insertItems: "Вставьте предметы",
    currentPoints: "Текущие баллы",
    count: "Количество",
    confirm: "Подтвердить",
    processing: "Обработка...",
    successTitle: "Успешно завершено",
    successMessage: "Баллы успешно зачислены на ваш счет.",
    simulatedSensor: "Симуляция: Датчик",
    paperComingSoon: "Скоро...",
  }
};

export const POINTS_PER_PLASTIC = 10;
export const POINTS_PER_PAPER = 5;

// Fallback image for simulation
export const BG_PATTERN = "https://picsum.photos/1920/1080?blur=10";