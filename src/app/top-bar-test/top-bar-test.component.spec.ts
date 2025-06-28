import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarTestComponent } from './top-bar-test.component';

describe('TopBarTestComponent', () => {
  let component: TopBarTestComponent;
  let fixture: ComponentFixture<TopBarTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopBarTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
