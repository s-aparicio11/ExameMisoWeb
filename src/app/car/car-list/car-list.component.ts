import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
  imports: [CommonModule]
})
export class CarListComponent implements OnInit {
  cars: Array<Car>=[];
  counter: { [key: string]: number } = {};

  constructor(private carService: CarService) { }
  
  getCars(): void {
    this.carService.getCars().subscribe(cars => {
      this.cars = cars;
      this.calculateCounter();
    });
  }

  calculateCounter(): void {
    this.counter = this.cars.reduce((acc, car) => {
      acc[car.marca] = (acc[car.marca] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  get counterArray(): Array<{key: string, value: number}> {
    return Object.entries(this.counter).map(([key, value]) => ({
      key,
      value
    }));
  }

  ngOnInit() {
    this.getCars();
  }

}
