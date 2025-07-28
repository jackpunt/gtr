import { ImageGrid, PageSpec, TileExporter as TileExporterLib, type CountClaz, type GridSpec } from "@thegraid/easeljs-lib";
import { GtrCard } from "./gtr-card";

type CardCount = Record<string, number>;

export class TileExporter extends TileExporterLib {

  // Note: 1108 = 1050 + 2 * (bleed-1); 808 = 750 + 2 * (bleed-1)
  // indenting each by 2px to show cut-lines
  static cardSingle_3_5_home: GridSpec = {
    width: 8.25*300, height: 10.85*300, nrow: 4, ncol: 2, cardw: 1050, cardh: 750, double: false,
    x0: 150 + 1050/2, y0: 100 + 750/2, delx: 1050, dely: 750, bleed: 0, bgColor: 'white',
  }
  // from ImageGrid:
  static cardSingle_3_5 = {
    width: 3600, height: 5400, nrow: 6, ncol: 3, cardw: 1050, cardh: 750, // (inch_w*dpi + 2*bleed)
    x0: 120 + 3.5 * 150 + 30, y0: 83 + 3.5 * 150 + 30, delx: 1125, dely: 825, bleed: 30, double: false,
  };
  // 8 x 10 @ 300 dpi; 3.5" x 2.5"
  // cardSingle_3_5_home (dpi=1 vs x=3.5 @ 300 dpi)
  // cardw: 1050, cardh: 750 (image is 1108 X 808...)
  myGrid: GridSpec = TileExporter.cardSingle_3_5_home;

  makeThesePages(cardCountAry: CardCount[] = [this.namesAll]) {
    const pageSpecs: PageSpec[] = [];
    const { cardh, cardw, bleed, dpi } = this.myGrid;
    const narrow = Math.min(cardh!, cardw!);
    const radius = narrow ? ((dpi ? narrow : narrow + 2 * (bleed ?? 0)) * (dpi ?? 1)) : 750;

    cardCountAry.forEach(cc => {
      const clazCountAry = Object.keys(cc).map((name) => {
        const count = cc[name];
        return [count, GtrCard, name, radius] as CountClaz;
      });
      this.clazToTemplate(clazCountAry, this.myGrid, pageSpecs);
    })
    return pageSpecs;
  }
  /** Files to load */
  get fnames() { return Object.keys(this.namesAll) }

  // All the Files to be loaded:
  namesAll: CardCount = {
    "Odd-013-Back": 1,    // back of Card
    "Odd-013-Back1": 1,   // back of Card (again)
    "Player Aid": 1,
    "Player Aid2": 1,
    "GtrLeaderCard": 1,
    "3VP-Bonus-Brown": 1,
    "3VP-Bonus-Yellow": 1,
    "3VP-Bonus-Grey": 1,
    "3VP-Bonus-Red": 1,
    "3VP-Bonus-Blue": 1,
    "3VP-Bonus-Purple": 1,
    "Grey-000": 1,
    "Grey-001": 1,
    "Grey-002": 1,
    "Grey-003": 1,
    "Grey-004": 1,
    "Grey-005": 1,
    "Grey-006": 1,
    "Grey-007": 1,
    "Grey-008": 1,
    "Grey-009": 1,
    "Grey-blank": 0,

    "Red-010": 1,
    "Red-011": 1,
    "Red-012": 1,
    "Red-013": 1,
    "Red-014": 1,
    "Red-015": 1,
    "Red-016": 1,
    "Red-017": 1,
    "Red-018": 1,
    "Red-019": 1,
    "Red-blank": 0,

    "Yellow-014": 1,
    "Yellow-015": 1,
    "Yellow-016": 1,
    "Yellow-017": 1,
    "Yellow-018": 1,
    "Yellow-blank": 0,

    "Brown-019": 1,
    "Brown-020": 1,
    "Brown-021": 1,
    "Brown-022": 1,
    "Brown-023": 1,
    "Brown-blank": 0,

    "Blue-021": 1,
    "Blue-022": 1,
    "Blue-023": 1,
    "Blue-024": 1,
    "Blue-025": 1,
    "Blue-026": 1,
    "Blue-027": 1,
    "Blue-028": 1,
    "Blue-029": 1,
    "Blue-030": 1,
    "Blue-blank": 0,

    "Purple-031": 1,
    "Purple-032": 1,
    "Purple-033": 1,
    "Purple-034": 1,
    "Purple-035": 1,
    "Purple-036": 1,
    "Purple-037": 1,
    "Purple-038": 1,
    "Purple-039": 1,
    "Purple-040": 1,
    "Purple-blank": 0,

    "Odd-000-Jack": 1,    // double-sided
    "Odd-001-Stone": 1,   // Site
    "Odd-002-Marble": 1,
    "Odd-003-Concrete": 1,
    "Odd-004-Brick": 1,
    "Odd-005-Wood": 1,
    "Odd-006-Rubble": 1,
    "Odd-007-Rubble": -1, // back of Site
    "Odd-008-Wood": -1,
    "Odd-009-Brick": -1,
    "Odd-010-Concrete": -1,
    "Odd-011-Marble": -1,
    "Odd-012-Stone": -1,

    "Odd-098-Blank": 1,
    // "GtrLegionaryRule": 1,
  };

