import { 
  ActivityLog, 
  UserProfile, 
  WeeklyGoals, 
  Exercise, 
  Badge, 
  AppSettings 
} from '../types';

export const INITIAL_PROFILE: UserProfile = {
  name: 'Alex Rivera',
  profileType: 'manual_wheelchair',
  chairType: 'TiLite Aero Z (Custom Fit)',
  mobilityNotes: 'Focusing on shoulder stamina, posture alignment, and endurance.',
  joinedDate: '2026-01-15',
};

export const INITIAL_GOALS: WeeklyGoals = {
  distanceKm: 25.0,
  activeMinutes: 210,
  workoutsCount: 5,
};

export const INITIAL_SETTINGS: AppSettings = {
  darkMode: false,
  highContrast: false,
  textSize: 'normal',
  distanceUnit: 'km',
  audioFeedback: true,
  reminderTimes: ['09:30', '15:00'],
};

// Helper to generate dates relative to today
const today = new Date();
const getDateAgo = (daysAgo: number, hoursOffset = 10): string => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hoursOffset, 15, 0, 0);
  return d.toISOString();
};

export const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act-1',
    type: 'wheeling',
    title: 'Morning Park Roll & Pushes',
    distanceKm: 4.8,
    durationMinutes: 38,
    timestamp: getDateAgo(0, 9), // Today 9 AM
    pushIntensity: 'moderate',
    terrain: 'paved',
    feelRating: 'energized',
    notes: 'Great weather! Kept steady cadence with focus on smooth push-through.',
    energyBurnedEst: 210,
  },
  {
    id: 'act-2',
    type: 'physio',
    title: 'Shoulder Guardian & Posture Care',
    distanceKm: 0,
    durationMinutes: 20,
    timestamp: getDateAgo(0, 15), // Today 3 PM
    feelRating: 'relaxed',
    notes: 'Resistance band external rotations & scapular retractions. Zero joint pain.',
    energyBurnedEst: 75,
  },
  {
    id: 'act-3',
    type: 'strength',
    title: 'Seated Dumbbell Upper Body',
    distanceKm: 0,
    durationMinutes: 30,
    timestamp: getDateAgo(1, 10), // Yesterday
    feelRating: 'strong',
    notes: '3 sets of seated overhead press, chest flyes, and bicep curls.',
    energyBurnedEst: 165,
  },
  {
    id: 'act-4',
    type: 'wheeling',
    title: 'Evening Track Pushes',
    distanceKm: 3.5,
    durationMinutes: 28,
    timestamp: getDateAgo(1, 18),
    pushIntensity: 'vigorous',
    terrain: 'track',
    feelRating: 'challenged',
    notes: '4x 400m sprint pushes with active recovery intervals.',
    energyBurnedEst: 195,
  },
  {
    id: 'act-5',
    type: 'swimming',
    title: 'Adaptive Pool Laps & Water Aerobics',
    distanceKm: 1.2,
    durationMinutes: 45,
    timestamp: getDateAgo(2, 11),
    terrain: 'water',
    feelRating: 'energized',
    notes: 'Freestyle arm pulls with buoy legs support. Feel weightless and loose.',
    energyBurnedEst: 240,
  },
  {
    id: 'act-6',
    type: 'wheeling',
    title: 'Neighborhood Distance Push',
    distanceKm: 5.2,
    durationMinutes: 42,
    timestamp: getDateAgo(3, 9),
    pushIntensity: 'moderate',
    terrain: 'paved',
    feelRating: 'energized',
    notes: 'Smooth asphalt route. Maintained 7.4 km/h average pace.',
    energyBurnedEst: 230,
  },
  {
    id: 'act-7',
    type: 'physio',
    title: 'Rotator Cuff & Torso Mobility',
    distanceKm: 0,
    durationMinutes: 25,
    timestamp: getDateAgo(4, 16),
    feelRating: 'relaxed',
    notes: 'Subscapularis & rear deltoid stretches.',
    energyBurnedEst: 85,
  },
  {
    id: 'act-8',
    type: 'handcycling',
    title: 'Riverfront Trail Handcycling',
    distanceKm: 8.5,
    durationMinutes: 50,
    timestamp: getDateAgo(5, 10),
    pushIntensity: 'vigorous',
    terrain: 'paved',
    feelRating: 'strong',
    notes: 'Handcycle high gear endurance ride. Reached new max velocity!',
    energyBurnedEst: 320,
  },
  {
    id: 'act-9',
    type: 'strength',
    title: 'Core Stability & Seated Twists',
    distanceKm: 0,
    durationMinutes: 25,
    timestamp: getDateAgo(6, 14),
    feelRating: 'strong',
    notes: 'Seated medicine ball twists & forward lean controls.',
    energyBurnedEst: 110,
  },
  {
    id: 'act-10',
    type: 'wheeling',
    title: 'Community Center Roll',
    distanceKm: 3.8,
    durationMinutes: 30,
    timestamp: getDateAgo(7, 10),
    pushIntensity: 'moderate',
    terrain: 'indoor',
    feelRating: 'energized',
    notes: 'Smooth hardwood floor pushes.',
    energyBurnedEst: 160,
  }
];

