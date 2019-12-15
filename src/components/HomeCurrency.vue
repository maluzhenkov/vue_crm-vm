<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ "Currency_Rate" | localize }}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{ "Currency" | localize }}</th>
              <th>{{ "Rate" | localize }}</th>
              <th>{{ "Date" | localize }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currencies" :key="cur">
              <td>{{ cur.slice(0, 3) }}</td>
              <td>{{ +rates[cur] }}</td>
              <td>{{ date | date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rates", "date"],
  data: () => ({
    currencies: ["RUBRUB", "USDRUB", "EURRUB"]
  })
};
</script>
