import app from './app';
import db from './db/index';

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port 3000');
});