<template>
  <div class="container">
    <h1> Employees</h1>
    <ul class="row header">
      <li @click="sortEmployees('name')">Name</li>
      <li @click="sortEmployees('age')">Age</li>
      <li @click="sortEmployees('salary')">Salary</li>
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
      nameSorted: '',
      ageSorted: '',
      salarySorted: ''
    };
  },
  async created() {
    await this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      const response = await fetch('http://localhost:81/api/v1/employees');
      this.employees = await response.json();
      this.employees.push({"id":"3","employee_name":"Peter Petersen","employee_age":21,"employee_salary":10,"profile_image":""})
    },
    sortEmployees(sort) {
      const attribute = `employee_${sort}`;
      const sortOrder = `${sort}Sorted`;
      if (this[sortOrder] === '' || this[sortOrder] === 'desc') {
        this.employees = this.employees.sort((a, b) => (a[attribute] > b[attribute]) ? 1 : -1);
        this[sortOrder] = 'asc';
      } else {
        this.employees = this.employees.sort((a, b) => (a[attribute] > b[attribute]) ? -1 : 1);
        this[sortOrder] = 'desc';
      }
    },
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

.header > li:hover {
  cursor: pointer;
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
