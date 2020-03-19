<template>
<div class="p-4 md:p-12">
  <div class="flex mb-4 flex-col md:flex-row">
    <div class="w-full md:w-2/5 md:mr-4 cards mb-4 md:mb-0">
      <div class="max-w-sm mx-auto md:max-w-full rounded overflow-hidden border border-gray-400 ">
        <div class="p-6">
          <div class="font-bold text-xl mb-0 flex flex-row justify-between">
            <span class="font-sans md:text-lg text-md">Add Prescription</span>
            <span class="font-mono font-semibold text-orange-600 text-xs cursor-pointer md:hidden uppercase" @click.prevent="toggleViewPrescription">{{ viewPrescription ? 'hide' : 'show' }}</span>
          </div>
          <p class="text-gray-700 font-mono text-xs mb-2">Please consider adding a proper title for the prescription.</p>
          <form v-show="viewPrescription">
            <div class="mb-4">
              <input @change.prevent="(evt) => onFieldChange(evt, 'title')" class="appearance-none border border-orange-600 h-8 rounded w-full py-2 px-3 text-orange-600 leading-tight focus:outline-none focus:shadow-outline text-sm h-10 text-orange-600" id="title" type="text" placeholder="Prescription Title" name="title" />
            </div>
            <div class="mb-4">
              <span class="text-sm">Prescription Type</span>
              <div class="mt-0 w-full">
                <div class="flex flex-row" :class="[prescription.type !== '' ? 'justify-' : '']">
                  <label class="inline-flex font-mono items-center text-sm font-semibold" for="type">
                    <input @change.prevent="(evt) => onFieldChange(evt, 'type')" type="radio" class="form-radio" name="type" value="tablets" />
                    <span class="ml-2">Tablets</span>
                  </label>
                  <label class="inline-flex font-mono items-center text-sm font-semibold ml-2" for="type">
                    <input @change.prevent="(evt) => onFieldChange(evt, 'type')" type="radio" class="form-radio" name="type" value="liquid" />
                    <span class="ml-2">Liquid</span>
                  </label>
                </div>
                <div class="">
                  <div v-show="prescription.type !== ''" class="w-full">
                    <label class="inline-flex flex-col font-mono text-sm font-semibold mt-2 w-full">
                      <span class="mr-4 relative text-xs mb-1">Name Of Drug/Prescription</span>
                      <input type="text" name="drugName" class="border border-orange-600 py-1 px-2 h-10 rounded text-orange-600" v-model="prescription.drugName" />
                    </label>
                    <label class="inline-flex flex-col font-mono text-sm font-semibold mb-2 w-full">
                      <span class="mr-4 relative text-xs mb-1">Quantity</span>
                      <input type="number" name="quantity" class="border border-orange-600 py-1 px-2 h-10 rounded text-orange-600" v-model="prescription.quantity" />
                    </label>
                    <div class="w-full flex flex-col">
                      <div class="w-full pr-1 inline-flex flex-col">
                        <span class="text-xs font-mono mr-2 mb-1">Dosage Duration</span>
                        <vc-date-picker
                          mode="range"
                          v-model="dosageDuration"
                          :min-date="new Date()"
                          :input-props='{
                            class: "appearance-none border border-orange-600 h-10 rounded w-full py-2 px-3 text-orange-600 leading-tight focus:outline-none focus:shadow-outline font-mono font-bold text-md w-auto",
                            placeholder: "Days",
                            readonly: true
                          }'
                        />
                      </div>
                      <div class="flex my-2 w-full">
                        <div class="w-full inline-flex flex-col">
                          <span class="text-xs font-mono mb-1 flex justify-between">
                            <span class="w-3/4">Daily Dosage Interval</span>
                            <div class="w-1/3 justify-between flex text-orange-600 text-xs">
                              <span class="cursor-pointer" :class="[dailyInterval.length >= 4 ? 'text-gray-600' : 'text-orange-600']" @click.prevent="() => manageDailyInterval('add')">Add</span>
                              <span class="cursor-pointer ml-1" :class="[dailyInterval.length <= 1 ? 'text-gray-600' : 'text-orange-600']" @click.prevent="() => manageDailyInterval('remove')">Remove</span>
                            </div>
                          </span>
                          <div
                            class="w-full"
                            :class="[dailyInterval.length > 1 ? 'mb-2' : '']"
                            v-for="(interval, index) in dailyInterval"
                            :key="index += 1"
                            >
                            <el-time-select
                              v-model="interval.intervalTime"
                              :picker-options="{
                                start: '08:30',
                                end: '18:30',
                                format: 'HH:mm',
                                step: '0:30'
                              }"
                              @change="(date) => onDateChanged(date, index)"
                              placeholder="Time"
                            >
                              </el-time-select>
                          </div>
                        </div>
                      </div>
                      <div class="flex w-full">
                        <div class="w-full inline-flex flex-col">
                          <span class="text-xs font-mono mb-1">Additional Information</span>
                          <textarea class="appearance-none border border-orange-600 h-10 rounded w-full py-2 px-3 text-orange-600 leading-tight focus:outline-none focus:shadow-outline font-mono font-bold text-xs w-auto resize-none" v-model="prescription.additionalInformation"></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <button @click.prevent="newPrescription" class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="w-full md:w-3/3 h-12 md:ml-4 mt-4 md:mt-0">
      <list-description />
    </div>
  </div>
