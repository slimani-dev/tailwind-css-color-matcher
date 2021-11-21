<script setup>
import ColorPallet from '@/components/ColorPallet.vue'
</script>

<template>
  <div class="p-5">
    <h2 class="font-bold text-2xl">Tailwind CSS color matcher</h2>
    <div class="py-10">
      <p>put your Hex Code here and edit the ranges to find the closes match to your color from the tailwind css color pallet</p>
      <p>I'm using the HSL value to compare and find the best match for the color you are looking for</p>
      <p>The Background of the result section will use the input value as color, this will help you compare visually to see the best match</p>
    </div>
  </div>
  <color-pallet/>
  <div class="p-5">
    <a class="underline" href="https://slimani.dev">Mohamed Slimani</a>
  </div>
</template>
