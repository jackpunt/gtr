import { type CountClaz, type GridSpec, type PageSpec, type Paintable } from "@thegraid/easeljs-lib";
import { AliasLoader, Tile } from "@thegraid/hexlib";
import { C } from "@thegraid/common-lib";
import { CardShape } from "./card-shape";

type CardCount = Record<string, number>;
export class GtrCard extends Tile {

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
    "GtrLeaderCard": 1,
    "Odd-000-Jack": 1,    // double-sided
    "Odd-001-Stone": 1,   // Site
    "Odd-002-Marble": 1,
    "Odd-003-Concrete": 1,
    "Odd-004-Brick": 1,
    "Odd-005-Wood": 1,
    "Odd-006-Rubble": 1,
  }
  pub1x6Back: CardCount = {
    "Odd-013-Back": 10,    // back of Yellow & Brown
    "Player Aid2": 1,
    "Odd-000-Jack": 1,     // double-sided
    "Odd-007-Rubble": 1,   // back of Site
    "Odd-008-Wood": 1,
    "Odd-009-Brick": 1,
    "Odd-010-Concrete": 1,
    "Odd-011-Marble": 1,
    "Odd-012-Stone": 1,
  }

  width = 750;
  color = C.WHITE;

  // shorter side of card; longer is radius*1.4
  override get radius() {
    return this.width;
  } // nextRadius

  get height() {
    return this.width * 1.4;
  }

  constructor(Aname: string, width = 750) {
    super(Aname);
    this.width = width;
    this.addComponents();
    this.textVis;
  }
  // invoked by constructor.super()
  override makeShape(): Paintable {
    // portrait = true: TileExporter rotates to fit template
    return new CardShape('lavender', this.color, this.width, true, 0, 10);
  }

  addComponents() {
    const bmImage = AliasLoader.loader.getBitmap(this.Aname, 0); // do not scale
    const { x, y, height, width } = this.baseShape.getBounds();
    // bmImage.image: [808 x 1108] or [810 x 1110] -> crop to GridSpec (which is baseShape!)
    if (bmImage) {
      // bmImage.setBounds(width/2, height/2, width, height);
      const image = bmImage.image;
      // bmImage.x -= (width - bmImage.image.width)/2;   // center image on card, may lose the 'bleed' from image
      // bmImage.y -= (height - bmImage.image.height)/2; //      this.addChild(bmImage);  // image is centered on baseShape
      this.addChild(bmImage);
      this.setBounds(x, y, width, height);
      this.reCache();
    }
    return;
  }
}
