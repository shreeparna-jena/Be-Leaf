export function getGrowthStage(seedPoints) {
  if (seedPoints >= 200) return 'Garden';
  if (seedPoints >= 150) return 'Tree';
  if (seedPoints >= 100) return 'Plant';
  if (seedPoints >= 50) return 'Sapling';
  return 'Seed';
}

export function getImprovementTrend(previousScore, currentScore) {
  if (previousScore === null || previousScore === undefined) return null;

  const diff = previousScore - currentScore; // lower is better
  
  return {
    previousScore: previousScore,
    currentScore: currentScore,
    diff: Math.abs(diff),
    isImprovement: diff > 0,
    isWorse: diff < 0,
    isSame: diff === 0
  };
}
