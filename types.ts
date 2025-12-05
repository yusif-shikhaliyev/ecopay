export enum Language {
  AZE = 'aze',
  ENG = 'eng',
  RU = 'ru'
}

export enum AppStep {
  WELCOME = 'welcome',
  SCAN_CARD = 'scan_card',
  SELECT_TYPE = 'select_type',
  INSERTING = 'inserting',
  PROCESSING = 'processing',
  SUCCESS = 'success',
}

export enum MaterialType {
  PLASTIC = 'plastic',
  PAPER = 'paper'
}

export interface Translation {
  welcome: string;
  subtitle: string;
  scanCard: string;
  scanCardSub: string;
  selectMaterial: string;
  plastic: string;
  paper: string;
  insertItems: string;
  currentPoints: string;
  count: string;
  confirm: string;
  processing: string;
  successTitle: string;
  successMessage: string;
  simulatedSensor: string;
  paperComingSoon: string;
}

export type Translations = Record<Language, Translation>;