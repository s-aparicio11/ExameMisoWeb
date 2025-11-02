/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Car } from '../car';
import { faker } from '@faker-js/faker';
import { CarListComponent } from './car-list.component';
import { CarService } from '../car.service';

describe('CarListComponent', () => {
  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;
  let debug: DebugElement;
  let numCars: number=3;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CarListComponent],
      providers: [CarService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;
    component.cars=[];

    for (let i: number =0 ; i <numCars; i++){
      let car= new Car(
        faker.number.int(),
        faker.company.buzzNoun(),
        faker.company.buzzVerb(),
        faker.lorem.words(2),
        faker.lorem.words(1),
        faker.number.int(),
        faker.color.human(),
        faker.image.url()
      )
      component.cars.push(car)
    }

  
    debug = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 <th> with titles #, Marca, Linea, Modelo', () => {
    const thElements = debug.queryAll(By.css('thead th'));
    
    expect(thElements.length).toBe(4);
    expect(thElements[0].nativeElement.textContent.trim()).toBe('#');
    expect(thElements[1].nativeElement.textContent.trim()).toBe('Marca');
    expect(thElements[2].nativeElement.textContent.trim()).toBe('Linea');
    expect(thElements[3].nativeElement.textContent.trim()).toBe('Modelo');
  });

  it(`should have ${numCars} dd tag with the brand name`,()=>{
    const ddElements = debug.queryAll(By.css('dd.carBrand'));
    expect(ddElements.length).toBe(numCars);
    ddElements.forEach((dd, index) => {
      expect(dd.nativeElement.textContent.trim()).toBe(component.cars[index].marca);
    });
  } );

  it(`should have ${numCars} dd tag with the car id`,()=>{
    const ddElements = debug.queryAll(By.css('dd.carId'));
    expect(ddElements.length).toBe(numCars);
    ddElements.forEach((dd, index) => {
      expect(dd.nativeElement.textContent.trim()).toBe(String(component.cars[index].id));
    });
  } );

  it(`should have ${numCars} dd tag with the car line`,()=>{
    const ddElements = debug.queryAll(By.css('dd.carLine'));
    expect(ddElements.length).toBe(numCars);
    ddElements.forEach((dd, index) => {
      expect(dd.nativeElement.textContent.trim()).toBe(component.cars[index].linea);
    });
  } );

  it(`should have ${numCars} dd tag with the car Model`,()=>{
    const ddElements = debug.queryAll(By.css('dd.carModel'));
    expect(ddElements.length).toBe(numCars);
    ddElements.forEach((dd, index) => {
      expect(dd.nativeElement.textContent.trim()).toBe(component.cars[index].modelo);
    });
  } );
});
