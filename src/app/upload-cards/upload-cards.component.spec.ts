import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCardsComponent } from './upload-cards.component';

describe('UploadCardsComponent', () => {
  let component: UploadCardsComponent;
  let fixture: ComponentFixture<UploadCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
