import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const TIME_KEY = 'videoplayer-current-time';

timeCheck();

const onPlay = function ({ seconds }) {
  localStorage.setItem(TIME_KEY, seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

player.setCurrentTime(localStorage.getItem(TIME_KEY)).catch(function (error) {
  console.error(error);
});

function timeCheck() {
  if (localStorage.getItem(TIME_KEY) === null) {
    return localStorage.setItem(TIME_KEY, 0);
  }
  player.setCurrentTime(localStorage.getItem(TIME_KEY));
}
