<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light position-relative">
      <a class="navbar-brand" href="#">MyApp</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Services</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contact</a>
          </li>
        </ul>
      </div>
  
      <!-- This div will hold the Login, Register, and Logout buttons -->
      <div class="auth-buttons position-absolute top-50 end-0 translate-middle-y">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="!isLoggedIn">
            <a class="nav-link" href="#">Login</a>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <a class="nav-link" href="#">Register</a>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <button class="btn btn-outline-danger" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Navbar",
    data() {
      return {
        // Simulate user login state
        isLoggedIn: false, // Change to `true` to simulate the user being logged in
      };
    },
    methods: {
      logout() {
        // Simulate logout action
        this.isLoggedIn = false;
        console.log("User logged out");
      },
    },
  };
  </script>
  
  <style scoped>
  /* CSS to make the login/register/logout buttons appear on the right side */
  .auth-buttons {
    right: 10px; /* Adjust right margin as needed */
    top: 50%; /* Center vertically */
    transform: translateY(-50%); /* Center the div vertically */
  }
  
  /* Ensure buttons don't break when the screen size changes */
  .navbar-nav {
    flex-direction: row; /* Keep the buttons in a row */
  }
  
  .nav-item {
    margin-left: 10px; /* Add space between buttons */
  }
  </style>
  