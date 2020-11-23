<template>
  <div>
    <ul v-for="employee in employees" :key="employee.id">
      <li>{{employee.employee_name}}</li>
      <li>{{employee.employee_age}}</li>
      <li>{{employee.employee_salary}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Overview',
  data: () => {
    return {
      employees: [],
    };
  },
  async created() {
    await this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      const response = await fetch('http://localhost:81/api/v1/employees');
      this.employees = await response.json();
    }
  }
}
</script>

<style scoped>

</style>
