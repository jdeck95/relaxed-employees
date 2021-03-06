<template>
  <div class="row container">
    <div class="employee-table">
      <div class="row header">
        <h2 class="header__title"> Employees</h2>
        <input class="header__input" type="text" v-model="filter" placeholder="filter...">
        <font-awesome-icon class="header__icon" icon="search" />
      </div>
      <ul class="row table-header">
        <li @click="sortEmployees('name')">Name <span v-html="icons[nameSorted]"></span></li>
        <li @click="sortEmployees('age')">Age <span v-html="icons[ageSorted]"></span></li>
        <li @click="sortEmployees('salary')">Salary <span v-html="icons[salarySorted]"></span></li>
      </ul>
      <ul class="row table-body" v-for="employee in filteredEmployees" :key="employee.id" @click="editEmployee(employee)">
        <li>{{employee.employee_name}}</li>
        <li>{{employee.employee_age}}</li>
        <li>{{employee.employee_salary}}</li>
      </ul>
      <font-awesome-icon class="icon-create" icon="plus" @click="createEmployee" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overview',
  data: () => {
    return {
      /**
       * List of employees
       */
      employees: [],
      filteredEmployees: [],
      /**
       * String from input field
       */
      filter: '',
      /**
       * type of sorting of the employees attributes
       * @values empty, asc (ascending), desc (descending)
       */
      nameSorted: '',
      ageSorted: '',
      salarySorted: '',
      /**
       * HTML Code of the icons
       */
      icons: {
        asc: '&#8595;',
        desc: '&#8593;',
      },
    };
  },
  /**
     * calls fetchEmployees() after the component was created
     */
  async created() {
    await this.fetchEmployees();
    this.filteredEmployees = this.employees;
  },

  watch: {
    /**
     * Runs whenever the filter input changes
     * Compares every property of every object the input string
     */
    filter: function () {
      const filteredEmployees = this.employees.filter(employee => {
        for(let property in employee) {
          if (property !== 'id' && property !== 'profile_image') {
            if (employee[property].toString().toLowerCase().includes(this.filter.toLowerCase())) {
            return employee;
          }
          }
        }
      });
     this.filteredEmployees = filteredEmployees;
    }
  },

  methods: {
    /**
     * Gets called after the component was created
     * Fetches employees from API and assigns them to the state
     */
    async fetchEmployees() {
      const response = await fetch('http://localhost:81/api/v1/employees');
      this.employees = await response.json();
    },

    /**
     * Resets the states, which describes in what order the attributes are sorted; empty string stands for unsorted
     */
    removeIcons() {
      this.nameSorted = '';
      this.ageSorted = '';
      this.salarySorted = '';
    },

    /**
     * Sorts employees on the given attribute
     *
     * @param {String} sort The name of the attribute
     */
    sortEmployees(sort) {
      const attribute = `employee_${sort}`;
      const sortOrder = `${sort}Sorted`;
      if (this[sortOrder] === '' || this[sortOrder] === 'desc') {
        this.removeIcons();
        this.filteredEmployees = this.filteredEmployees.sort((a, b) => (a[attribute] > b[attribute]) ? 1 : -1);
        this[sortOrder] = 'asc';
      } else {
        this.removeIcons();
        this.filteredEmployees = this.filteredEmployees.sort((a, b) => (a[attribute] > b[attribute]) ? -1 : 1);
        this[sortOrder] = 'desc';
      }
    },

    /**
     * directs to edit page
     *
     * @param {Object} employee the employee to edit
     */
    editEmployee(employee) {
      this.$router.push({
        name: 'Edit',
        params: {
          employee_id: employee.id,
        }
      });
    },

    /**
     * directs to create page
     *
     */
    createEmployee() {
      this.$router.push({
        name: 'Create',
      });
    },
  },
}
</script>

<style lang="scss" scoped>

.container {
  .employee-table {
    grid-column: col-start 3/ span 8;
  }

  .header {
  &__title {
    margin: 0;
    grid-column: span 9;
  }

  &__input {
    border: none;
    grid-column: span 2;
  }

  &__icon {
    grid-column: span 1;
    align-self: center;
  }

  }

  .table-header {
    font-weight: bold;

    li:hover {
      cursor: pointer;
    }
  }

  .table-body {
    &:hover {
      background-color: deepskyblue;
      cursor: pointer;
    }
  }

  .row {
    li {
      float: left;
      grid-column: span 3;
      border-bottom: 1px solid lightgrey;
      padding: 10px 0;

      &:first-child {
        grid-column: col-start 1 / span 6;
      }
    }
  }

  .icon-create {
    float: right;
    background-color: deepskyblue;
    border-radius: 100%;
    padding: 15px;
    margin: 10px 0;
    &:hover {
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    .header {
      &__title {
        grid-column: span 7;
      }
      &__input {
        grid-column: span 4;
      }
    }

    .employee-table {
      grid-column: col-start 2/ span 10;
    }
  }

  @media (max-width: 480px) {
    .header {
      &__title {
        grid-column: span 6;
      }
      &__input {
        grid-column: span 5;
      }
    }

    .employee-table {
      grid-column: span 12;
    }
  }
}

</style>
