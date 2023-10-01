import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CharactersPage } from './characters.page';

describe('CharactersPage', () => {
  let component: CharactersPage;
  let fixture: ComponentFixture<CharactersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharactersPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
