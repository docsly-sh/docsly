export type FeedbackType = string;

export const useFeedback = (_options?: {
  sound?: FeedbackType;
  soundDef?: unknown;
  haptic?: boolean;
}) => () => {};
