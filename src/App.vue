<template>
  <div>
    <h3 class="title">{{ locationName }}</h3>
    <realtime-weather
      :text="weather?.text"
      :temp="weather?.temp"
      :category="air?.category"
      :aqi="air?.aqi"
    />
    <forecast-everyday :everyday-list="everydayList" />
    <forecast-hour :hour-list="hourList" />
  </div>
</template>

<script setup lang="ts">
import {
  AirQualityData,
  DailyWeatherInfo,
  HourlyWeatherInfo,
  WeatherData,
  WeatherLocation,
} from '@/types'

const key = '09de6ea036df4ce48519cc1689d522ab'

const locationId = ref('')
const locationName = ref('')
const location = ref('')

const weather = ref<WeatherData['now'] | null>(null)
const air = ref<AirQualityData['now'] | null>(null)

const getWeather = async () => {
  const { data: data1 } = await axios.get<WeatherData>(
    'https://devapi.qweather.com/v7/weather/now',
    {
      params: {
        location: locationId.value,
        key,
      },
    },
  )
  const { data: data2 } = await axios.get<AirQualityData>(
    'https://devapi.qweather.com/v7/air/now',
    {
      params: {
        location: locationId.value,
        key,
      },
    },
  )
  weather.value = data1.now
  air.value = data2.now
}

const everydayList = ref<DailyWeatherInfo['daily']>([])
const hourList = ref<HourlyWeatherInfo['hourly']>([])
const listEveryday = async () => {
  const { data } = await axios.get<DailyWeatherInfo>(
    'https://devapi.qweather.com/v7/weather/7d',
    {
      params: {
        location: locationId.value,
        key,
      },
    },
  )
  everydayList.value = data.daily
}
const listHour = async () => {
  const { data } = await axios.get<HourlyWeatherInfo>(
    'https://devapi.qweather.com/v7/weather/24h',
    {
      params: {
        location: locationId.value,
        key,
      },
    },
  )
  hourList.value = data.hourly
}

const getLocationName = async () => {
  const { data } = await axios.get<WeatherLocation>(
    'https://geoapi.qweather.com/v2/city/lookup',
    {
      params: {
        location: location.value,
        key,
      },
    },
  )

  locationName.value = data.location[0].name
  locationId.value = data.location[0].id
}

const getLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const crd = pos.coords
      location.value = `${crd.longitude.toFixed(2)},${crd.latitude.toFixed(2)}`
    },
    (err) => {
      // eslint-disable-next-line no-console
      console.warn(`ERROR(${err.code}): ${err.message}`)
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    },
  )
}

onBeforeMount(() => {
  getLocation()
})

watch(location, async () => {
  await getLocationName()
})

watch(locationId, async () => {
  await getWeather()
  await listEveryday()
  await listHour()
})
</script>

<style scoped>
.title {
  text-align: center;
}
</style>
