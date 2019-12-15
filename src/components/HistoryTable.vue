<template>
  <table :class="className">
    <thead>
      <tr>
        <th>№</th>
        <th>{{ "Amount" | localize }}</th>
        <th>{{ "Date" | localize }}</th>
        <th>{{ "Category" | localize }}</th>
        <th>{{ "Type" | localize }}</th>
        <th>{{ "Open" | localize }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) in records" :key="record.id">
        <td :aria-label="'№'">{{ idx + 1 }}</td>
        <td :aria-label=" 'Amount' | localize ">{{ record.amount | currency }}</td>
        <td :aria-label=" 'Date' | localize ">{{ new Date(record.date) | date("date-time") }}</td>
        <td :aria-label=" 'Category' | localize ">{{ record.categoryName }}</td>
        <td :aria-label=" 'Type' | localize ">
          <span class="white-text badge" :class="[record.typeClass]">
            {{
            record.typeText | localize
            }}
          </span>
        </td>
        <td :aria-label=" 'Open' | localize ">
          <button
            class="btn-small btn"
            data-position="left"
            v-tooltip="'OpenRecord'"
            @click="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";
export default {
  props: {
    records: {
      type: Array,
      required: true
    },
    className: {
      type: String,
      required: false
    }
  }
};
</script>
