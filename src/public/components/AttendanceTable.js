import React from 'react';
import cron from 'node-cron';

const AttendanceTable = () => {
  return (
    <div>
      <h1> New Page</h1>
      {
        cron.schedule('* * * * * *', function(){
          console.log('running a task every minute');
        })}
    </div>
  )
}