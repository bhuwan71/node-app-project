// Dummy horoscope data
const dummyHoroscopes = [
    {
      _id: "1",
      horoscopeName: "Capricorn",
      dateOfBirth: "1990-01-01",
      timeOfBirth: "12:00 PM",
      placeOfBirth: "New York, USA",
      horoscopeData: {
        zodiacSign: "Capricorn",
        luckyColor: "Green",
        luckyNumber: 7,
      },
    },
    {
      _id: "2",
      horoscopeName: "Aries",
      dateOfBirth: "1985-04-15",
      timeOfBirth: "9:00 AM",
      placeOfBirth: "Los Angeles, USA",
      horoscopeData: {
        zodiacSign: "Aries",
        luckyColor: "Red",
        luckyNumber: 5,
      },
    },
  ];
  
  // READ: Get all Horoscopes based on the horoscope name
  exports.getHoroscopes = async (req, res) => {
    try {
      // Filter dummy data based on horoscope name
      const horoscopeName = req.query.horoscopeName;  // Get horoscope name from query param
      const horoscopes = dummyHoroscopes.filter(
        (horoscope) => horoscope.horoscopeName.toLowerCase() === horoscopeName.toLowerCase()
      );
  
      if (horoscopes.length === 0) {
        return res.status(404).json({ message: "Horoscope not found" });
      }
  
      res.json(horoscopes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to retrieve Horoscope data" });
    }
  };
  
  // READ: Get a specific Horoscope by name for the authenticated user
  exports.getHoroscopeById = async (req, res) => {
    try {
      // Find specific horoscope by horoscopeName
      const horoscopeName = req.params.horoscopeName; // Get horoscope name from params
      const horoscope = dummyHoroscopes.find(
        (h) => h.horoscopeName.toLowerCase() === horoscopeName.toLowerCase()
      );
  
      if (!horoscope) {
        return res.status(404).json({ message: "Horoscope not found" });
      }
  
      res.json(horoscope);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to retrieve Horoscope" });
    }
  };
  