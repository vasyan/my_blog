type Pipe = {
  id: number,
  title: string,
  image: string,
  path: string;
}

type Bike = {
  id: number,
  title: string,
  image: string,
  path: string;
}
export type Asset = {
  bikeId: number,
  pipeId: number,
  image?: string,
}

// const getAssetPath = (path: string) => {
//   if (import.meta.env.PROD) {
//     return path.replace('/src/assets', 'assets')
//   }
//   return path;
// }

const mapAsset = <T extends Bike | Asset | Pipe>(asset: T): T => {
  // if (import.meta.env.PROD) {
  //   const wpPath = '/wp-content/plugins/vroom-player/assets/'
  //   console.log('replace it');
  //   return {
  //     ...asset,
  //     audio: 'audio' in asset ? asset.audio.replace('/src/assets', wpPath) : undefined,
  //     image: 'image' in asset ? asset.image?.replace('/src/assets', wpPath) : undefined,
  //   }
  // }

  return asset;
}

export const pipes: Pipe[] = [
  {
    id: 1,
    title: 'Akrapovic',
    image: '/revfella/assets/pipes/akrapovic.png',
    path: 'akrapovic'
  },
  {
    id: 2,
    title: 'Akrapovic GP',
    image: '/revfella/assets/pipes/akrapovic_gp.png',
    path: 'akrapovic_gp'
  },
  {
    id: 3,
    title: 'Yoshimura R77',
    image: '/revfella/assets/pipes/yoshimura_r77.png',
    path: 'yoshimura_r77'
  },
  {
    id: 4,
    title: 'Yoshimura Alpha T',
    image: '/revfella/assets/pipes/yoshimura_alpha.png',
    path: 'yoshimura_alpha'
  },
  {
    id: 5,
    title: 'Leo Vince LV-10',
    image: '/revfella/assets/pipes/leo_vince_lv10.png',
    path: 'leo_vince'
  },
  {
    id: 6,
    title: 'Two Brothers M2 Black Series',
    image: '/revfella/assets/pipes/two_brothers_m2.png',
    path: 'two_brothers_m2'
  },
  {
    id: 7,
    title: 'Two Brothers S1R',
    image: '/revfella/assets/pipes/two_brothers_s1r.png',
    path: 'two_brothers_s1r'
  },
  {
    id: 8,
    title: 'Arrow GP2',
    image: '/revfella/assets/pipes/arrow_gp2.png',
    path: 'arrow_gp2'
  },
  {
    id: 9,
    title: 'Arrow X-Kone',
    image: '/revfella/assets/pipes/arrow_x_kone.png',
    path: 'arrow_xkone'
  },
  {
    id: 10,
    title: 'FMF Powercore 4',
    image: '/revfella/assets/pipes/fmf_powercore.png',
    path: 'fmf_powercore'
  },
  {
    id: 11,
    title: 'FMF Factory 4.1',
    image: '/revfella/assets/pipes/fmf_factory.png',
    path: 'fmf_factory'
  },
  {
    id: 12,
    title: 'FMF Q4',
    image: '/revfella/assets/pipes/fmf_q4.png',
    path: 'fmf_q4'
  },
  {
    id: 13,
    title: 'Graves Hexagonal',
    image: '/revfella/assets/pipes/graves_hexagonal.png',
    path: 'grave_hexagonal'
  }
].map(mapAsset);

export const bikes: Bike[] = [
  {
    id: 1,
    title: 'Suzuki SV650',
    image: '/revfella/assets/suzuki_sv650/main.jpg',
    path: 'suzuki_sv650'
  },
  {
    id: 2,
    title: 'Yamaha R1',
    image: '/revfella/assets/yamaha_r1/main.jpg',
    path: 'yamaha_r1'
  },
  {
    id: 3,
    title: 'Honda Grom',
    image: '/revfella/assets/honda_grom/main.jpg',
    path: 'honda_grom'
  },
  {
    id: 4,
    title: 'KTM Duke 390',
    image: '/revfella/assets/ktm_duke390/main.jpg',
    path: 'ktm_duke390'
  },
  {
    id: 5,
    title: 'Yamaha MT-07',
    image: '/revfella/assets/yamaha_mt07/main.jpg',
    path: 'yamaha_mt07'
  },
].map(mapAsset);

export const assets: Asset[] = [
  {
    bikeId: 1,
    pipeId: 2,
  },
  {
    bikeId: 1,
    pipeId: 1,
  },
  {
    bikeId: 1,
    pipeId: 5,
  },
  {
    bikeId: 1,
    pipeId: 7,
  },
  {
    bikeId: 1,
    pipeId: 4,
  },
  {
    bikeId: 1,
    pipeId: 3,
  },

  // R1
  {
    bikeId: 2,
    pipeId: 1,
  },
  {
    bikeId: 2,
    pipeId: 8,
  },
  {
    bikeId: 2,
    pipeId: 10,
  },
  {
    bikeId: 2,
    pipeId: 13,
  },
  {
    bikeId: 2,
    pipeId: 5,
  },
  {
    bikeId: 2,
    pipeId: 7,
  },
  {
    bikeId: 2,
    pipeId: 1,
  },
  {
    bikeId: 2,
    pipeId: 4,
  },

  // Grom
  {
    bikeId: 3,
    pipeId: 3,
  },
  {
    bikeId: 3,
    pipeId: 2,
  },
  {
    bikeId: 3,
    pipeId: 5,
  },
  {
    bikeId: 3,
    pipeId: 7,
  },
  {
    bikeId: 3,
    pipeId: 9,
  },
  {
    bikeId: 3,
    pipeId: 11,
  },

  // KTP Duke 390
  {
    bikeId: 4,
    pipeId: 1,
  },
  {
    bikeId: 4,
    pipeId: 8,
  },
  {
    bikeId: 4,
    pipeId: 5,
  },
  {
    bikeId: 4,
    pipeId: 4,
  },
  {
    bikeId: 4,
    pipeId: 3,
  },

  // Yamaha MT-07
  {
    bikeId: 5,
    pipeId: 1,
  },
  {
    bikeId: 5,
    pipeId: 7,
  },
  {
    bikeId: 5,
    pipeId: 6,
  },
  {
    bikeId: 5,
    pipeId: 7,
  },
  {
    bikeId: 5,
    pipeId: 4,
  },
  {
    bikeId: 5,
    pipeId: 3,
  },
].map(mapAsset);
