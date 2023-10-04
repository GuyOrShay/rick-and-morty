import { Observable, of } from "rxjs";
import { Character } from "../characters/model/character.model";
import { mockCharacters } from "../characters/model/character.mock.model";

export class MockCharactersApiService {
    getCharacters(): Observable<Character[]> {
      return of(mockCharacters);
    }
  }