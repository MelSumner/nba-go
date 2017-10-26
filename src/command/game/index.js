import NBA from 'nba-stats-client';
import parse from 'date-fns/parse';
import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';
import format from 'date-fns/format';
import emoji from 'node-emoji';
import CFonts from 'cfonts';

import createGameList from './createGameList';
import { error } from '../../utils/log';

const game = async option => {
  let _date;
  if (option.date) {
    _date = option.date;
  } else if (option.today) {
    _date = Date.now();
  } else if (option.tomorrow) {
    _date = addDays(Date.now(), 1);
  } else if (option.yesterday) {
    _date = subDays(Date.now(), 1);
  } else {
    error(`Can't find any option ${emoji.get('confused')}`);
    process.exit(1);
  }

  CFonts.say(format(_date, 'YYYY/MM/DD'), {
    font: 'block',
    align: 'left',
    colors: ['blue', 'red'],
    background: 'black',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '10',
  });

  const {
    sports_content: { games: { game: gamesData } },
  } = await NBA.getGamesFromDate(parse(_date));

  const answer = await createGameList(gamesData);
  console.log(answer);
};

export default game;
