import { Tile } from "@thegraid/hexlib";


export class GtrCard extends Tile {
    static cardImage: Record<string, string> = {
    '=': 'cube', 'f': 'foot', 'F': 'flag', '$': 'coin', '#': 'credit2', 'r': 'roll',
    '!': 'power', 'C': 'cat', 'X': 'sword', 'V': 'shield', 'H': 'cheese' }

  static get fnames() {
    return  [... Object.values(GtrCard.cardImage)];
  }
}
