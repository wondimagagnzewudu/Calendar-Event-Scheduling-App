export const REPEAT_OPTIONS = {
    WEEKLY: 'Weekly',
    BIWEEKLY: 'Bi-weekly',
    MONTHLY: 'Monthly',
  } as const;
  
  export type RepeatOption = typeof REPEAT_OPTIONS[keyof typeof REPEAT_OPTIONS];