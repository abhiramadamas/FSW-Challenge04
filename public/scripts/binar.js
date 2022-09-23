function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Binar {
  static populateCars = (cars) => {
    return cars.map((car) => {
      const isPositive = getRandomInt(0, 1) === 1;
      const timeAt = new Date();
      const mutator = getRandomInt(1000000, 100000000);
      const availableAt = new Date(timeAt.getTime() + (isPositive ? mutator : -1 * mutator))

      return {
        ...car,
        availableAt,
      };
    })
  }

 static listCars(driverType, year, Time, passenger) {
  let cars;
  let cachedCarsString = localStorage.getItem("CARS");

  if(!!cachedCarsString) {
    const cache = JSON.parse(cachedCarsString);
    cars  = this.populateCars(cache);
    } else {
      cars = this.populateCars(Data.getData())
      localStorage.setItem("CARS", JSON.stringify(cars));
    }

  if(driverType == 'Dengan Sopir') {
    cars = cars.filter((car) => car.available == true);
    } else if(driverType == "Tanpa Sopir (Lepas Kunci)") {
      cars = cars.filter((car) => car.available == false);
    }

  if(year) cars = cars.filter((car) => car.year == year);

  if(passenger) {
    cars = cars.filter((car) => car.capacity == passenger);
  }

  return cars;
  }


}
