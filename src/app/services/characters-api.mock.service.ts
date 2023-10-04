import { Observable, of } from "rxjs";
import { Character, CharacterStatus } from "../characters/model/character.model";

export class MockCharactersApiService {
    getCharacters(): Observable<Character[]> {
      return of([
        {
          id: 1,
          name: 'Mock Character',
          status: CharacterStatus.ALIVE,
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: { name: 'Mock Planet', url: 'http://mock-url.com' },
          location: { name: 'Mock City', url: 'http://mock-url.com' },
          image: 'http://mock-image-url.com',
          episode: ['http://mock-episode-url.com'],
          url: 'http://mock-character-url.com',
          created: new Date()
        }
      ]);
    }
  }