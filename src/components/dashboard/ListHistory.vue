<template>
<div class="flex flex-col w-full">
  <h1 class="font-sans text-xl mb-4 text-gray-800 uppercase">DOSAGE History ({{ $store.getters.prescriptionsHistory.length }})</h1>
  <div class="w-full flex flex-row flex-wrap">
    <div v-for="(history, index) in $store.getters.prescriptionsHistory" :key="index" class="max-w-lg w- w-full lg:flex border border-gray-400 rounded mb-4">
      <div
        class="bg-white rounded p-4 flex flex-col justify-between leading-normal w-full"
      >
        <div class="flex flex-col">
          <div class="inline-flex items-stretch">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="18px" height="18px"><g><g>
                <g>
                  <path d="M437.019,74.98C388.667,26.629,324.38,0,256,0C187.619,0,123.331,26.629,74.98,74.98C26.628,123.332,0,187.62,0,256    s26.628,132.667,74.98,181.019C123.332,485.371,187.619,512,256,512c68.38,0,132.667-26.629,181.019-74.981    C485.371,388.667,512,324.38,512,256S485.371,123.333,437.019,74.98z M256,482C131.383,482,30,380.617,30,256S131.383,30,256,30    s226,101.383,226,226S380.617,482,256,482z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#DD6B20"/>
                </g>
              </g><g>
                <g>
                  <path d="M378.305,173.859c-5.857-5.856-15.355-5.856-21.212,0.001L224.634,306.319l-69.727-69.727    c-5.857-5.857-15.355-5.857-21.213,0c-5.858,5.857-5.858,15.355,0,21.213l80.333,80.333c2.929,2.929,6.768,4.393,10.606,4.393    c3.838,0,7.678-1.465,10.606-4.393l143.066-143.066C384.163,189.215,384.163,179.717,378.305,173.859z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#DD6B20"/>
                </g>
              </g></g>
            </svg>
            <h3 class="text-gray-700 ml-3 mb-1 font-bold text-sm md:text-md capitalize">{{ history.currentTime }}</h3>
          </div>
          <div class="flex justify-between">
            <h3 class="text-gray-700 mb-1 font-bold text-sm md:text-md capitalize">{{ history.prescription.title }}</h3>
            <p class="text-black font-bold text-xs lowercase font-mono text-gray-600 inline-flex">
            <span class="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" class="h-4"><g><g>
                <g>
                  <g>
                    <path d="M256,0C114.844,0,0,114.844,0,256s114.844,256,256,256s256-114.844,256-256S397.156,0,256,0z M266.667,490.126v-31.46     c0-5.896-4.771-10.667-10.667-10.667s-10.667,4.771-10.667,10.667v31.46c-120.868-5.473-217.987-102.591-223.46-223.46h31.46     C59.229,266.667,64,261.896,64,256s-4.771-10.667-10.667-10.667h-31.46c5.473-120.868,102.591-217.987,223.46-223.46v31.46     C245.333,59.229,250.104,64,256,64s10.667-4.771,10.667-10.667v-31.46c120.868,5.473,217.987,102.591,223.46,223.46h-31.46     c-5.896,0-10.667,4.771-10.667,10.667s4.771,10.667,10.667,10.667h31.46C484.654,387.535,387.535,484.654,266.667,490.126z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#DD6B20"/>
                    <path d="M276.281,261.198c0.441-1.707,1.052-3.355,1.052-5.198c0-4.465-1.698-8.382-4.053-11.811l67.053-143.678     c2.49-5.333,0.188-11.688-5.156-14.177C329.854,83.885,323.5,86.167,321,91.49l-67.005,143.583     c-10.776,1.063-19.328,9.878-19.328,20.927c0,11.76,9.573,21.333,21.333,21.333c1.842,0,3.491-0.611,5.198-1.052l83.26,83.26     c2.083,2.083,4.813,3.125,7.542,3.125c2.729,0,5.458-1.042,7.542-3.125c4.167-4.167,4.167-10.917,0-15.083L276.281,261.198z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#DD6B20"/>
                  </g>
                </g>
              </g></g> </svg>
            </span>
            {{ format.formatDistance(new Date(history.createdAt), new Date(), {
              addSuffix: true
            }) }}
            </p>
          </div>
          <div class="flex flex-col">
            <div class="h-4 text-gray-700 inline-flex mb-2" id="">
              <svg xmlns="http://www.w3.org/2000/svg"  height="20px" viewBox="0 0 128 128" width="20px" data-name="Layer 1"><g><path d="m50.868 72.045h-6.628v-6.627a1.75 1.75 0 0 0 -1.75-1.75h-7.475a1.75 1.75 0 0 0 -1.75 1.75v6.627h-6.628a1.75 1.75 0 0 0 -1.75 1.75v7.476a1.75 1.75 0 0 0 1.75 1.75h6.628v6.628a1.75 1.75 0 0 0 1.75 1.75h7.475a1.75 1.75 0 0 0 1.75-1.75v-6.628h6.628a1.75 1.75 0 0 0 1.75-1.75v-7.471a1.75 1.75 0 0 0 -1.75-1.755zm-1.75 7.476h-6.628a1.75 1.75 0 0 0 -1.75 1.75v6.629h-3.975v-6.629a1.75 1.75 0 0 0 -1.75-1.75h-6.628v-3.976h6.628a1.75 1.75 0 0 0 1.75-1.75v-6.627h3.975v6.632a1.75 1.75 0 0 0 1.75 1.75h6.628z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#DD6B20"/><path d="m116.051 97.66-7.79-7.614-7.79-7.614a9.3 9.3 0 0 0 -13.131.15l-.329.336a9.274 9.274 0 0 0 -.924 11.868h-17.832v-39.675a15.152 15.152 0 0 0 -5.3-11.518 11.657 11.657 0 0 1 -4.075-8.86v-5.275h2.349a1.75 1.75 0 0 0 1.75-1.75v-11.784a1.75 1.75 0 0 0 -1.75-1.75h-44.956a1.75 1.75 0 0 0 -1.75 1.75v11.784a1.75 1.75 0 0 0 1.75 1.75h2.349v5.275a11.656 11.656 0 0 1 -4.075 8.86 15.154 15.154 0 0 0 -5.3 11.518v49.222a9.5 9.5 0 0 0 9.493 9.493h40.022a9.428 9.428 0 0 0 3.238-.579 9.222 9.222 0 0 0 3.2.579h21.79a9.29 9.29 0 0 0 9.266-8.893l6.492 6.345a9.3 9.3 0 0 0 13.131-.15l.329-.336a9.286 9.286 0 0 0 -.151-13.132zm-26.541-12.3.329-.336a5.794 5.794 0 0 1 8.183-.094l6.54 6.392-8.416 8.612-6.54-6.392a5.786 5.786 0 0 1 -.095-8.182zm-76.76-25.748h52v35.172h-52zm35.389-33.654v-8.284h4.137v8.284zm-7.637 0v-8.284h4.137v8.284zm-7.637 0v-8.284h4.135v8.284zm-7.637 0v-8.284h4.137v8.284zm34.253 0h-3.705v-8.284h3.706zm-41.458-8.284h3.706v8.284h-3.706zm-1.2 28.576a15.151 15.151 0 0 0 5.3-11.517v-5.275h33.26v5.275a15.153 15.153 0 0 0 5.3 11.517 11.656 11.656 0 0 1 4.075 8.86v1h-52v-1a11.659 11.659 0 0 1 4.067-8.86zm-4.073 58.083v-6.049h45.194a9.236 9.236 0 0 0 -2.035 5.787v.469a9.235 9.235 0 0 0 2.035 5.786h-39.2a6 6 0 0 1 -5.994-5.993zm46.658.207v-.469a5.793 5.793 0 0 1 5.786-5.787h9.145v12.042h-9.145a5.793 5.793 0 0 1 -5.786-5.786zm33.362 0a5.793 5.793 0 0 1 -5.786 5.786h-9.145v-12.042h9.145a5.793 5.793 0 0 1 5.786 5.787zm20.929 3.806-.329.336a5.747 5.747 0 0 1 -4.072 1.741 5.607 5.607 0 0 1 -4.11-1.647l-6.54-6.392 8.416-8.612 6.54 6.392a5.787 5.787 0 0 1 .095 8.182z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#DD6B20"/></g> </svg>
              <div class="inline-flex font-mono text-sm text-gray-600 ml-2 justify-around">
                <p>{{ history.prescription.drugName }} <span class="font-mono text-xs text-orange-600">({{ history.prescription.dosageCompleted }} of {{ history.prescription.totalDosageCount }} completed)</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
const dateFns = require('date-fns');

export default {
  name: 'list-prescription',
  data: () => ({
    format: dateFns,
    console,
  }),
  methods: {
    sortDailyInterval(dailyIntervals) {
      return dailyIntervals.filter((intervalTime) => dateFns.isAfter(new Date(this.parseToToday(intervalTime.stringValue)), new Date()))
        .map((di) => ({
          ...di,
          formattedValue: new Date(this.parseToToday(di.stringValue)),
        }));
    },
    parseToToday(timeString) {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      const value = `${yyyy}-${mm}-${dd}T${timeString}:00`;
      return value;
    },
    deletePrescription(prescription) {
      this.$store.dispatch('deletePrescription', prescription)
        .then(() => {
          this.$toast.success(`${prescription.title} removed!`, {
            position: 'top-right',
            duration: 3000,
          });
        });
    },
  },
};
</script>
