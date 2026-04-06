//PEOPLE
// THIS WILL BE POPULATED VIA PHP
const employees = [
 // Company 1
  { company_id: 1, department: 'Engineering', name: 'James Carter', phone: '403-555-0101' },
  { company_id: 1, department: 'Marketing', name: 'Sarah Mitchell', phone: '403-555-0102' },
  { company_id: 1, department: 'Sales', name: 'David Nguyen', phone: '403-555-0103' },
  { company_id: 1, department: 'HR', name: 'Emily Rhodes', phone: '403-555-0104' },
  { company_id: 1, department: 'Finance', name: 'Marcus Bell', phone: '403-555-0105' },
  { company_id: 1, department: 'Legal', name: 'Olivia Chen', phone: '403-555-0106' },
  { company_id: 1, department: 'Engineering', name: 'Tyler Brooks', phone: '403-555-0107' },
  { company_id: 1, department: 'Marketing', name: 'Hannah Flores', phone: '403-555-0108' },
  { company_id: 1, department: 'Sales', name: 'Nathan Price', phone: '403-555-0109' },
  { company_id: 1, department: 'HR', name: 'Chloe Warren', phone: '403-555-0110' },
  // Company 2
  { company_id: 2, department: 'Engineering', name: 'Ethan Scott', phone: '403-555-0111' },
  { company_id: 2, department: 'Accounting', name: 'Ava Turner', phone: '403-555-0112' },
  { company_id: 2, department: 'Operations', name: 'Logan Murphy', phone: '403-555-0113' },
  { company_id: 2, department: 'Legal', name: 'Isabella Reed', phone: '403-555-0114' },
  { company_id: 2, department: 'Customer Support', name: 'Ryan Cooper', phone: '403-555-0115' },
  { company_id: 2, department: 'Procurement', name: 'Sophia Barnes', phone: '403-555-0116' },
  { company_id: 2, department: 'Marketing', name: 'Jackson Hayes', phone: '403-555-0117' },
  { company_id: 2, department: 'Accounting', name: 'Mia Simmons', phone: '403-555-0118' },
  { company_id: 2, department: 'Operations', name: 'Caleb Foster', phone: '403-555-0119' },
  { company_id: 2, department: 'Legal', name: 'Lily Griffith', phone: '403-555-0120' },
  // Company 3
  { company_id: 3, department: 'Engineering', name: 'Owen Sanders', phone: '403-555-0121' },
  { company_id: 3, department: 'Accounting', name: 'Grace Kim', phone: '403-555-0122' },
  { company_id: 3, department: 'IT', name: 'Liam Hughes', phone: '403-555-0123' },
  { company_id: 3, department: 'Procurement', name: 'Ella Patterson', phone: '403-555-0124' },
  { company_id: 3, department: 'Marketing', name: 'Noah Jenkins', phone: '403-555-0125' },
  { company_id: 3, department: 'Accounting', name: 'Avery Morgan', phone: '403-555-0126' },
  { company_id: 3, department: 'IT', name: 'Mason Perry', phone: '403-555-0127' },
  { company_id: 3, department: 'Engineering', name: 'Harper Powell', phone: '403-555-0128' },
  { company_id: 3, department: 'Procurement', name: 'Lucas Russell', phone: '403-555-0129' },
  { company_id: 3, department: 'Marketing', name: 'Aria Coleman', phone: '403-555-0130' },
];
// Select All
document.querySelector('.select-all').addEventListener('click', function(e) {
  e.preventDefault();
  const checkboxes = document.querySelectorAll('#recipient-list input[type="checkbox"]');
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);
  checkboxes.forEach(cb => cb.checked = !allChecked);
});

const list = document.querySelector('.select-list');
const listIcon = document.querySelector(".department-header svg");
// Department dropdown
document.querySelector('.department-header').addEventListener('click', function() {
  list.style.display = list.style.display === 'flex' ? 'none' : 'flex';
  listIcon.style.transform = listIcon.style.transform === 'rotate(90deg)' ? 'rotate(0deg)' : 'rotate(90deg)';
});

// Close when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('#department')) {
    list.style.display = 'none';
  }
});


//FILTER EMPLOYEES
const companyId = 3;
const companyEmployees = employees.filter(emp => emp.company_id === companyId);

// Get unique department names 
const departments = [...new Set(companyEmployees.map(emp => emp.department))];

// Populate the department list
const selectList = document.querySelector('.select-list');
selectList.innerHTML = '<li data-dept="all">All</li>';

departments.forEach(function(dept) {
  const li = document.createElement('li');
  li.textContent = dept;
  li.dataset.dept = dept;
  selectList.appendChild(li);
});

// Filter function
function renderEmployees(deptFilter) {
  const filtered = deptFilter === 'all'
    ? companyEmployees
    : companyEmployees.filter(emp => emp.department === deptFilter);

  const recipientList = document.getElementById('recipient-list');
  recipientList.innerHTML = '';

  filtered.forEach(function(emp) {
    const row = document.createElement('div');
    row.classList.add('recipient-row');
    row.innerHTML = `
      <span>${emp.name}</span>
      <span>${emp.department}</span>
      <input type="checkbox" name="recipients" value="${emp.phone}" data-dept="${emp.department}" />
    `;
    recipientList.appendChild(row);
  });
}

// Initial render
renderEmployees('all');

// Department click filter
selectList.addEventListener('click', function(e) {
  const li = e.target.closest('li');
  if (!li) return;

  const dept = li.dataset.dept === 'all' ? 'all' : li.dataset.dept;
  renderEmployees(dept);

  selectList.style.display = 'none';
  document.querySelector('.department-header svg').style.transform = 'rotate(0deg)';
});