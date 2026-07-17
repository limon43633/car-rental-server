import Booking from "../models/Booking.js"


// Function to check Availability of car for a given date
const checkAvailability = async (car, pickupDate, returnDate) => {
    const bookings = await Booking.find({
      car,
      pickupDate: {$lte: returnDate},
      returnDate: {$gte: pickupDate},
    })
    return bookings.length === 0;
}

// API to check Availability of cars for the given date and location
export const checkAvailabilityOfCar = async () => {
  
}