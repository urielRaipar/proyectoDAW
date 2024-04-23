import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArstistaEditComponent } from './arstista-edit.component';

describe('ArstistaEditComponent', () => {
  let component: ArstistaEditComponent;
  let fixture: ComponentFixture<ArstistaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArstistaEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArstistaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
