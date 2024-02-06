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
