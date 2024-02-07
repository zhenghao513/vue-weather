interface ReferInfo {
  sources: string[]
  license: string[]
}

interface DailyWeather {
  fxDate: string
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moonPhase: string
  moonPhaseIcon: string
  tempMax: string
  tempMin: string
  iconDay: string
  textDay: string
  iconNight: string
  textNight: string
  wind360Day: string
  windDirDay: string
  windScaleDay: string
  windSpeedDay: string
  wind360Night: string
  windDirNight: string
  windScaleNight: string
  windSpeedNight: string
  humidity: string
  precip: string
  pressure: string
  vis: string
  cloud: string
  uvIndex: string
}

// 每日天气预报
export interface DailyWeatherInfo {
  code: string
  updateTime: string
  fxLink: string
  daily: DailyWeather[]
  refer: ReferInfo
}

interface HourlyWeather {
  fxTime: string
  temp: string
  icon: string
  text: string
  wind360: string
  windDir: string
  windScale: string
  windSpeed: string
  humidity: string
  pop: string
  precip: string
  pressure: string
  cloud: string
  dew: string
}

// 逐小时天气预报
export interface HourlyWeatherInfo {
  code: string
  updateTime: string
  fxLink: string
  hourly: HourlyWeather[]
  refer: ReferInfo
}

// 实时天气
export interface WeatherData {
  code: string
  updateTime: string
  fxLink: string
  now: NowData
  refer: ReferInfo
}

interface NowData {
  obsTime: string
  temp: string
  feelsLike: string
  icon: string
  text: string
  wind360: string
  windDir: string
  windScale: string
  windSpeed: string
  humidity: string
  precip: string
  pressure: string
  vis: string
  cloud: string
  dew: string
}

// 空气质量
export interface AirQualityData {
  code: string
  updateTime: string
  fxLink: string
  now: NowData
  station: StationData[]
  refer: ReferInfo
}

interface NowData {
  pubTime: string
  aqi: string
  level: string
  category: string
  primary: string
  pm10: string
  pm2p5: string
  no2: string
  so2: string
  co: string
  o3: string
}

interface StationData {
  pubTime: string
  name: string
  id: string
  aqi: string
  level: string
  category: string
  primary: string
  pm10: string
  pm2p5: string
  no2: string
  so2: string
  co: string
  o3: string
}

// 城市搜索
export interface WeatherLocation {
  code: string
  location: Location[]
  refer: ReferInfo
}

interface Location {
  name: string
  id: string
  lat: string
  lon: string
  adm2: string
  adm1: string
  country: string
  tz: string
  utcOffset: string
  isDst: string
  type: string
  rank: string
  fxLink: string
}
