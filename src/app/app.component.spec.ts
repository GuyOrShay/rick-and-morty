import {
  TestBed,
  ComponentFixture,
  tick,
  waitForAsync,
  fakeAsync,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import {
  CHARACTERS_API_BASE_URL,
  CharactersApiService,
} from './services/characters-api.service';
import { MockCharactersApiService } from './services/characters-api.mock.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProcessState } from './state/state.model';
import { of, take } from 'rxjs';
import { LoaderComponent } from '@rick-and-morty/libs/shared-ui';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectCharactersCallState } from './state/characters/characters.selector';
import { By } from '@angular/platform-browser';
import { HeaderModule } from './header/header.module';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  let router: Router;

  beforeEach(async () => {
    const mockRouter = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
        HeaderModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        LoaderComponent,
      ],
      providers: [
        { provide: CharactersApiService, useClass: MockCharactersApiService },
        { provide: CHARACTERS_API_BASE_URL, useValue: 'mock-url' },
        { provide: Router, useValue: mockRouter },
        provideMockStore(),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit PROCESSING from charactersCallState$', (done) => {
    store.overrideSelector(selectCharactersCallState, ProcessState.PROCESSING);
    component.charactersCallState$?.pipe(take(1)).subscribe((state) => {
      expect(state).toEqual(ProcessState.PROCESSING);
      done();
    });
  });

  it('should display ram-loader when charactersCallState is PROCESSING', fakeAsync(() => {
    store.overrideSelector(selectCharactersCallState, ProcessState.PROCESSING);
    fixture.detectChanges();
    const loaderComponent = fixture.debugElement.query(
      By.directive(LoaderComponent)
    );
    expect(loaderComponent).toBeTruthy();
  }));

  it('should emit COMPLETED from charactersCallState$', (done) => {
    store.overrideSelector(selectCharactersCallState, ProcessState.COMPLETED);
    component.charactersCallState$?.pipe(take(1)).subscribe((state) => {
      expect(state).toEqual(ProcessState.COMPLETED);
      done();
    });
  });

  it('should hide ram-loader when charactersCallState is COMPLETED', fakeAsync(() => {
    store.overrideSelector(selectCharactersCallState, ProcessState.COMPLETED);
    fixture.detectChanges();
    const loaderComponent = fixture.debugElement.query(
      By.directive(LoaderComponent)
    );
    expect(loaderComponent).toBeNull();
  }));

  it('should navigate to /character when charactersCallState is COMPLETED', fakeAsync(() => {
    store.overrideSelector(selectCharactersCallState, ProcessState.COMPLETED);

    fixture.detectChanges();
    tick(); 

    expect(router.navigate).toHaveBeenCalledWith(['/characters'], { replaceUrl: true });
  }));

});
