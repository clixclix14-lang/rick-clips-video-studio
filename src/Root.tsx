import {Composition} from 'remotion';
import {Shorts, type ShortsProps} from './Shorts';

export const RemotionRoot: React.FC = () => (
  <Composition<ShortsProps>
    id="ShortsComposition"
    component={Shorts}
    durationInFrames={900}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{audioSrc: null}}
  />
);
