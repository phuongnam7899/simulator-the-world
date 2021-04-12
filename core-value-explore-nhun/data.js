const integrityCoreValues = [
  "Accountability",
  "Candor",
  "Commitment",
  "Dependability",
  "Dignity",
  "Honesty",
  "Honor",
  "Responsibility",
  "Sincerity",
  "Transparency",
  "Trust",
  "Trustworthy",
  "Truth",
];
const feelingsCoreValues = [
  "Acceptance",
  "Comfort",
  "Compassion",
  "Contentment",
  "Empathy",
  "Grace",
  "Gratitude",
  "Happiness",
  "Hope",
  "Inspiring",
  "Irreverent",
  "Joy",
  "Kindness",
  "Love",
  "Optimism",
  "Passion",
  "Peace",
  "Poise",
  "Respect",
  "Reverence",
  "Satisfaction",
  "Serenity",
  "Thankful",
  "Tranquility",
  "Welcoming",
];

const spiritalityCoreValues = [
  "Adaptability",
  "Altruism",
  "Balance",
  "Charity",
  "Communication",
  "Community",
  "Connection",
  "Consciousness",
  "Contribution",
  "Cooperation",
  "Courtesy",
  "Devotion",
  "Equality",
  "Ethical",
  "Fairness",
  "Family",
  "Fidelity",
  "Friendship",
  "Generosity",
  "Giving",
  "Goodness",
  "Harmony",
  "Humility",
  "Loyalty",
  "Maturity",
  "Meaning",
  "Selfless",
  "Sensitivity",
  "Service",
  "Sharing",
  "Spirit",
  "Stewardship",
  "Support",
  "Sustainability",
  "Teamwork",
  "Tolerance",
  "Unity",
];

const achievementCoreValues = [
  "Accomplishment",
  "Capable",
  "Challenge",
  "Challenge",
  "Competence",
  "Credibility",
  "Determination",
  "Development",
  "Drive",
  "Effectiveness",
  "Empower",
  "Endurance",
  "Excellence",
  "Famous",
  "Greatness",
  "Growth",
  "Hard work",
  "Improvement",
  "Influence",
  "Intensity",
  "Leadership",
  "Mastery",
  "Motivation",
  "Performance",
  "Persistence",
  "Potential",
  "Power",
  "Productivity",
  "Professionalism",
  "Prosperity",
  "Recognition",
  "Results-oriented",
  "Risk",
  "Significance",
  "Skill",
  "Skillfulness",
  "Status",
  "Success",
  "Talent",
  "Victory",
  "Wealth",
  "Winning",
];
const creativityCoreValues = [
  "Creation",
  "Curiosity",
  "Discovery",
  "Exploration",
  "Expressive",
  "Imagination",
  "Innovation",
  "Inquisitive",
  "Intuitive",
  "Openness",
  "Originality",
  "Uniqueness",
  "Wonder",
];

const enjoymentCoreValues = [
  "Amusement",
  "Enthusiasm",
  "Experience",
  "Fun",
  "Humor",
  "Playfulness",
  "Recreation",
  "Spontaneous",
  "Surprise",
];
const presenseCoreValues = [
  "Alertness",
  "Attentive",
  "Awareness",
  "Beauty",
  "Calm",
  "Clear",
  "Concentration",
  "Focus",
  "Silence",
  "Simplicity",
  "Solitude",
];
const intelligenceCoreValues = [
  "Brilliance",
  "Clever",
  "Common sense",
  "Decisiveness",
  "Foresight",
  "Genius",
  "Insightful",
  "Knowledge",
  "Learning",
  "Logic",
  "Openness",
  "Realistic",
  "Reason",
  "Reflective",
  "Smart",
  "Thoughtful",
  "Understanding",
  "Vision",
  "Wisdom",
];

const strengthCoreValues = [
  "Ambition",
  "Assertiveness",
  "Boldness",
  "Confidence",
  "Dedication",
  "Discipline",
  "Ferocious",
  "Fortitude",
  "Persistence",
  "Power",
  "Restraint",
  "Rigor",
  "Self-reliance",
  "Temperance",
  "Toughness",
  "Vigor",
  "Will",
];

const freedomCoreValues = ["Independence", "Individuality", "Liberty"];
const courageCoreValues = ["Bravery", "Conviction", "Fearless", "Valor"];
const orderCoreValues = [
  "Accuracy",
  "Careful",
  "Certainty",
  "Cleanliness",
  "Consistency",
  "Control",
  "Decisive",
  "Economy",
  "Justice",
  "Lawful",
  "Moderation",
  "Organization",
  "Security",
  "Stability",
  "Structure",
  "Thorough",
  "Timeliness",
];

const healthCoreValues = ["Energy", "Vitality"];

export const coreValues = {
  integrityCoreValues,
  feelingsCoreValues,
  spiritalityCoreValues,
  achievementCoreValues,
  creativityCoreValues,
  enjoymentCoreValues,
  presenseCoreValues,
  intelligenceCoreValues,
  strengthCoreValues,
  freedomCoreValues,
  courageCoreValues,
  orderCoreValues,
  healthCoreValues,
};

const wait = (time) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
export const initDataToDb = async () => {
    let currentDatabaseIndex = 0;
    let imported = 0;
  for (let key in coreValues) {
    const coreValueCategoryName = key.replace("CoreValues", "");
    for (let value of coreValues[key]) {
        if (imported >= 200 && imported < 300) {
            const payload = {
              name: value,
              category: coreValueCategoryName,
              elo: 100,
              winTimes: 0,
              loseTimes: 0,
              description: "",
              ID: imported + 1 + '',
            };
            const response = await fetch(
              `https://6060842604b05d0017ba29e8.mockapi.io/core-value-3`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              }
            );
            const data = await response.json();
            console.log(data);
            await wait(1000);
            
        }
        imported++;
    }
  }
};
