import React, {useState, useEffect} from 'react';
import {interval, Subject} from "rxjs";
import { takeUntil } from 'rxjs';

import DisplayComponent from './components/DisplayComponent';
import BtnComponent from './components/BtnComponent';
import './App.css';

function App() {

  const [time, setTime] = useState(0);
  const [watchOn, setWatchOn] = useState(false);
  const [status, setStatus] = useState(0);

  useEffect(() => {

    const unsubscribe = new Subject();
    interval(10).pipe(takeUntil(unsubscribe)).subscribe(() => {
          if (watchOn) {
            setTime(val => val + 1);
          }
        });
    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [watchOn]);


  const start = () => {
    setWatchOn(prevState => !prevState);
    setStatus(1);
  }


  const resume = () => {
    start();
  }


  const stop = () => {
    if (time !== 0) {
      setWatchOn(false);
    }
    setStatus(2);
  }


  const reset = () => {
    setTime(0);
    setWatchOn(false);
    setStatus(0);
  }

  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <DisplayComponent time = {time}/>
          <BtnComponent start = {start}
                        stop = {stop}
                        reset = {reset}
                        resume = {resume}
                        status = {status}/>
        </div>
      </div>
    </div>
  );
}


export default App;