export const EXERCISE_LIBRARY: Exercise[] = [
  {
    id: 'ex-1',
    title: 'Seated Shadow Boxing Cardio',
    category: 'cardio',
    shortDescription: 'High-energy upper body cardio building arm speed, heart rate, and shoulder endurance.',
    fullInstructions: [
      'Sit comfortably upright with your back supported or self-stabilized.',
      'Bring hands to guard position near chin level.',
      'Alternate rhythmically between jabs, crosses, hooks, and uppercuts for 45 seconds.',
      'Rest for 15 seconds. Repeat for 3 to 5 full rounds.'
    ],
    durationMinutes: 15,
    targetMuscles: ['Deltoids', 'Triceps', 'Core Stabilizers', 'Pectorals'],
    equipmentNeeded: 'None (Optional light wrist weights)',
    mobilitySuitability: ['manual_wheelchair', 'powered_wheelchair', 'limited_mobility', 'physio_recovery'],
    caloriesEst: 110,
    difficulty: 'Moderate',
    iconName: 'Flame'
  },
  {
    id: 'ex-2',
    title: 'Shoulder Guardian: Band Rotations',
    category: 'physio',
    shortDescription: 'Essential rotator cuff strengthening to protect shoulders from manual push strain.',
    fullInstructions: [
      'Anchor a light resistance band at elbow height or hold with both hands.',
      'Keep elbows pinned gently at 90 degrees against your ribs.',
      'Slowly rotate forearms outward away from center line, feeling rear shoulders contract.',
      'Control the return movement over 3 seconds. Perform 12-15 controlled repetitions.'
    ],
    durationMinutes: 12,
    targetMuscles: ['Infraspinatus', 'Teres Minor', 'Rhomboids'],
    equipmentNeeded: 'Light Resistance Band',
    mobilitySuitability: ['manual_wheelchair', 'powered_wheelchair', 'limited_mobility', 'physio_recovery'],
    caloriesEst: 45,
    difficulty: 'Gentle',
    iconName: 'ShieldCheck'
  },
  {
    id: 'ex-3',
    title: 'Wheelchair Push-Interval Sprints',
    category: 'cardio',
    shortDescription: 'High Intensity Interval Training (HIIT) adapted for wheelchair push mechanics.',
    fullInstructions: [
      'Ensure wheel locks are OFF and path/track is clear and level.',
      'Warm up with 3 minutes of gentle, smooth propulsion.',
      'Sprint push as fast and explosively as possible for 30 seconds with full arm extension.',
      'Roll gently for 60 seconds recovery. Complete 6 to 8 sprint cycles.'
    ],
    durationMinutes: 20,
    targetMuscles: ['Triceps', 'Anterior Deltoids', 'Lats', 'Pectorals'],
    equipmentNeeded: 'Manual Wheelchair & Open Flat Area',
    mobilitySuitability: ['manual_wheelchair'],
    caloriesEst: 160,
    difficulty: 'Challenging',
    iconName: 'Zap'
  },
  {
    id: 'ex-4',
    title: 'Band Pull-Aparts & Scapular Squeeze',
    category: 'strength',
    shortDescription: 'Counters forward slouching by strengthening mid-back postural muscles.',
    fullInstructions: [
      'Hold resistance band at chest height with arms extended forward.',
      'Pull band apart by squeezing shoulder blades together until band touches upper chest.',
      'Hold the contraction for 2 seconds at peak tension.',
      'Return slowly to starting position. Perform 3 sets of 12 reps.'
    ],
    durationMinutes: 10,
    targetMuscles: ['Rhomboids', 'Middle Trapezius', 'Rear Deltoids'],
    equipmentNeeded: 'Medium Resistance Band',
    mobilitySuitability: ['manual_wheelchair', 'powered_wheelchair', 'limited_mobility', 'physio_recovery'],
    caloriesEst: 55,
    difficulty: 'Gentle',
    iconName: 'Activity'
  },
  {
    id: 'ex-5',
    title: 'Seated Torso Twists & Core Reach',
    category: 'mobility',
    shortDescription: 'Improves spinal rotation, trunk control, and lateral wheelchair stability.',
    fullInstructions: [
      'Engage wheel brakes securely.',
      'Reach right arm across body toward left wheel rim or armrest, rotating upper torso.',
      'Hold stretch for 3 deep breaths feeling space in ribcage and oblique muscles.',
      'Switch sides smoothly. Repeat 8 times per side.'
    ],
    durationMinutes: 10,
    targetMuscles: ['Obliques', 'Paraspinal Muscles', 'Latissimus Dorsi'],
    equipmentNeeded: 'None',
    mobilitySuitability: ['manual_wheelchair', 'powered_wheelchair', 'limited_mobility', 'physio_recovery'],
    caloriesEst: 40,
    difficulty: 'Gentle',
    iconName: 'RefreshCw'
  },
  {
    id: 'ex-6',
    title: 'Upper-Body Arm Ergometer Cycling',
    category: 'cardio',
    shortDescription: 'Sustained cardiovascular conditioning using an arm crank / table ergometer.',
    fullInstructions: [
      'Position chair close to ergometer with chest aligned with pedal axis.',
      'Lock chair brakes for complete stability.',
      'Set resistance to light-moderate and pedal smoothly at 60-70 RPM.',
      'Reverse crank direction halfway through to balance triceps and biceps engagement.'
    ],
    durationMinutes: 25,
    targetMuscles: ['Biceps', 'Triceps', 'Chest', 'Shoulders'],
    equipmentNeeded: 'Arm Ergometer / Upper Body Crank',
    mobilitySuitability: ['manual_wheelchair', 'powered_wheelchair', 'limited_mobility'],
    caloriesEst: 180,
    difficulty: 'Moderate',
    iconName: 'RotateCw'
  },
  {
    id: 'ex-7',
    title: 'Seated Dumbbell Overhead Press',
    category: 'strength',
    shortDescription: 'Builds functional pressing strength for transfers, overhead reaches, and propulsion power.',
    fullInstructions: [
      'Hold dumbbells or water bottles at shoulder height with palms facing forward.',
      'Press weights vertically until arms are extended overhead without locking elbows.',
      'Lower under control back to ear level over 2-3 seconds.',
      'Complete 3 sets of 10-12 repetitions.'
    ],
    durationMinutes: 15,
    targetMuscles: ['Anterior Deltoids', 'Triceps Brachii', 'Upper Trapezius'],
    equipmentNeeded: 'Dumbbells (2-8 kg) or Resistance Bands',
    mobilitySuitability: ['manual_wheelchair', 'powered_wheelchair', 'limited_mobility'],
    caloriesEst: 95,
    difficulty: 'Moderate',
    iconName: 'TrendingUp'
  },
  {
    id: 'ex-8',
    title: 'Neck, Chest & Scapular Decompression',
    category: 'physio',
    shortDescription: 'Gentle restorative cooldown releasing neck tightness and chest tightness from sitting.',
    fullInstructions: [
      'Drop shoulders down and away from ears.',
      'Gently tilt right ear toward right shoulder until mild stretch is felt in left side of neck.',
      'Place hands behind head/headrest and open elbows wide to expand chest.',
      'Hold each pose for 30 seconds with calm deep diaphragmatic breaths.'
    ],
    durationMinutes: 10,
    targetMuscles: ['Upper Trapezius', 'Sternocleidomastoid', 'Pectoralis Major'],
    equipmentNeeded: 'None',
    mobilitySuitability: ['manual_wheelchair', 'powered_wheelchair', 'limited_mobility', 'physio_recovery'],
    caloriesEst: 30,
    difficulty: 'Gentle',
    iconName: 'Heart'
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-1',
    title: 'First 10K Roll',
    description: 'Log a total cumulative rolling distance of 10 kilometers.',
    iconName: 'Award',
    unlockedAt: '2026-01-20',
    isUnlocked: true,
    progressPercent: 100,
    category: 'distance'
  },
  {
    id: 'badge-2',
    title: '7-Day Active Streak',
    description: 'Log active movement or physio for 7 consecutive days.',
    iconName: 'Flame',
    unlockedAt: '2026-01-24',
    isUnlocked: true,
    progressPercent: 100,
    category: 'streak'
  },
  {
    id: 'badge-3',
    title: 'Shoulder Guardian',
    description: 'Complete 5 dedicated shoulder care or physio sessions.',
    iconName: 'ShieldCheck',
    unlockedAt: '2026-01-22',
    isUnlocked: true,
    progressPercent: 100,
    category: 'physio'
  },
  {
    id: 'badge-4',
    title: 'Century Roller (100km)',
    description: 'Surpass 100 total kilometers of adaptive rolling distance.',
    iconName: 'Compass',
    isUnlocked: false,
    progressPercent: 64,
    category: 'distance'
  },
  {
    id: 'badge-5',
    title: '500 Active Minutes',
    description: 'Accumulate 500 active minutes across workouts and rolling.',
    iconName: 'Clock',
    unlockedAt: '2026-01-25',
    isUnlocked: true,
    progressPercent: 100,
    category: 'workout'
  },
  {
    id: 'badge-6',
    title: 'Adaptive Explorer',
    description: 'Log activities across 4 different terrains (Paved, Track, Water, Indoor).',
    iconName: 'MapPin',
    unlockedAt: '2026-01-23',
    isUnlocked: true,
    progressPercent: 100,
    category: 'workout'
  },
  {
    id: 'badge-7',
    title: 'Weekly Goal Crusher',
    description: 'Hit 100% completion on all three weekly target goals.',
    iconName: 'Target',
    isUnlocked: false,
    progressPercent: 88,
    category: 'workout'
  },
  {
    id: 'badge-8',
    title: '20-Day Momentum',
    description: 'Maintain your activity streak for 20 days straight.',
    iconName: 'Zap',
    isUnlocked: false,
    progressPercent: 40,
    category: 'streak'
  }
];

export const DAILY_TIPS = [
  {
    id: 'tip-1',
    title: 'Protect Your Shoulder Joints',
    content: 'For every 2 pushing sessions, perform at least 1 session focused on rear deltoid and scapular retractions. Balance prevents impingement!',
    tag: 'Joint Care'
  },
  {
    id: 'tip-2',
    title: 'Push Cadence Tip',
    content: 'An elliptical or semi-circular push pattern distributes shoulder torque more evenly than an arc push. Focus on smooth release.',
    tag: 'Technique'
  },
  {
    id: 'tip-3',
    title: 'Hydration & Grip',
    content: 'Gloves with silicone grip reduce hand fatigue during long outdoor rolls, letting your larger back muscles power the propulsion.',
    tag: 'Comfort'
  }
];
