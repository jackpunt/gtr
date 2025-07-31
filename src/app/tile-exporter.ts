import { ImageGrid, PageSpec, TileExporter as TileExporterLib, type CountClaz, type GridSpec } from "@thegraid/easeljs-lib";
import { CardShape } from "./card-shape";
import { GtrCard } from "./gtr-card";

type CardCount = Record<string, number>;

export class TileExporter extends TileExporterLib {

  // Note: 1108 = 1050 + 2 * (bleed-1); 808 = 750 + 2 * (bleed-1)
  static cardSingle_3_5_home: GridSpec = {
    width: 8.25*300, height: 10.85*300, nrow: 4, ncol: 2, cardw: 1050, cardh: 750, double: false,
    x0: 150 + 1050/2, y0: 100 + 750/2, delx: 1050, dely: 750, bleed: -30, bgColor: 'white',
  }

  // 8 x 10 @ 300 dpi; 3.5" x 2.5"
  // cardSingle_3_5_home (dpi=1 vs x=3.5 @ 300 dpi)
  // cardw: 1050, cardh: 750 (image is 1108 X 808...)
  myGrid: GridSpec = TileExporter.cardSingle_3_5_home;

  makeThesePages(cardCountAry: CardCount[] = [this.namesSmall], pageNames: string[] =[]) {
    CardShape.defaultRadius = 750;
    const pageSpecs: PageSpec[] = [];
    const { cardh, cardw, bleed, dpi } = this.myGrid;  // Note: (bleed<0) to crop will also indent makeBleed...
    const narrow = Math.min(cardh!, cardw!);
    const radius = narrow;

    cardCountAry.forEach(cc => {
      const clazCountAry = Object.keys(cc).map(key => {
        const count = cc[key], rot = (count < 0) ? 180 : 0, crop = ((bleed ?? 0) < 0) ? -bleed! : 0;
        const name = key.replace(/\.+$/, '');
        return [count, GtrCard, name, radius, rot, crop] as CountClaz;
      });
      this.clazToTemplate(clazCountAry, this.myGrid, pageSpecs);
    })
    // apply given baseNames to each page:
    pageSpecs.forEach((spec, n) => spec.basename = pageNames[Math.min(n, pageNames.length-1)])
    return pageSpecs;
  }
  /** Files to load; rm trailing dots */
  get fnames() { return Object.keys(this.namesAll).map(key => key.replace(/\.+$/, '')) }

  // All the Files to be loaded:
  namesAll: CardCount = {
    "Odd-013-Back": 1,    // back of Card
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
    "Player Aid": 2,
    "Player Aid2": 2,
    "Odd-000-Jack": 1,
    "GtrLeaderCard": 1,
    "Odd-000-Jack.": 1,
    "GtrLeaderCard.": 1,
    "Purple-040.": 3,
    "Red-014": 3,
    "Red-015": 3,
    // "Red-016": 3,
    // "Grey-000": 3,
    "Grey-001": 3,
    "Grey-002": 2,
  }
}

/** full set: print each page 1x, 3x, 6x as indicated */
export class TileExporterHome extends TileExporter {

  override makeImagePages() {
    return this.makeThesePages([this.names1], [
      '6xSites',  '6xSites-Jack-Y', '6xY-B',
      '3xG', '3xG-R', '3xR-B', '3xB-P', '3xP',
      '1xBonus', '1xAids', '0xBacks',
    ]);
  }
  names1: CardCount = {

    "Odd-001-Stone": 1,   // Site
    "Odd-012-Stone": -1,  // back of Site
    "Odd-002-Marble": 1,
    "Odd-011-Marble": -1,
    "Odd-003-Concrete": 1,
    "Odd-010-Concrete": -1,
    "Odd-004-Brick": 1,
    "Odd-009-Brick": -1,
    "Odd-005-Wood": 1,
    "Odd-008-Wood": -1,
    "Odd-006-Rubble": 1,
    "Odd-007-Rubble": -1,

    "Odd-000-Jack": 1,    // double-sided
    "Odd-000-Jack.": -1,  // double-sided

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

    "GtrLeaderCard": 1,
    "GtrLeaderCard.": 1,

    "3VP-Bonus-Brown": 1,
    "3VP-Bonus-Yellow": 1,
    "3VP-Bonus-Grey": 1,
    "3VP-Bonus-Red": 1,
    "3VP-Bonus-Blue": 1,
    "3VP-Bonus-Purple": 1,

    "Player Aid": 1,
    "Player Aid2": -1,
    "Player Aid.": 1,
    "Player Aid2.": -1,
    "Player Aid..": 1,
    "Player Aid2..": -1,
    "Player Aid...": 1,
    "Player Aid2...": -1,

    "Odd-013-Back": 8,    // back of Card
  };
}

/** full set: print each page once. */
export class TileExporterHome3 extends TileExporter {

  override makeImagePages() {
    return this.makeThesePages([this.names3]);
  }