</div>
</template>

<script>
export default {
  data: () => ({
    viewPrescription: true,
    dosageDuration: {
      start: new Date(),
      end: null,
    },
    dailyInterval: [{
      intervalTime: null,
    }],
    prescription: {
      title: '',
      drugName: '',
      type: '',
      quantity: 1,
      additionalInformation: '',
    },
    formFields: {},
  }),
  mounted() {
    this.$store.dispatch('getPrescriptions')
      .then(() => {
      })
      .catch(() => {
        this.$toast.error('Could not retrieve your prescriptions', {
          position: 'top-right',
          duration: 3000,
        });
      });
  },
  computed: {
  },
  methods: {
    onFieldChange(evt, field) {
      let { target: { value } } = evt;
      if (field === 'quantity') {
        value = parseInt(value, 10);
      }
      this.prescription[field] = value;
    },
    newPrescription() {
      this.$store.dispatch('addPrescription', {
        ...this.prescription,
        dailyInterval: this.dailyInterval.map((dI) => dI.intervalTime),
        quantity: parseInt(this.prescription.quantity, 10),
        dosageDuration: this.dosageDuration,
      })
        .then(() => {
          this.$toast.success('Success!', {
            position: 'top-right',
            duration: 3000,
          });
        })
        .catch((error) => {
          this.$toast.error(error.response?.data?.message || error.response?.data?.error[0] || 'Unsuccessful attempt', {
            position: 'top-right',
            duration: 3000,
          });
        });
    },
    onDateChanged() {
    },
    manageDailyInterval(action) {
      if (action === 'add') {
        if (this.dailyInterval.length >= 4) return;
        this.dailyInterval.push({
          intervalTime: '',
        });
      } else {
        if (this.dailyInterval.length <= 1) return;
        this.dailyInterval.splice(this.dailyInterval.length - 1, 1);
      }
    },
    toggleViewPrescription() {
      this.viewPrescription = !this.viewPrescription;
    },
  },
  components: {
    'list-description': () => import('../components/dashboard/ListPrescription'),
  },
};
</script>

<style>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: inherit;
}

.el-input.is-active .el-input__inner, .el-input__inner:focus, .el-input--prefix .el-input__inner
{
  border-color: #dd6b20 !important;
}

.el-input__icon, .el-time-panel__btn.confirm, .el-input__inner
{
  color: #dd6b20 !important;
}

div.notices.is-top > div {
  margin-right: 20px;
  margin-top: 20px;
}

input[type=range] {
  -webkit-appearance: none;
  margin: 18px 0;
  width: 100%;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  background: #dd6b20;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}

input[type=range]::-webkit-slider-thumb {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #dd6b20;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -14px;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: #dd6b20;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  background: #dd6b20;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}

input[type=range]::-moz-range-thumb {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #000000;
  height: 24px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

input[type=range]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}

input[type=range]::-ms-fill-lower {
  background: #dd6b20;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

input[type=range]::-ms-fill-upper {
  background: #dd6b20;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

input[type=range]::-ms-thumb {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

input[type=range]:focus::-ms-fill-lower {
  background: #dd6b20;
}

/* input[type=range]:focus::-ms-fill-upper {
  background: #367ebd;
} */
</style>
