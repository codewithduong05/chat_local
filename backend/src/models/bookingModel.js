// models/booking.model.js
let bookings = [];

const reset = () => {
  bookings = [];
};

const add = (data) => {
  bookings.push(data);
};

const getAll = () => bookings;

export  {
  reset,
  add,
  getAll
};
