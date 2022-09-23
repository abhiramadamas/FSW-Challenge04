
let Driver;
let Time;

const getDriver = document.getElementsByClassName("driver-item");
for(let i = 0; i < getDriver.length; i++) {
  getDriver[i].addEventListener("click", function() {
    Driver = getDriver[i].innerHTML;
    document.getElementById("driver-type").innerHTML = Driver;
  });
} 

const getTime = document.getElementsByClassName("time-item");
for(let i = 0; i < getTime.length; i++) {
  getTime[i].addEventListener("click", function() {
    Time = getTime[i].innerHTML;
  });
}

class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.formSearch = document.getElementById("search");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.date = document.getElementById("tanggal");
    this.capacity = document.getElementById("jmlhPenumpang");
    this.year;
  }

  async init() {
    // Register click listener
    this.formSearch.onsubmit = this.search;
  }

  run = () => {
    if(Car.list.length > 0) {
      this.carContainerElement.style.display='grid';
      Car.list.forEach((car) => {
        const node = document.createElement("div");
        node.innerHTML = car.render();
        node.classList.add('border', 'rounded', 'p-3', 'm-2', 'car-item');
        this.carContainerElement.classList.add('container', 'p-3')
        this.carContainerElement.appendChild(node);
      });
    }
    else {
      const node = document.createElement("h1");
      node.innerHTML = 'Maaf Kosong :(';
      node.setAttribute('class', 'text-center');
      this.carContainerElement.classList.add('container', 'p-3');
      this.carContainerElement.style.display='block'
      this.carContainerElement.appendChild(node);
    }
  };

  // async load() {
  //   const cars = await Binar.listCars();
  //   Car.init(cars);
  // }

  load = ()=> {
    const cars = Binar.listCars(Driver, this.year, Time, this.capacity.value);
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };

  search = (e) => {
    e.preventDefault();
    this.clear();
    let date = this.date.value.split('-');
    this.year = date[0];
    const year = this.year;
    const capacity = this.capacity.value;
    console.log(Driver, year, Time, capacity);
    this.load()
    this.run()
}
}
