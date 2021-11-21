<template>
  <div class="p-5 grid grid-cols-1 lg:grid-cols-12 gap-4">
    <div class="col-span-1 lg:col-span-4">
      <p class="text-lg font-bold mb-2">input <code>#hex</code> code</p>
      <div class="flex justify-between">
        <input v-model="input" class="flex-grow border-2 border-gray-200 px-5 py-3 mb-4 rounded-lg" type="text"
               placeholder="#fff or #ffffff">
      </div>
      <div class="text-lg font-bold my-2 flex justify-between">
        <p>Hue range</p>
        <div class="flex flex-row">
          <button @click="hRange--" class="px-5 border rounded">-</button>
          <p class="mx-5">{{ ('00' + hRange).slice(-3) }}</p>
          <button @click="hRange++" class="px-5 border rounded">+</button>
        </div>
      </div>
      <div class="text-lg font-bold my-2 flex justify-between">
        <p>Saturation range</p>
        <div class="flex flex-row">
          <button @click="sRange--" class="px-5 border rounded">-</button>
          <p class="mx-5">{{ ('00' + sRange).slice(-3) }}</p>
          <button @click="sRange++" class="px-5 border rounded">+</button>
        </div>
      </div>
      <div class="text-lg font-bold my-2 flex justify-between">
        <p>Light range</p>
        <div class="flex flex-row">
          <button @click="lRange--" class="px-5 border rounded">-</button>
          <p class="mx-5"> {{ ('00' + lRange).slice(-3) }}</p>
          <button @click="lRange++" class="px-5 border rounded">+</button>
        </div>
      </div>
      <p class="text-sm text-gray-500 font-bold mt-4 mb-2">if you don't see any result widen the range a bit</p>
    </div>
    <div v-if="colorInfo.valid"
         :style="{backgroundColor: colorInfo['hex']}"
         :class="{'text-white': colorInfo.hsl[2] < 80 }"
         class="col-span-1 lg:col-span-8 p-5 border border-gray-200 row-span-3 bg-gray-50 shadow-lg rounded-lg">
      <p v-for="k in Object.keys(colorInfo).filter(k => k !== 'valid')" :key="k">{{ k }} : {{ colorInfo[k] }}</p>
      <hr class="my-5">

      <template v-for="color in bestMatches" :key="color.name">
        <div class="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-y-4 gap-x-2 mb-2">
          <div class="col-span-2 sm:col-span-1 sm:row-span-4 lg:col-span-2">
            <h3 class="capitalize text-2xl font-bold">{{ color.name }}</h3>
            <p :class="{'text-gray-500': colorInfo['hsl'][2] > 80, 'text-gray-200': colorInfo['hsl'][2] < 80}">
              colors.{{ color.name }}</p>
          </div>
          <div v-for="value in color.values"
               :key="value.hex"
               @click="input = value.hex"
               class="col-span-1  cursor-pointer">
            <div class="relative">
              <div class="rounded-lg h-20 shadow-lg" :style="{ backgroundColor: value.hex }"></div>
              <div class="absolute text-left z-10 p-2 inset-0" :class="{'text-white': value.key > 300}">
                <p class="font-bold">{{ value.key }}</p>
                <p class="text-sm font-normal uppercase">{{ value.hex }}</p>
                <p class="text-sm font-normal uppercase">{{ value.hsl }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div v-else class="col-span-1 lg:col-span-8 p-5 border border-gray-200 row-span-3 bg-gray-50 shadow-lg rounded-lg">
      invalid Color !!
    </div>
  </div>

  <hr class="m-5">

  <div class="p-5">
    <h2 class="font-bold text-2xl">Tailwind CSS color pallet</h2>
  </div>

  <template v-for="color in colors" :key="color.name">
    <div class="p-5 grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-y-4 gap-x-2">
      <div class="col-span-2 xl:col-span-2 xl:row-span-1 sm:row-span-3 lg:col-span-3 lg:row-span-2">
        <h3 class="capitalize text-2xl font-bold">{{ color.name }}</h3>
        <p class="text-gray-500">colors.{{ color.name }}</p>
      </div>
      <div v-for="value in color.values"
           :key="value.hex"
           @click="input = value.hex"
           class="col-span-1  cursor-pointer">
        <div class="relative">
          <div class="rounded-lg h-20 shadow-lg" :style="{ backgroundColor: value.hex }"></div>
          <div class="absolute text-left z-10 p-2 inset-0" :class="{'text-white': value.key > 300}">
            <p class="font-bold">{{ value.key }}</p>
            <p class="text-sm font-normal uppercase">{{ value.hex }}</p>
            <p class="text-xs font-normal uppercase">{{ value.hsl }}</p>
          </div>
        </div>
      </div>

    </div>
  </template>
</template>

<script setup>
import * as tailwindColors from 'tailwindcss/colors.js'
import { computed, reactive, ref } from 'vue'


const rgb2hsl = ([r, g, b]) => {
  let v = Math.max(r, g, b),
      c = v - Math.min(r, g, b),
      f = (1 - Math.abs(v + v - c - 1))
  let h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c))
  return [
    parseInt(60 * (h < 0 ? h + 6 : h)),
    parseInt((f ? -c / f : 0) * 100),
    parseInt((((v + v - c) / 2) * 100) / 256)
  ]
}

