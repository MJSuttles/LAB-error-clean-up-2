/* eslint-disable no-unused-vars */
import '../styles/main.scss'; // You have to import your styles for them to work. Comment in this line
import { houses, students, voldysArmy } from '../utils/sample_data/student_data';
import {
  renderToDOM, createID, sortStudent, events
} from '../utils/sample_data/student_functions';

function header() {
  const domString = `<div class="container">
    <h1>Welcome to Hoggy Hogwarts Sorting Hat!</h1>
    <p>
      Hmm, difficult. VERY difficult. <br />Plenty of courage, I see.
      <br />Not a bad mind, either. There's talent, oh yes. <br />And a
      thirst to prove yourself. <br />But where to put you?
    </p>
  </div>`;

  renderToDOM('#header-container', domString);
}

// the basic HMTL structure of app
const htmlStructure = () => {
  const domString = `
  <div id="header-container" class="header mb-3"></div>
  <div id="form-container" class="container mb-3 text-center"></div>
  <div id="filter-container" class="container mb-3"></div>
  <div id="student-container" class="container d-flex"></div>
  `;

  renderToDOM('#app', domString);
};

const startSortingBtn = () => {
  const domString = '<button type="button" class="btn btn-info" id="start-sorting">Start the Sorting Ceremony!</button>';

  renderToDOM('#form-container', domString);
};

const studentsOnDom = (divId, array, house = 'Hogwarts') => {
  let domString = '';
  if (!array.length) {
    domString += `NO ${house.toUpperCase()} STUDENTS`;
  }

  array.forEach((student) => {
    domString += `
    <div class="card bg-dark text-white">
      <img src="${
  divId === '#voldy'
    ? 'https://carboncostume.com/wordpress/wp-content/uploads/2019/10/deatheater-harrypotter.jpg' : student.crest}" 
          class="card-img" alt="${student.house} crest">
      <div class="card-img-overlay">
        <h5 class="card-title">${student.name}</h5>
        ${
  divId === '#voldy'
    ? '<p class="card-text">Death Eater</p>'
    : ` <p class="card-text">${student.house}</p>
          <button type="button" id="expel--${student.id}" class="btn btn-danger btn-sm">Expel</button>`
}
      </div>
    </div>
    `;
  });
  renderToDOM(divId, domString);
};

// add form to DOM on start-sorting click.
// Add events for form after the form is on the DOM
const form = () => {
  const domString = `<form id="sorting" class="d-flex flex-column form-floating ">
    <input
    type="text"
    class="form-control mb-1"
    id="student-name"
    placeholder="Enter a name"
    required
  />
  <label for="floatingInputValue">Name to be sorted</label>
<button type="submit" class="btn btn-success">Get Sorted!</button>
</form>`;

  renderToDOM('#form-container', domString);

  // has to be put on the DOM after form is on DOM, not before
  // on form submit, sort student
  document.querySelector('#sorting').addEventListener('submit', sortStudent);
};

const studentAreas = () => {
  const domString = `<div id="students">No Students</div>
  <div id="voldy">No Death Eaters</div>`;

  renderToDOM('#student-container', domString);
};

// ********** HTML Components  ********** //

// ********** LOGIC  ********** //

const startApp = () => {
  htmlStructure(); // always load first
  header();
  startSortingBtn();
  events(); // always load last
};

startApp();
