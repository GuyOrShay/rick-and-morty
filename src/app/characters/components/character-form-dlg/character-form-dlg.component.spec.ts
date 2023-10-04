import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CharacterFormDlgComponent } from './character-form-dlg.component';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { provideMockStore } from '@ngrx/store/testing';
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
import { mockCharacters } from '../../model/character.mock.model';
import { By } from '@angular/platform-browser';
import { CharacterStatus } from '../../model/character.model';

describe('CharacterFormDlgComponent', () => {
  let component: CharacterFormDlgComponent;
  let fixture: ComponentFixture<CharacterFormDlgComponent>;

  const mockDialogRef = {
    close: jest.fn(),
  };

  const mockDialogConfig = {
    data: { character: mockCharacters[0] },
  };
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
      ],
      declarations: [CharacterFormDlgComponent],
      providers: [
        DialogService,
        { provide: DynamicDialogRef, useValue: mockDialogRef },
        { provide: DynamicDialogConfig, useValue: mockDialogConfig },
        provideMockStore(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterFormDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the save button if the form is invalid', () => {
    component.formGroup.patchValue({
      image: '',
      name: '',
      species: '',
      status: CharacterStatus.ALIVE,
    });

    component.formGroup.markAsDirty()
    fixture.detectChanges();

    const saveButton = fixture.debugElement.query(
      By.css('p-button button')
    ).nativeElement;

    expect(saveButton.classList.contains('p-disabled')).toBe(true);
  });

  it('should call save method when save button is clicked and the form is valid', () => {
    component.formGroup.patchValue({
      image: 'asdsadsadas',
      name: 'sadsdasdas',
      species: 'sadsadasdsa',
      status: CharacterStatus.ALIVE,
    });

    component.formGroup.markAsDirty();
    fixture.detectChanges();

    const saveButton = fixture.debugElement.query(
      By.css('p-button button')
    ).nativeElement;

    expect(saveButton.classList.contains('p-disabled')).toBe(false);
  });
});
