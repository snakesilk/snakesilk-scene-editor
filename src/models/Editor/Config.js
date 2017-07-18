import {Game} from '@snakesilk/engine';
import {XMLLoader} from '@snakesilk/xml-loader';
import {Traits as PlatformTraits} from '@snakesilk/platform-kit';
import {Traits as MegamanTraits} from '@snakesilk/megaman-kit';

export function createLoader() {
    const loader = new XMLLoader(new Game());
    loader.textureScale = 1;

    loader.traits.add(PlatformTraits);
    loader.traits.add(MegamanTraits);
    return loader;
}
