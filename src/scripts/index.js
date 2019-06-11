import '../styles/index.scss';
import { Earth } from './earth';
import { showVideo, showFinalButton } from './showVideoCallback';
import { city } from '../city';
const TIME_WAIT_PHONE = 5000;
let cityCount = 0;
const cityView = [
  'Союз «Дальневосточная ТПП»',
  'Союз «Няганская ТПП»',
  'Союз «Санкт-Петербургская ТПП»',
  'Союз «ТПП Воронежской области»',
  'Союз «ТПП Ростовской области»',
  'Союз «ТПП Саратовской области»',
  'Союз «ТПП Ставропольского края»',
  'Союз «Южно-Уральская ТПП»',
];

const audio = new Audio('/images/phone1.mp3');
audio.loop = true;

export const earth = new Earth('webgl');

$('.phone').css('display', 'none');

function callbackFunc(name) {
  if (name !== cityView[cityCount]) return;
  showVideo('./images/videoplayback.mp4');

  //эту функцию нужно засунуть в callback окончания видео
}
export function endVideo() {
  earth.defaultCamera();
  cityCount++;
  console.log(cityCount);
  if (cityCount === 2) {
    //отображение кнопки запуска нейросети cityView.length
    showFinalButton();
    console.log('finish');
  } else {
    setTimeout(() => {
      $('.phone').css('display', 'block');
      audio.play();
    }, TIME_WAIT_PHONE + 4000);
  }
}
city.forEach(item => {
  earth.newCity(item.name, { lat: item.lat, lon: item.lon }, callbackFunc);
});

$('.play-btn').click(function() {
  $('.play-btn').addClass('end');
  setTimeout(() => {
    $('.play-btn').css('display', 'none');
    earth.enableControls(true);
    setTimeout(() => {
      $('.phone').css('display', 'block');
      audio.play();
    }, TIME_WAIT_PHONE);
  }, 2100);
});

$('.phone').click(function() {
  $('.phone').css('display', 'none');
  audio.pause();
  earth.showCity(cityView[cityCount], 2000);
});

$('#finalButton').click(function() {
  $('#finalButton').css('opacity', '0');
  setTimeout(() => {
    $('#finalButton').css('display', 'none');
    city.forEach(item => earth.line(item.name, 'Союз «Уральская ТПП»'));
  }, 1300);
});
