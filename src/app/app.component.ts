import { Component, OnInit } from '@angular/core';
import { Player } from './player.model';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  players: Player[] = [];
  newPlayer: Player = {
    playerName: '',
    position: '', 
    goalsScored: 0,
    assists: 0,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 0,
  };
  selectedPlayer: Player | null = null;

  constructor(private playerService: PlayerService) {
    this.getPlayers();
  }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService
      .getPlayers()
      .subscribe((players) => (this.players = players));
  }

  addPlayer(): void {
    this.playerService.addPlayer(this.newPlayer).subscribe(() => {
      this.getPlayers();
      this.newPlayer = {
        playerName: '',
        position: '', 
        goalsScored: 0,
        assists: 0,
        yellowCards: 0,
        redCards: 0,
        minutesPlayed: 0,
      };
    });
  }

  updatePlayer(player: Player) {
    if (player._id) {
      this.playerService.updatePlayer(player._id, player).subscribe(
        (updatedPlayer) => {
          const index = this.players.findIndex(
            (p) => p._id === updatedPlayer._id
          );
          if (index !== -1) {
            this.players[index] = updatedPlayer;
          }
        },
        (error) => {
          console.error('Error updating player:', error);
        }
      );
    }
  }

  deletePlayer(playerId: string| undefined): void {
    if (!playerId) {
      return;
    }
    this.playerService
      .deletePlayer(playerId)
      .subscribe(() => this.getPlayers());
  }
}
