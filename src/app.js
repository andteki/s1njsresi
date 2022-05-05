
const url = 'http://localhost:3000/employees';
const addButton = document.querySelector('#addButton');
const nameElem = document.querySelector('#name');
const cityElem = document.querySelector('#city');
const salaryElem = document.querySelector('#salary');
const tableBody = document.querySelector('#tableBody');

var actualTr = null;

addButton.addEventListener('click', () => {
    const name = nameElem.value;
    const city = cityElem.value;
    const salary = salaryElem.value;
    addEmployee(name, city, salary);
});

getEmployees();

function getEmployees() {
    fetch(url)
    .then(res => res.json())
    .then(res => {
        // console.log(res);
        renderEmployees(res);
    });
}

function renderEmployees(employees) {
    employees.forEach( employee => {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdCity = document.createElement('td');
        let tdSalary = document.createElement('td');

        let tdDelete = document.createElement('td');
        let delButton = document.createElement('button');
        delButton.textContent = 'Törlés';
        setEvent(delButton, employee.id);
        tdDelete.appendChild(delButton);

        tableBody.appendChild(tr);
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdCity);
        tr.appendChild(tdSalary);
        tr.appendChild(tdDelete);
        tdId.textContent = employee.id;
        tdName.textContent = employee.name;
        tdCity.textContent = employee.city;
        tdSalary.textContent = employee.salary;
        console.log(employee.city);
    });
}

function setEvent(delButton, id) {
    // delButton.setAttribute('data-id', id);
    delButton.addEventListener('click', () => {
        // console.log(delButton.dataset.id);
        
        delEmplyoee(id);
        actualTr = delButton.parentElement.parentElement;
        actualTr.parentNode.removeChild(actualTr);
    });
}

function delEmplyoee(id) {
    console.log(id);
    let url2 = url + '/' + id;
    //console.log(url2);
    fetch(url2, {
        method: 'delete'
    });
}

function addEmployee(name, city, salary) {
    fetch(url, {
        method: "post",
        body: JSON.stringify({
            name: name,
            city: city,
            salary: salary
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
    });
}