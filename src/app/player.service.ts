import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from './player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private apiUrl = 'http://localhost:3000/players';

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiUrl);
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.apiUrl, player);
  }

  updatePlayer(id: string, player: Player): Observable<Player> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Player>(url, player);
  }

  deletePlayer(playerId: string| undefined): Observable<any> {
    const url = `${this.apiUrl}/${playerId}`;
    return this.http.delete(url);
  }
}
