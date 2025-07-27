import { PageSpec, TileExporter as TileExporterLib, type CountClaz, type GridSpec } from "@thegraid/easeljs-lib";
import { GtrCard } from "./gtr-card";
// import { CubeCard } from "./cube-card";

// end imports

export class TileExporter extends TileExporterLib {

  // x0 = pixel margin + bleed + width/2
  static euroPoker: GridSpec = {
    width: 3600, height: 5400, nrow: 6, ncol: 3, cardw: 1040, cardh: 734, double: false,
    x0: 158 + 30 + 1040/2, y0: 320 + 30 + 734/2, delx: 1122.5, dely: 803, bleed: 30,
  }

  /** for home printer 8x10 @ 300dpi = 2400 x 3000 */
  static euroPoker2: GridSpec = {
    width: 2400, height: 3000, nrow: 4, ncol: 2, cardw: 1040, cardh: 734, double: false,
    x0: 60 + 1040/2, y0: 25 + 734/2, delx: 1122.5, dely: 734, bleed: 0, bgColor: 'white',
  }

  // for home printer 8x10 @ 300 dpi
  // // 808 x 1108
  static stdPoker2: GridSpec = {
    width: 2400, height: 3000, nrow: 4, ncol: 2, cardw: 1108, cardh: 808, double: false,
    x0: 60 + 1108/2, y0: 50 + 808/2, delx: 1122.5, dely: 810, bleed: 0, bgColor: 'white',
  }

  gridSpec = GtrCard.myGrid;

  // invoked by onclick('makePage')
  override makeImagePages() {
    // [...[count, claz, ...constructorArgs]]
    const cardSingle_euro_back = [
    ] as CountClaz[];
    const cardSingle_euro_base = [
      ...GtrCard.allCards(),
    ] as CountClaz[];

    const pageSpecs: PageSpec[] = [];
    this.clazToTemplate(cardSingle_euro_base, this.gridSpec, pageSpecs);
    return pageSpecs;
  }

}
