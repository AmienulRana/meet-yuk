import moment from "moment";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import React, { useState, useEffect } from "react";


interface IClock {
    meetingTime: string;
}

const Clock = ({ meetingTime }: IClock) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [elapsedTime, setElapsedTime] = useState(
    moment().diff(moment(meetingTime), 'seconds')
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(moment().diff(moment(meetingTime), 'seconds'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [meetingTime]);

  const formattedElapsedTime = moment()
    .startOf('day')
    .seconds(elapsedTime)
    .format('HH:mm:ss');


  return <p className="mt-1 text-sm text-gray-400">your meeting time : <span className="text-primary font-semibold">{formattedElapsedTime}</span></p>;
};

export default Clock;
