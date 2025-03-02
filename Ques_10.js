function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.isAvailable = true;
}

Car.prototype.getDetails = function () {
  return `${this.year} ${this.make} ${this.model}`;
};

function Customer(name) {
  this.name = name;
  this.rentedCars = [];
}

Customer.prototype.rentCar = function (car) {
  if (car.isAvailable) {
    car.isAvailable = false;
    this.rentedCars.push(car);
    console.log(`${this.name} rented ${car.getDetails()}`);
  } else {
    console.log(`${car.getDetails()} is already rented.`);
  }
};

Customer.prototype.returnCar = function (car) {
  if (this.rentedCars.includes(car)) {
    console.log(`${this.name} is returning ${car.getDetails()}...`);
    setTimeout(() => {
      car.isAvailable = true;
      this.rentedCars = this.rentedCars.filter((c) => c !== car);
      console.log(`${car.getDetails()} is now available for rent.`);
    }, 2000);
  } else {
    console.log(`${this.name} did not rent this car.`);
  }
};

function PremiumCustomer(name, discountRate) {
  Customer.call(this, name);
  this.discountRate = discountRate;
}

PremiumCustomer.prototype = Object.create(Customer.prototype);
PremiumCustomer.prototype.constructor = PremiumCustomer;

function calculateRentalPrice(carType, days, customer) {
  const baseRate = 50;
  const rates = { SUV: 70, Sedan: 50, Hatchback: 40 };
  let price = (rates[carType] || baseRate) * days;
  if (customer instanceof PremiumCustomer) {
    price *= 1 - customer.discountRate / 100;
  }
  return price;
}

function Maintenance(car, delay) {
  console.log(`Maintenance started for ${car.getDetails()}...`);
  setTimeout(() => {
    car.isAvailable = true;
    console.log(`${car.getDetails()} is now available after maintenance.`);
  }, delay);
}

const car1 = new Car("Toyota", "Camry", 2022);
const car2 = new Car("Honda", "CR-V", 2021);
const customer1 = new Customer("Alice");
const premiumCustomer1 = new PremiumCustomer("Bob", 10);

customer1.rentCar(car1);
console.log(`Rental price for Alice: $${calculateRentalPrice("Sedan", 3, customer1)}`);
premiumCustomer1.rentCar(car2);
console.log(`Rental price for Bob: $${calculateRentalPrice("SUV", 3, premiumCustomer1)}`);

setTimeout(() => {
  customer1.returnCar(car1);
}, 4000);

Maintenance(car2, 3000);
