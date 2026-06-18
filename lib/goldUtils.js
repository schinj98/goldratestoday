export function convertToINR(usdPrice, usdInrRate = 83.5) {
  return usdPrice * usdInrRate;
}

export function calculate10g(perGramPrice) {
  return perGramPrice * 10;
}

export function calculate100g(perGramPrice) {
  return perGramPrice * 100;
}

export function formatINR(number) {
  if (!number && number !== 0) return '—';
  const num = Math.round(number);
  const numStr = num.toString();
  if (numStr.length <= 3) return `₹${numStr}`;

  const lastThree = numStr.slice(-3);
  const rest = numStr.slice(0, -3);
  const withCommas = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return `₹${withCommas},${lastThree}`;
}

const CITY_MULTIPLIERS = {
  delhi:      0,
  noida:      150,
  gurgaon:    200,
  faridabad:  100,
  mumbai:     50,
  bangalore:  -50,
  chennai:    -100,
  hyderabad:  -75,
  pune:       25,
  kolkata:    75,
  ahmedabad:  -25,
  jaipur:     125,
  lucknow:    175,
  chandigarh: 225,
  surat:      -50,
};

export function getCityMultiplier(city) {
  return CITY_MULTIPLIERS[city?.toLowerCase()] ?? 0;
}

export function applyMcxDelta(basePrice, city) {
  return basePrice + getCityMultiplier(city);
}

export function formatDate(date = new Date()) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

export function formatDateTime(date = new Date()) {
  const d = new Date(date);
  return `${formatDate(d)}, ${d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata',
  })} IST`;
}
