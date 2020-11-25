<template>
  <div class="row container">
    <div class="edit-employee">
      <form @submit="handleChanges" action="">
        <p>{{this.action}} Employee</p>
        <input type="text" v-model="editedEmployee.employee_name" placeholder="Input name here...">
        <input type="number" v-model="editedEmployee.employee_age" placeholder="Input age here">
        <input type="number" v-model="editedEmployee.employee_salary" placeholder="Input salary here">
        <button>Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Edit',
  props: {
    employee_id: String,
    action: String
  },
  /**
   * calls fetchEmployee() after the component was created
   */
  async created() {
    await this.fetchEmployee(this.employee_id);
  },
  data: function() {
    return {
      /**
       * Objects with employee-data original and edited
       */
      editedEmployee: '',
      originalEmployee: ''
    }
  },
  methods: {
    /**
     * fetches employee with given id
     *
     * @param {Number} id ID of the employee
     */
    async fetchEmployee(id) {
      const response = await fetch(`http://localhost:81/api/v1/employee/${id}`);
      const employee = await response.json();
      delete employee.id;
      this.editedEmployee = employee;
      this.originalEmployee = { ...employee };
    },
    /**
     * checks if edited age or salary is smaller then the original value
     *if so, asks user wether he wants to proceed or cancel the submit
     */
    checkInput() {
      if (this.originalEmployee.employee_age > this.editedEmployee.employee_age) {
        return confirm('You are reducing the age. Are you sure?')
      }
      if (this.originalEmployee.employee_salary > this.editedEmployee.employee_salary) {
        return confirm('You are reducing the salary. Are you sure?')
      }
      return true;
    },
    /**
     * triggers a PUT request to the API with the employee-data
     *
     */
    async handleChanges() {
      const validValues = this.checkInput();
      if (!validValues) {
        return;
      };
      const response = await fetch(`http://localhost:81/api/v1/update/${this.employee_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.editedEmployee),
      });

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        window.alert(message);
        throw new Error(message);
      }
      this.$router.push({name: 'Overview'});
    }
  },

}
</script>

<style lang="scss" scoped>

.edit-employee {
  grid-column: col-start 4 / span 5;

  form {

    input {
      width: 100%;
      border: none;
      border-bottom: 1px solid lightgrey;
      margin: 10px 0;
      padding: 5px 0;

      &:focus {
        outline: none;
        border-color: blue;
      }
    }
  }
}

@media (max-width: 768px) {
    .edit-employee {
      grid-column: col-start 3 / span 8;
    }
  }

  @media (max-width: 480px) {
    .edit-employee {
      grid-column: col-start 2 / span 10;
    }
  }

</style>