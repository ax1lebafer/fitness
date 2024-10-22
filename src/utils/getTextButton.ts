export function getTextButton(progress: number): string {
  if (progress === 100) {
    return "Начать заново";
  } else if (progress === 0) {
    return "Начать тренировки";
  } else {
    return "Продолжить";
  }
}
