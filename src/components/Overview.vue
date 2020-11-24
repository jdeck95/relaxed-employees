<template>
  <div class="row container">
    <div class="employee-table">
      <div class="row header">
        <h2 class="header__title"> Employees</h2>
        <input class="header__input" type="text" placeholder="filter...">
        <font-awesome-icon class="header__icon" icon="search" />
      </div>
      <ul class="row table-header">
        <li @click="sortEmployees('name')">Name <span v-html="icons[nameSorted]"></span></li>
        <li @click="sortEmployees('age')">Age <span v-html="icons[ageSorted]"></span></li>
        <li @click="sortEmployees('salary')">Salary <span v-html="icons[salarySorted]"></span></li>
      </ul>
      <ul class="row table-body" v-for="employee in employees" :key="employee.id">
        <li>{{employee.employee_name}}</li>
        <li>{{employee.employee_age}}</li>
        <li>{{employee.employee_salary}}</li>
      </ul>
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
  async created() {
    await this.fetchEmployees();
  },
  methods: {
    // fetches employees from API and assigns it to the state
    /**
       * Gets called after the component was created
       * Fetches employees from API and assigns them to the state
       */
    async fetchEmployees() {
      const response = await fetch('http://localhost:81/api/v1/employees');
      this.employees = await response.json();
      // adds dummy-employee for testing purposes
      this.employees.push({"id":"3","employee_name":"Peter Petersen","employee_age":21,"employee_salary":10,"profile_image":""})
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
        this.employees = this.employees.sort((a, b) => (a[attribute] > b[attribute]) ? 1 : -1);
        this[sortOrder] = 'asc';
      } else {
        this.removeIcons();
        this.employees = this.employees.sort((a, b) => (a[attribute] > b[attribute]) ? -1 : 1);
        this[sortOrder] = 'desc';
      }
    },
  }
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
