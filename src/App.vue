<template>
  <div>
    <el-button
      :icon="Search"
      circle
      class="search__button"
      @click="openDialog"
    />
    <change-location-dialog
      ref="dialog"
      @search="(value) => (location = value)"
    />
    <h3 class="title">{{ locationName }}</h3>
    <realtime-weather
      :text="weather?.text"
      :temp="weather?.temp"
      :category="air?.category"
      :aqi="air?.aqi"
    />
    <div class="wrapper">
      <forecast-everyday :everyday-list="everydayList" />
    </div>
    <div class="wrapper">
      <forecast-hour :hour-list="hourList" />
    </div>

    <div class="grid wrapper">
      <div class="grid-left">
        <wind-direction
          :wind-dir="weather?.windDir"
          :wind-scale="weather?.windScale"
        />
        <wind-direction
          :wind-dir="weather?.windDir"
          :wind-scale="weather?.windScale"
        />
      </div>
      <div>
        <wind-direction
          :wind-dir="weather?.windDir"
          :wind-scale="weather?.windScale"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import type {
  AirQualityData,
  DailyWeatherInfo,
  HourlyWeatherInfo,
  WeatherData,
  WeatherLocation,
} from '@/types'
import ChangeLocationDialog from '@/components/ChangeLocationDialog.vue'
import WindDirection from '@/components/WindDirection.vue'

const key = '09de6ea036df4ce48519cc1689d522ab'

const dialog = ref<InstanceType<typeof ChangeLocationDialog> | null>(null)
const openDialog = () => {
  if (dialog.value) {
    dialog.value.visible = true
  }
}

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

.wrapper {
  max-width: 60em;
  margin-left: auto;
  margin-right: auto;
}

.search__button {
  position: absolute;
  top: 28px;
  transform: translateY(-50%);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5em;
}

.grid * + * {
  margin-top: 0;
}

.grid-left {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1.5em;
}

.grid-left * + * {
  margin-top: 0;
}
</style>
