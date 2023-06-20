import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendreComponent } from './rendre.component';

describe('RendreComponent', () => {
  let component: RendreComponent;
  let fixture: ComponentFixture<RendreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RendreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RendreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
