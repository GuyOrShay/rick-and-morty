import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CharacterFormDlgComponent } from './character-form-dlg.component';

describe('CharacterFormDlgComponent', () => {
  let component: CharacterFormDlgComponent;
  let fixture: ComponentFixture<CharacterFormDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterFormDlgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterFormDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
