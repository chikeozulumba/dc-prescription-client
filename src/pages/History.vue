<template>
<div class="p-4 md:p-12">
  <div class="flex mb-4 flex-col md:flex-row">
    <div class="w-full md:w-3/3 h-12 md:ml-4 mt-4 md:mt-0 justify-center flex">
      <list-history />
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
    this.$store.dispatch('getPrescriptionsHistory')
      .then(() => {
      })
      .catch(() => {
        this.$toast.error('Could not retrieve your prescriptions', {
          position: 'top-right',
          duration: 3000,
        });
      });
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
    'list-history': () => import('../components/dashboard/ListHistory'),
  },
};
</script>

<style>
</style>
