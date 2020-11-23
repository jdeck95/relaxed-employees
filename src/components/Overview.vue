<template>
  <div class="container">
    <h1> Employees</h1>
    <ul class="row header">
      <li>Name</li>
      <li>Age</li>
      <li>Salary</li>
    </ul>
    <ul class="row" v-for="employee in employees" :key="employee.id">
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

.container {
  width: 100%;
}

.row {
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
  padding: 0;
  margin: 10px 0;
}

.header {
  font-weight: bold;
}

.row > li {
  float: left;
  grid-column: span 2;
  border-bottom: 1px solid lightgrey;
  padding: 10px 0;
}

.row > li:first-child {
  grid-column: col-start 1 / span 3;
}

@media (max-width: 768px) {
  .row > li:first-child {
    grid-column: col-start 1 / span 5;
  }

  .row > li {
    grid-column: span 3
  }
}

@media (max-width: 480px) {
  .row > li:first-child {
    grid-column: col-start 1 / span 5;
  }

  .row > li{
    grid-column: span 3;
  }
}

</style>
