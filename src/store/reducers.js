import { combineReducers } from 'redux';
import counterReducer from './counter/counterSlice';
import listChannel from './listchannel/listChannelSlice';
import oauthReducer from './oauth/oauthSlice';
import examReducer from './perFormExam/perFormExam';
import galleryReducer from './gallery/gallerySlice';
import detaillearning from './detaillearning/detaillearningSlice';
import networkSlice from './network/networkSlice';
import navlayoutSlice from './navlayout/navlayoutSlice';
import videoReducer from './video/video';
import playerAudio from './playeraudio/detailaudio';
import playerItem from './playeraudio/detailplayer';
import urlaudio from './playeraudio/detailurl';
import voicePlayer from './playeraudio/voiceplayer';
import statusProgress from './playeraudio/statusProgress';
import pageCurrent from './playeraudio/pageCurrent';
import progressLtsAudioBook from './playeraudio/progressLtsAudioBook';
import filterMenu from './menu/filterMenu';
const reducers = combineReducers({
  oauth: oauthReducer,
  counter: counterReducer,
  gallery: galleryReducer,
  exam: examReducer,
  video:videoReducer,
  listChannel: listChannel,
  detaillearning: detaillearning,
  network: networkSlice,
  navlayout: navlayoutSlice,
  detailplayaudio: playerAudio,
  playerAudioItem: playerItem,
  detailUrlAudio: urlaudio,
  voicePlayer: voicePlayer,
  statusProgress: statusProgress,
  pageCurrent: pageCurrent,
  progressLtsAudioBook: progressLtsAudioBook,
  filterMenu: filterMenu,
});
export default reducers;