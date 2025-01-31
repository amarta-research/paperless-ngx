import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentComposeComponent } from './document-compose.component';

describe('DocumentComposeComponent', () => {
  let component: DocumentComposeComponent;
  let fixture: ComponentFixture<DocumentComposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentComposeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
