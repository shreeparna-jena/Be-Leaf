export function calculateQuizScores(answers) {
  let fpTotal = 0;
  let seedTotal = 0;
  const impactCounts = { Transportation: 0, Electricity: 0, Waste: 0 };
  
  answers.forEach(ans => {
    fpTotal += ans.fp;
    seedTotal += ans.seed;
    if (impactCounts[ans.impact] !== undefined) {
      impactCounts[ans.impact] += ans.fp;
      if (ans.fp > 0) {
        impactCounts[ans.impact] += 0.01;
      }
    }
  });

  let highestImpactArea = 'None';
  let maxFp = 0; // Require at least >0 impact to be considered highest
  for (const [key, value] of Object.entries(impactCounts)) {
    if (value > maxFp) {
      maxFp = value;
      highestImpactArea = key;
    }
  }

  return {
    footprintScore: fpTotal,
    seedScore: seedTotal,
    highestImpactArea
  };
}
