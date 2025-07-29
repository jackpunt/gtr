import { AliasLoader, NamedContainer, type Paintable, type Tile } from "@thegraid/easeljs-lib";
import { Rectangle } from "@thegraid/easeljs-module";
import { CardShape } from "./card-shape";

type CardCount = Record<string, number>;
export class GtrCard extends NamedContainer implements Tile {

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


  baseShape!: Paintable;

  constructor(Aname: string, width = 750, rotate = 0, crop = 0) {
    super(Aname);
    this.baseShape = this.makeShape(width);
    this.addComponents(crop);
    this.rotation = rotate;
    this.reCache();
  }

  // invoked by constructor.super() & this.makeBleed()
  /**
   *
   * @param size  shorter side of card; longer is radius*1.4
   *
   * @returns
   */
  makeShape(size?: number): Paintable {
    // NOTE: portrait = true: TileExporter rotates to fit template
    return new CardShape('lavender', '', size, true, 0, 10);
  }
   makeBleed(bleed = 0, bleedColor = 'white'): Paintable {
    const bleedShape = this.makeShape(); // expect a RoundedRect/CardShape or TileShape/HexShape
    bleedShape.rotation = this.rotation;
    const { x, y, width, height } = bleedShape.getBounds()
    bleedShape.scaleX = (width + 2 * bleed) / width;
    bleedShape.scaleY = (height + 2 * bleed) / height;
    // bleedShape.x -= bleed; // align bleedShape with baseShape
    // bleedShape.y -= bleed; // override if makeShape() is centered
    // bounds now: { x - bleed, y - bleed, width+2*bleed, height+2*bleed }
    bleedShape.paint(bleedColor, true);
    return bleedShape;
  }

  addComponents(crop = 0) {
    const bmImage = AliasLoader.loader.getBitmap(this.Aname, 0); // do not scale
    // bmImage.image: [808 x 1108] or [810 x 1110] -> crop to GridSpec (which is baseShape!)
    if (bmImage) {
      const image = bmImage.image;
      const cropx = crop; // crop if requested (remove bleed for home printer)
      const cropy = crop;
      bmImage.sourceRect = new Rectangle(cropx, cropy, image.width-2*cropx, image.height-2*cropy);
      bmImage.x += cropx;
      bmImage.y += cropy;
      this.addChild(bmImage);
    }
    return;
  }
}
