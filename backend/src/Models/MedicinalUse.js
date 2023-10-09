const MedicinalUseArray = [
  "Pain Relief",
  "Pain Relief",
  "Fever Relief",
  "Allergy Relief",
  "Digestive Health",
  "Respiratory Relief",
  "Anxiety Relief",
  "Cholesterol Management",
  "Diabetes Management",
  "Infection Treatment",
];

const getMedicinalUses = async (req, res) => {
  try {
    res.status(200).json(MedicinalUseArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { MedicinalUseArray, getMedicinalUses };
