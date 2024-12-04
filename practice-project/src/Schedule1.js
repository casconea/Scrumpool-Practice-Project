import events from './sample_data';

function Schedule({ selected_date }) {
  const checkDate = (event_to_check) => {
    return event_to_check.event_date === selected_date;
  };

  return (
    <div>
      <input type="button" value="Go Back" onClick={() => {}} />
      {
        events.map((ee) => {
          if (checkDate(ee)) {
            return (
                <ScheduleItem/>
            )
            
          }
        })
      }
    </div>
  );
}

module.exports = Schedule;
 