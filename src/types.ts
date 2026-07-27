export type ActivityType = 
  | 'wheeling' 
  | 'strength' 
  | 'physio' 
  | 'swimming' 
  | 'handcycling' 
  | 'mobility';

export type PushIntensity = 'light' | 'moderate' | 'vigorous';

export type TerrainType = 'paved' | 'track' | 'indoor' | 'incline' | 'water' | 'trail';

export type FeelRating = 'energized' | 'relaxed' | 'strong' | 'challenged';

export interface ActivityLog {
  id: string;
  type: ActivityType;
  title: string;
  distanceKm: number; // 0 for non-distance activities
  durationMinutes: number;
  timestamp: string; // ISO String
  pushIntensity?: PushIntensity;
  terrain?: TerrainType;
  feelRating?: FeelRating;
  notes?: string;
  energyBurnedEst?: number;
}

export interface WeeklyGoals {
  distanceKm: number;
  activeMinutes: number;
  workoutsCount: number;
}

export type MobilityProfileType = 
  | 'manual_wheelchair' 
  | 'powered_wheelchair' 
  | 'limited_mobility' 
  | 'physio_recovery';

export interface UserProfile {
  name: string;
  profileType: MobilityProfileType;
  mobilityNotes?: string;
  chairType?: string;
  joinedDate: string;
  email?: string;
}

export type ExerciseCategory = 'cardio' | 'strength' | 'mobility' | 'physio';

export interface Exercise {
  id: string;
  title: string;
  category: ExerciseCategory;
  shortDescription: string;
  fullInstructions: string[];
  durationMinutes: number;
  targetMuscles: string[];
  equipmentNeeded: string;
  mobilitySuitability: MobilityProfileType[];
  caloriesEst: number;
  difficulty: 'Gentle' | 'Moderate' | 'Challenging';
  iconName: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  progressPercent: number;
  category: 'distance' | 'streak' | 'workout' | 'physio';
}

export interface AppSettings {
  darkMode: boolean;
  highContrast: boolean;
  textSize: 'normal' | 'large' | 'xlarge';
  distanceUnit: 'km' | 'miles';
  audioFeedback: boolean;
  reminderTimes: string[];
}

export type TabType = 'dashboard' | 'log' | 'library' | 'progress' | 'profile' | 'settings';

export interface DailySummary {
  dateStr: string; // YYYY-MM-DD
  dayLabel: string; // Mon, Tue...
  distanceKm: number;
  activeMinutes: number;
  workoutsCount: number;
}
