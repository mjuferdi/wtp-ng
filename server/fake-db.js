const Rental = require('./models/rental');

// Dummy data for database
class FakeDb {
  constructor() {
    this.rentals = [{
        title: "Nice view on ocean",
        city: "San Francisco",
        street: "Main street",
        category: "condo",
        image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 4,
        shared: true,
        description: "Very nice apartment in center of the city.",
        dailyRate: 43
      },
      {
        title: "Modern apartment in center",
        city: "Berlin",
        street: "Rathenau str",
        category: "apartment",
        image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 1,
        shared: false,
        description: "Good for student.",
        dailyRate: 11
      },
      {
        title: "Old house in nature",
        city: "Amsterdam",
        street: "Haarlemmerstraat 64",
        category: "house",
        image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 3,
        shared: true,
        description: "Chill house in central Amsterdam.",
        dailyRate: 23
      }
    ]
  }
  async cleanDb() {
    await Rental.remove({});
  }
  pushRentalsToDb() {
    this.rentals.forEach((rental) => {
      const newRental = new Rental(rental);
      newRental.save();
    })
  }
  seedDb() {
    this.cleanDb();
    this.pushRentalsToDb();
  }
}
module.exports = FakeDb;
