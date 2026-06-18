// MCX Gold trading hours: Monday–Friday, 9:00 AM – 11:30 PM IST (UTC+5:30)
// Pre-market / after-market reference prices update at different cadences.

const MCX_OPEN_MINUTES  = 9 * 60;           // 9:00 AM → 540 min
const MCX_CLOSE_MINUTES = 23 * 60 + 30;     // 11:30 PM → 1410 min

function nowIST() {
  // Create a date object representing current time in IST without timezone shenanigans
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
}

export function isMarketOpen(date) {
  const ist = date ? new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })) : nowIST();
  const day = ist.getDay(); // 0=Sun … 6=Sat
  if (day === 0 || day === 6) return false;
  const mins = ist.getHours() * 60 + ist.getMinutes();
  return mins >= MCX_OPEN_MINUTES && mins < MCX_CLOSE_MINUTES;
}

export function getMarketStatus() {
  const ist = nowIST();
  const day = ist.getDay();
  const mins = ist.getHours() * 60 + ist.getMinutes();

  if (day === 0 || day === 6) {
    // Weekend → next open is Monday 9am IST
    const daysUntilMon = day === 6 ? 2 : 1;
    const msUntilMon = daysUntilMon * 24 * 60 * 60 * 1000
      - (ist.getHours() * 3600 + ist.getMinutes() * 60 + ist.getSeconds()) * 1000
      + MCX_OPEN_MINUTES * 60 * 1000;
    return { isOpen: false, label: 'Weekend', nextOpenMs: msUntilMon, color: 'gray' };
  }

  if (mins < MCX_OPEN_MINUTES) {
    // Pre-market weekday
    const msUntilOpen = (MCX_OPEN_MINUTES - mins) * 60 * 1000 - ist.getSeconds() * 1000;
    return { isOpen: false, label: 'Pre-Market', nextOpenMs: msUntilOpen, color: 'yellow' };
  }

  if (mins >= MCX_CLOSE_MINUTES) {
    // Post-market weekday — next open is next business day
    // (simplified: assume next day is a weekday; real impl would skip weekends)
    const msUntilOpen = (24 * 60 - mins + MCX_OPEN_MINUTES) * 60 * 1000 - ist.getSeconds() * 1000;
    return { isOpen: false, label: 'After Hours', nextOpenMs: msUntilOpen, color: 'orange' };
  }

  const msUntilClose = (MCX_CLOSE_MINUTES - mins) * 60 * 1000 - ist.getSeconds() * 1000;
  return { isOpen: true, label: 'Live', msUntilClose, color: 'green' };
}

// How often to re-fetch based on market state
export function getRefreshIntervalMs(isOpen) {
  return isOpen
    ? 60_000       // every 60s during market hours
    : 5 * 60_000;  // every 5min outside (catch open/close transitions)
}

export function formatCountdown(ms) {
  if (!ms || ms <= 0) return null;
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}
