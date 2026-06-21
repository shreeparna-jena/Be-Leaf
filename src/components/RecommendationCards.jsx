import React from 'react';
import { colors } from '../constants/theme';
import { getRecommendations } from '../utils/recommendations';

export default function RecommendationCards({ highestImpactArea }) {
  const recommendations = getRecommendations(highestImpactArea);

  return (
    <section className="space-y-4">
      <h3 className={`font-bold ${colors.textForest} text-lg ml-2 pt-2`}>Personalized Recommendation</h3>
      <div className="bg-[#A8DADC]/20 p-5 rounded-2xl border border-[#A8DADC]/40 shadow-sm">
        <p className={`font-semibold ${colors.textForest} leading-relaxed`}>
          💡 {recommendations.message}
        </p>
      </div>
    </section>
  );
}
