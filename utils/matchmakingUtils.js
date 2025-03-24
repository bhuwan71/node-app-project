exports.compareKundalis = (maleDetails, femaleDetails) => {
  let totalScore = 0;
  const criteria = [
    { key: "name", weight: 1, match: maleDetails.name === femaleDetails.name },
    {
      key: "dob",
      weight: 2,
      match:
        new Date(maleDetails.dob).getTime() ===
        new Date(femaleDetails.dob).getTime(),
    },
    {
      key: "ageDifference",
      weight: 2,
      match: Math.abs(getAge(maleDetails.dob) - getAge(femaleDetails.dob)) <= 5,
    },
    {
      key: "place",
      weight: 1,
      match: maleDetails.place === femaleDetails.place,
    },
    {
      key: "zodiac",
      weight: 2,
      match:
        getZodiacSign(maleDetails.dob) === getZodiacSign(femaleDetails.dob),
    },
    {
      key: "gender",
      weight: 1,
      match: maleDetails.gender === "male" && femaleDetails.gender === "female",
    },
    {
      key: "language",
      weight: 1,
      match: maleDetails.language === femaleDetails.language,
    },
    {
      key: "birthNumber",
      weight: 2,
      match:
        calculateBirthNumber(maleDetails.dob) ===
        calculateBirthNumber(femaleDetails.dob),
    },
    {
      key: "astrology",
      weight: 3,
      match: isAstrologicalMatch(maleDetails, femaleDetails),
    },
    {
      key: "culture",
      weight: 2,
      match: maleDetails.culture === femaleDetails.culture,
    },
  ];

  const maxScore = criteria.reduce((sum, c) => sum + c.weight, 0);
  totalScore = criteria.reduce((sum, c) => sum + (c.match ? c.weight : 0), 0);

  const averageScore = totalScore / maxScore;
  const isMatch = averageScore >= 0.7;

  return {
    isMatch,
    averageScore: (averageScore * 100).toFixed(2),
    score: totalScore,
    maxScore,
  };
};

function getAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  return today.getFullYear() - birthDate.getFullYear();
}

function getZodiacSign(dob) {
  const month = new Date(dob).getMonth() + 1;
  const day = new Date(dob).getDate();
  const zodiac = [
    "Capricorn",
    "Aquarius",
    "Pisces",
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
  ];
  const dates = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];
  return day > dates[month - 1] ? zodiac[month] : zodiac[month - 1];
}

function calculateBirthNumber(dob) {
  const digits = dob
    .replace(/[^0-9]/g, "")
    .split("")
    .map(Number);
  let sum = digits.reduce((acc, digit) => acc + digit, 0);
  while (sum > 9)
    sum = sum
      .toString()
      .split("")
      .reduce((acc, digit) => acc + Number(digit), 0);
  return sum;
}

function isAstrologicalMatch(maleDetails, femaleDetails) {
  // Placeholder for complex astrological logic
  return Math.random() > 0.3; // Simulating a 70% probability of match
}
