import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CharactersPage } from './characters.page';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  DropdownComponent,
  InputComponent,
} from '@rick-and-morty/libs/shared-ui';
import { CardModule } from 'primeng/card';
import { Button, ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogComponent } from 'primeng/dynamicdialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockCharactersApiService } from '../services/characters-api.mock.service';
import {
  CHARACTERS_API_BASE_URL,
  CharactersApiService,
} from '../services/characters-api.service';
import { By } from '@angular/platform-browser';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { selectCharacters } from '../state/characters/characters.selector';
import { mockCharacters } from './model/character.mock.model';

describe('CharactersPage', () => {
  let component: CharactersPage;
  let fixture: ComponentFixture<CharactersPage>;
  let store: MockStore;

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
      declarations: [CharactersPage],
      providers: [
        DialogService,
        provideMockStore(),
        { provide: CHARACTERS_API_BASE_URL, useValue: 'mock-url' },
        { provide: CharactersApiService, useClass: MockCharactersApiService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersPage);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should generate characters components accordantly to the mock data', fakeAsync(() => {
  //   store.overrideSelector(selectCharacters, mockCharacters);
  //   tick();
  //   fixture.detectChanges();

  //   const characterCardElements = fixture.debugElement.queryAll(
  //     By.directive(CharacterCardComponent)
  //   );
  //   expect(characterCardElements.length).toBe(mockCharacters.length);
  // }));

  it('should call openCharacterFormDialog function', () => {
    const spy = jest.spyOn(component, 'openCharacterFormDialog');
    const plusButtonDebugElement = fixture.debugElement.query(
      By.directive(Button)
    );

    plusButtonDebugElement.nativeElement.click()
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should open the create charecter when plus icon clicked', () => {
    const plusButtonDebugElement = fixture.debugElement.query(
      By.directive(Button)
    );

    plusButtonDebugElement.nativeElement.click()
    fixture.detectChanges();

    const createCharecterDynamicDialogElement = document.body.querySelector(
      'p-dynamicdialog'
    ); 
    expect(createCharecterDynamicDialogElement).toBeTruthy();
  });
});