const hex2rgb = (hex) => {
  let v = hex.toString().replace('#', '')
  if (v.length === 3) v =
      v.substring(0, 1) + v.substring(0, 1) +
      v.substring(1, 2) + v.substring(1, 2) +
      v.substring(2, 3) + v.substring(2, 3)
  return [parseInt(v.substring(0, 2), 16), parseInt(v.substring(2, 4), 16), parseInt(v.substring(4, 6), 16)]
}

const input = ref('#ffffff')
const sRange = ref(0)
const hRange = ref(0)
const lRange = ref(0)

const colors = reactive([
  {
    name: 'black',
    values: [{
      key: 1000,
      hex: '#000000',
      hsl: rgb2hsl(hex2rgb('#000'))
    }]
  },
  {
    name: 'white',
    values: [{
      hex: '#ffffff',
      hsl: rgb2hsl(hex2rgb('#fff'))
    }]
  }
])

Object.keys(tailwindColors).filter(k => k !== 'black' && k !== 'white' && k !== 'lightBlue' && k !== 'default').forEach(name => {
  const values = []
  Object.keys(tailwindColors[name]).forEach(key => {
    values.push({
      key,
      hex: tailwindColors[name][key],
      hsl: rgb2hsl(hex2rgb(tailwindColors[name][key]))
    })
  })

  colors.push({
    name, values
  })
})

const colorInfo = computed(() => {

  let valid = false, hex = '', rgb = [0, 0, 0], hsl = [0, 0, 0]
  const value = input.value.toLowerCase()

  if (value.match('^#?([0-9a-f]{3}){1,2}$')) {
    valid = true
    hex = '#' + value.toString().replace('#', '')
    rgb = hex2rgb(hex)
    hsl = rgb2hsl(rgb)
  }
  return {
    valid, hex, rgb, hsl
  }
})

const bestMatches = computed(() => {
  let matches = []

  if (colorInfo.value.valid) {
    matches = colors.filter(color => {
      let largestHD = 0, smallestHD = 360
      let temp = 0

      color.values.forEach(value => {
        temp = value.hsl[0]
        largestHD = largestHD < temp ? temp : largestHD
        smallestHD = smallestHD > temp ? temp : smallestHD
      })

      return (smallestHD - hRange.value) <= colorInfo.value.hsl[0] && colorInfo.value.hsl[0] <= (largestHD + hRange.value)
    })
    matches = matches.map(color => {
      const values = color.values.filter(value => {
        return Math.abs(value.hsl[1] - colorInfo.value.hsl[1]) <= sRange.value
      })

      return {
        ...color,
        values
      }
    }).map(color => {
      const values = color.values.filter(value => {
        return Math.abs(value.hsl[2] - colorInfo.value.hsl[2]) <= lRange.value
      })

      return {
        ...color,
        values
      }
    }).map(color => {
      const values = color.values.filter(value => {
        return Math.abs(value.hsl[0] - colorInfo.value.hsl[0]) <= hRange.value
      })

      return {
        ...color,
        values
      }
    })
    return matches.filter(m => m.values.length)
  }

})

</script>

<style scoped>

</style>