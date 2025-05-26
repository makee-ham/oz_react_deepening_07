import { useEffect, useState } from 'react';

/**
 * Clock 컴포넌트
 *
 * 실시간 시계를 표시하고 사용자가 시계를 시작하거나 정지할 수 있는 React 함수형 컴포넌트입니다.
 * 시간은 "시", "분", "초"로 나뉘어 표시됩니다.
 *
 * 주요 기능:
 * - 현재 시간을 "HH:mm:ss" 형식으로 표시합니다.
 * - 시계가 실행 중일 때 매초마다 시간을 업데이트합니다.
 **/
function Clock() {
  const [time, setTime] = useState('');
  const [timeChecking, setTimeChecking] = useState(true);

  const getTime = () => {
    const currentTime = new Date();
    const koreaTime = currentTime.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    setTime(koreaTime);
  };

  const handleTimeChecking = () => setTimeChecking((prev) => !prev);

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    if (!timeChecking) return;

    const updateTime = setInterval(getTime, 1000);
    return () => clearInterval(updateTime);
  }, [timeChecking]);

  const [hour, minute, second] = time.split(':');

  return (
    <div className="timer-container">
      <h2>RealTime Clock</h2>
      <div className="time-display">
        <span className="show-time">{hour}시</span>:<span className="show-time">{minute}분</span>:
        <span className="show-time">{second}초</span>
      </div>
      <button onClick={handleTimeChecking} className={`toggle-btn ${timeChecking ? 'running' : 'stopped'}`}>
        {timeChecking ? '타이머 정지' : '타이머 시작'}
      </button>
    </div>
  );
}

export default Clock;