  names3: CardCount = {
    "Odd-013-Back": 8,    // p0: back of Card
    "Player Aid": 4,      // p1: aids
    "Player Aid2": 4,
    "GtrLeaderCard": 2,   // bonus
    "3VP-Bonus-Brown": 1,
    "3VP-Bonus-Yellow": 1,
    "3VP-Bonus-Grey": 1,
    "3VP-Bonus-Red": 1,
    "3VP-Bonus-Blue": 1,
    "3VP-Bonus-Purple": 1,

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

export class TileExporterSpare extends TileExporter {

  constructor() {
    super();
    this.myGrid = ImageGrid.cardSingle_3_5; // 750 x 1050 + bleed: 30
  }
  override makeImagePages() {
    return this.makeThesePages([this.spare0x1, this.spare0x1Back], ['spare0x1', 'spare0x1Back']);
  }
  spare0x1: CardCount = {
    "Player Aid": 3,
    "Player Aid.": 1,
    "GtrLeaderCard": 1,
    "Player Aid..": 1,
    "Purple-040": 3,
    "Odd-004-Brick": 6,
  }
  spare0x1Back: CardCount = {
    "Player Aid2": -3,
    "Player Aid2.": -1,
    "GtrLeaderCard": -1,
    "Player Aid2..": -1,
    "Odd-013-Back.": 3,    // back of Yellow & Brown
    "Odd-009-Brick": -6,   // back of Site
  }
}

export class TileExporterPro extends TileExporter {

  constructor() {
    super();
    this.myGrid = ImageGrid.cardSingle_3_5; // 750 x 1050 + bleed: 30
  }
  // invoked by onclick('makePage')
  override makeImagePages() {
    return this.makeThesePages(
      [
        // this.spare0x1, this.spare0x1Back,
        this.pub1x5, this.pub1x5Back,
        this.pub2x1, this.pub2x1Back,
        this.pub3x3, this.pub4x3, this.pub5x1,
        this.pub345_Back,
      ],
      [
        // 'spare0x1', 'spare0x1Back',
        'pub1x5', 'pub1x5Back',
        'pub2x1', 'pub2x1Back',
        'pub3x3', 'pub4x3', 'pub5x1',
        'pub345_Back',
      ]
      );
  }

    // File1-6x (5-Yellow, 5-Brown, Jack, Sites, PlayerAid) Back: (5-Back, 5-Back, Jack, Sites, PlayerAid2)
    pub1x5: CardCount = {
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
  pub1x5Back: CardCount = {
    "Odd-013-Back.": 9,    // back of Yellow & Brown
    "Odd-000-Jack": -1,    // double-sided
    "Player Aid2": -1,
    "Odd-013-Back": 1,     // back of Yellow & Brown
    "Odd-010-Concrete": -1,
    "Odd-011-Marble": -1,
    "Odd-012-Stone": -1,
    "Odd-007-Rubble": -1,
    "Odd-008-Wood": -1,
    "Odd-009-Brick": -1,   // back of Site
  }

  pub2x1: CardCount = {
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

    "GtrLeaderCard": 1,
    "Odd-000-Jack": 1,     // double-sided

    "Odd-001-Stone": 1,   // Site
    "Odd-002-Marble": 1,
    "Odd-003-Concrete": 1,
    "Odd-004-Brick": 1,
    "Odd-005-Wood": 1,
    "Odd-006-Rubble": 1,
  }

  pub2x1Back: CardCount = {
    "Odd-013-Back.": 9,    // back of Yellow & Brown
    "Odd-000-Jack": -1,    // double-sided
    "GtrLeaderCard": -1,
    "Odd-013-Back": -1,     // back of Yellow & Brown
    "Odd-010-Concrete": -1,// back of Site
    "Odd-011-Marble": -1,
    "Odd-012-Stone": -1,
    "Odd-007-Rubble": -1,
    "Odd-008-Wood": -1,
    "Odd-009-Brick": -1,
  }

  pub3x3: CardCount = {
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

    "Red-010": 1,
    "Red-011": 1,
    "Red-012": 1,
    "Red-013": 1,
    "Red-014": 1,
    "Red-015": 1,
    "Red-016": 1,
    "Red-017": 1,
  }
  pub4x3: CardCount = {
    "Red-018": 1,
    "Red-019": 1,

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

    "Purple-031": 1,
    "Purple-032": 1,
    "Purple-033": 1,
    "Purple-034": 1,
    "Purple-035": 1,
    "Purple-036": 1,
  }
  pub5x1: CardCount ={
    "Purple-037": 3,
    "Purple-038": 3,
    "Purple-039": 3,
    "Purple-040": 3,

    "3VP-Bonus-Brown": 1,
    "3VP-Bonus-Yellow": 1,
    "3VP-Bonus-Grey": 1,
    "3VP-Bonus-Red": 1,
    "3VP-Bonus-Blue": 1,
    "3VP-Bonus-Purple": 1,
  }
  pub345_Back: CardCount = {
    "Odd-013-Back": 18,    // back of Card
  }

}
