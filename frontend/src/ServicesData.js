const servicesData = [
  // 🏋️ FITNESS (5)
  {
    category: "Fitness",
    name: "Personal Trainer Session",
    provider: "Rahul Verma",
    location: "Delhi",
    price: 1200,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74"
  },
  {
    category: "Fitness",
    name: "Yoga & Meditation Class",
    provider: "Anjali Sharma",
    location: "Rishikesh",
    price: 900,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3"
  },
  {
    category: "Fitness",
    name: "Home Workout Coaching",
    provider: "Amit Singh",
    location: "Noida",
    price: 700,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e"
  },
  {
    category: "Fitness",
    name: "Zumba Dance Session",
    provider: "Priya Kapoor",
    location: "Mumbai",
    price: 800,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1594737625785-c3e8f2e83d27"
  },
  {
    category: "Fitness",
    name: "Strength Training",
    provider: "Rohit Mehta",
    location: "Gurgaon",
    price: 1500,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e"
  },

  // 👨‍🍳 CHEF (5)
  {
    category: "Chef",
    name: "Private Chef Dinner",
    provider: "Chef Arjun",
    location: "Delhi",
    price: 3000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
  },
  {
    category: "Chef",
    name: "Live BBQ Experience",
    provider: "Chef Kabir",
    location: "Goa",
    price: 3500,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee"
  },
  {
    category: "Chef",
    name: "Home Dining Experience",
    provider: "Chef Neha",
    location: "Mumbai",
    price: 2800,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2"
  },
  {
    category: "Chef",
    name: "Italian Cuisine Night",
    provider: "Chef Marco",
    location: "Bangalore",
    price: 4000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1543353071-873f17a7a088"
  },
  {
    category: "Chef",
    name: "Street Food Tour Chef",
    provider: "Chef Rakesh",
    location: "Delhi",
    price: 2000,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
  },

  // 💆 SPA (5)
  {
    category: "Spa",
    name: "Full Body Massage",
    provider: "Relax Spa",
    location: "Goa",
    price: 2500,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874"
  },
  {
    category: "Spa",
    name: "Aromatherapy Session",
    provider: "Wellness Hub",
    location: "Kerala",
    price: 2200,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1556228724-4a7b9f5b3c62"
  },
  {
    category: "Spa",
    name: "Couple Spa Experience",
    provider: "Luxury Spa",
    location: "Udaipur",
    price: 4500,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1507652955-f3dcef5a3be0"
  },
  {
    category: "Spa",
    name: "Ayurvedic Therapy",
    provider: "Ayurveda Center",
    location: "Kerala",
    price: 3000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa"
  },
  {
    category: "Spa",
    name: "Head & Shoulder Massage",
    provider: "Urban Relax",
    location: "Delhi",
    price: 1200,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03"
  },

  // 📸 PHOTOGRAPHY (5)
  {
    category: "Photography",
    name: "Vacation Photoshoot",
    provider: "Lens Studio",
    location: "Jaipur",
    price: 3500,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
  },
  {
    category: "Photography",
    name: "Couple Photoshoot",
    provider: "Pixel Perfect",
    location: "Manali",
    price: 3000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
  },
  {
    category: "Photography",
    name: "Street Photography Tour",
    provider: "Shutter Pro",
    location: "Delhi",
    price: 1500,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
  },
  {
    category: "Photography",
    name: "Pre-Wedding Shoot",
    provider: "Dream Frames",
    location: "Udaipur",
    price: 10000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552"
  },
  {
    category: "Photography",
    name: "Event Photography",
    provider: "Click Moments",
    location: "Mumbai",
    price: 5000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },

  // DESTINATION WEDDING 
  {
    category: "Wedding",
    name: "Beach Wedding Setup",
    provider: "Goa Weddings",
    location: "Goa",
    price: 200000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611"
  },
  {
    category: "Wedding",
    name: "Royal Palace Wedding",
    provider: "Heritage Events",
    location: "Jaipur",
    price: 500000,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1504198458649-3128b932f49b"
  },
  {
    category: "Wedding",
    name: "Mountain Wedding",
    provider: "Himalaya Events",
    location: "Manali",
    price: 300000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29"
  },
  {
    category: "Wedding",
    name: "Luxury Resort Wedding",
    provider: "Elite Weddings",
    location: "Udaipur",
    price: 600000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1520857014576-2c4f4c972b57"
  },
  {
    category: "Wedding",
    name: "Garden Wedding Setup",
    provider: "Green Events",
    location: "Delhi",
    price: 150000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1519222970733-f546218fa6d7"
  }
];

export default servicesData;
