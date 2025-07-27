import { PageSpec, TileExporter as TileExporterLib, type CountClaz } from "@thegraid/easeljs-lib";
import { GtrCard } from "./gtr-card";
// import { CubeCard } from "./cube-card";

// end imports

export class TileExporter extends TileExporterLib {

  gridSpec = GtrCard.myGrid;

  // invoked by onclick('makePage')
  // override
  makeImagePages0() {
    // CountClaz[] --> [...[count, claz, ...constructorArgs]]
    const cardSingle_front = [
      ...GtrCard.allCards(),
    ] as CountClaz[];

    const pageSpecs: PageSpec[] = [];
    this.clazToTemplate(cardSingle_front, this.gridSpec, pageSpecs);
    return pageSpecs;
  }

    // invoked by onclick('makePage')
  override makeImagePages() {
    // CountClaz[] --> [...[count, claz, ...constructorArgs]]
    const pageSpecs: PageSpec[] = GtrCard.makePageSpecs(this);
    return pageSpecs;
  }


}
