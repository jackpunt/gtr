import { ImageGrid, type CountClaz, type GridSpec, type Paintable } from "@thegraid/easeljs-lib";
import { AliasLoader, Tile } from "@thegraid/hexlib";
import { TileExporter } from "./tile-exporter";
import { C } from "@thegraid/common-lib";
import { CardShape } from "./card-shape";


export class GtrCard extends Tile {
  // Grey-000:009, Red-010:019, Yellow-014:018, Brown-019:023, Blue-021:030, Purple-031:040,
  // Odd-000:013
  static names: Record<string, number> = {
    "Red-010": 3,
    "Red-011": 3,
  }
  static names0: Record<string, number> = {
    "Grey-000": 3,
    "Grey-001": 3,
    "Grey-002": 3,
    "Grey-003": 3,
    "Grey-004": 3,
    "Grey-005": 3,
    "Grey-006": 3,
    "Grey-007": 3,
    "Grey-008": 3,
    "Grey-009": 3,
    "Grey-blank": 0,

    "Red-010": 3,
    "Red-011": 3,
    "Red-012": 3,
    "Red-013": 3,
    "Red-014": 3,
    "Red-015": 3,
    "Red-016": 3,
    "Red-017": 3,
    "Red-018": 3,
    "Red-019": 3,
    "Red-blank": 0,

    "Yellow-014": 3,
    "Yellow-015": 3,
    "Yellow-016": 3,
    "Yellow-017": 3,
    "Yellow-018": 3,
    "Yellow-blank": 0,

    "Brown-019": 3,
    "Brown-020": 3,
    "Brown-021": 3,
    "Brown-022": 3,
    "Brown-023": 3,
    "Brown-blank": 0,

    "Blue-021": 3,
    "Blue-022": 3,
    "Blue-023": 3,
    "Blue-024": 3,
    "Blue-025": 3,
    "Blue-026": 3,
    "Blue-027": 3,
    "Blue-028": 3,
    "Blue-029": 3,
    "Blue-030": 3,
    "Blue-blank": 0,

    "Purple-031": 3,
    "Purple-032": 3,
    "Purple-033": 3,
    "Purple-034": 3,
    "Purple-035": 3,
    "Purple-036": 3,
    "Purple-037": 3,
    "Purple-038": 3,
    "Purple-039": 3,
    "Purple-040": 3,
    "Purple-blank": 0,

    "Odd-000-Jack": 6,    // double-sided
    "Odd-001-Stone": 6,   // Site
    "Odd-002-Marble": 6,
    "Odd-003-Concrete": 6,
    "Odd-004-Brick": 6,
    "Odd-005-Wood": 6,
    "Odd-006-Rubble": -6,  // back of Site
    "Odd-007-Rubble": -6,
    "Odd-008-Wood": -6,
    "Odd-009-Brick": -6,
    "Odd-010-Concrete": -6,
    "Odd-011-Marble": -6,
    "Odd-012-Stone": -6,
    "Odd-013-Back": -1,    // back of Card

    "Odd-099-order": 5,   // Player Aid
    "GtrLeaderCard": 1,
    // "Odd-098-Blank": 3,
    // "GtrLegionaryRule": 3,
  };

  static get fnames() {
    return  [... Object.keys(GtrCard.names)];
  }

  static allCards(): CountClaz[] {
    return GtrCard.fnames.map((name) => {
      const n = GtrCard.names[name];
      return [n, GtrCard, name, GtrCard.myGrid]
    });
  }

  // 8 x 10 @ 300 dpi; 3.5" x 2.5"
  static myGrid: GridSpec = {
    width: 2400, height: 3000, nrow: 4, ncol: 2, cardw: 1050, cardh: 750, double: false,
    x0: 60 + 1108/2, y0: 50 + 808/2, delx: 1052, dely: 752, bleed: 0, bgColor: 'white',
  };

  // 808 x 1108; 750 x 1050
  // gridSpec = ImageGrid.cardSingle_3_5; // cardw: 1050, cardh: 750
  gridSpec = GtrCard.myGrid; // cardw: 1050, cardh: 750
  color = C.WHITE;

  // shorter side of card; longer is radius*1.4
  override get radius() { return GtrCard.myGrid?.cardh ?? 750; } // nextRadius

  constructor(Aname: string, gridSpec: GridSpec) {
    super(Aname);
    this.gridSpec = gridSpec;
    this.addComponents();
    this.textVis;
  }
  // invoked by constructor.super()
  override makeShape(): Paintable {
    return new CardShape('lavender', this.color, this.radius, true, 0, 10);
  }

  addComponents() {
    const h = this.gridSpec.cardh!;
    const bmImage = AliasLoader.loader.getBitmap(this.Aname, this.gridSpec.cardw!); // scaled to fit cardw
    const { x, y, height, width } = this.baseShape.getBounds();
    if (bmImage) {
      // bmImage.x -= (width - bmImage.image.width)/2;   // center image on card, may lose the 'bleed' from image
      // bmImage.y -= (height - bmImage.image.height)/2; //
      this.addChild(bmImage);
    }

  }
}
