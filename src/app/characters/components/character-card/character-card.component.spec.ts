import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CharacterCardComponent } from './character-card.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {
  DropdownComponent,
  InputComponent,
} from '@rick-and-morty/libs/shared-ui';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { DialogService } from 'primeng/dynamicdialog';

import { mockCharacters } from '../../model/character.mock.model';
import { By } from '@angular/platform-browser';
import { CharacterStatus } from '../../model/character.model';

describe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        DropdownComponent,
        InputComponent,
        ButtonModule,
        CardModule,
      ],
      declarations: [CharacterCardComponent],
      providers: [DialogService, provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
    component.character = mockCharacters[0];
    component.isFavorite = true;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create Title that the inner text of him is the same as the character name', () => {
    const desiredTitle: string = component.character.name;
    const titleElement = fixture.debugElement.query(By.css('.title'));
    expect(titleElement.nativeElement.innerHTML).toBe(desiredTitle);
  });

  it('should be 2 buttons', () => {
    const buttonsDivElement = fixture.debugElement.query(By.css('.buttons'));
    const buttonsArray = buttonsDivElement.queryAll(By.css('i'));
    expect(buttonsArray.length).toBe(2);
  });

  it('should have "alive" class when character.status is ALIVE', () => {
    component.character.status = CharacterStatus.ALIVE;
    fixture.detectChanges();
    
    const statusDot = fixture.debugElement.query(By.css('.status-dot')).nativeElement;

    expect(statusDot.classList.contains('alive')).toBe(true);
  });

  it('should have "dead" class when character.status is DEAD', () => {
    component.character.status = CharacterStatus.DEAD;
    fixture.detectChanges();

    const statusDot = fixture.debugElement.query(By.css('.status-dot')).nativeElement;
    expect(statusDot.classList.contains('dead')).toBe(true);
  });
  
});