  // invoked by onclick('makePage')
  override makeImagePages() {
    return this.makeThesePages([this.namesSmall]);
  }

  namesSmall: CardCount = {
    // "Odd-013-Back": 2,    // back of Card
    "Player Aid": 2,
    "Player Aid2": 2,
    "Odd-000-Jack": 2,    // back of Card
    "Purple-040": 3,
    // "Red-014": 3,
    // "Red-015": 3,
    // "Red-016": 3,
    // "Grey-000": 3,
    "Grey-001": 3,
    "Grey-002": 2,
  }
}

export class TileExporterHome extends TileExporter {

  override makeImagePages() {
    return this.makeThesePages([this.names3]);
  }
  // Grey-000:009, Red-010:019, Yellow-014:018, Brown-019:023, Blue-021:030, Purple-031:040,
  // Odd-000:013

  names3: CardCount = {
    "Odd-013-Back": 8,    // back of Card
    "Player Aid": 4,
    "Player Aid2": 4,
    "GtrLeaderCard": 2,
    "3VP-Bonus-Brown": 1,
    "3VP-Bonus-Yellow": 1,
    "3VP-Bonus-Grey": 1,
    "3VP-Bonus-Red": 1,
    "3VP-Bonus-Blue": 1,
    "3VP-Bonus-Purple": 1,
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

    "Yellow-014": 6,
    "Yellow-015": 6,
    "Yellow-016": 6,
    "Yellow-017": 6,
    "Yellow-018": 6,
    "Yellow-blank": 0,

    "Brown-019": 6,
    "Brown-020": 6,
    "Brown-021": 6,
    "Brown-022": 6,
    "Brown-023": 6,
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
    "Odd-006-Rubble": 6,
    "Odd-007-Rubble": -6, // back of Site
    "Odd-008-Wood": -6,
    "Odd-009-Brick": -6,
    "Odd-010-Concrete": -6,
    "Odd-011-Marble": -6,
    "Odd-012-Stone": -6,

  };
}

export class TileExporterPro extends TileExporter {

  constructor() {
    super();
    this.myGrid = ImageGrid.cardSingle_3_5; // 750 x 1050 + bleed: 30
  }
  // invoked by onclick('makePage')
  override makeImagePages() {
    return this.makeThesePages([this.pub1x6, this.pub1x6Back]);
  }

    // File1-6x (5-Yellow, 5-Brown, Jack, Sites, PlayerAid) Back: (5-Back, 5-Back, Jack, Sites, PlayerAid2)
  pub1x6: CardCount = {
    "Yellow-014": 1,
    "Yellow-015": 1,
    "Yellow-016": 1,
    "Yellow-017": 1,
    "Yellow-018": 1,

    "Brown-019": 1,
    "Brown-020": 1,
    "Brown-021": 1,
    "Brown-022": 1,
    "Brown-023": 1,

    "Player Aid": 1,
    "Odd-000-Jack": 1,    // double-sided
    "Odd-001-Stone": 1,   // Site
    "Odd-002-Marble": 1,
    "Odd-003-Concrete": 1,
    "Odd-004-Brick": 1,
    "Odd-005-Wood": 1,
    "Odd-006-Rubble": 1,
  }
  pub1x6Back: CardCount = {
    "Odd-013-Back": 9,    // back of Yellow & Brown
    "Odd-000-Jack": -1,     // double-sided
    "Player Aid2": -1,
    "Odd-013-Back1": 1,    // back of Yellow & Brown
    "Odd-009-Brick": -1,
    "Odd-008-Wood": -1,
    "Odd-007-Rubble": -1,   // back of Site
    "Odd-012-Stone": -1,
    "Odd-011-Marble": -1,
    "Odd-010-Concrete": -1,
  }

}
