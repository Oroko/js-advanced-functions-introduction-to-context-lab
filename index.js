// Your code here
const createEmployeeRecord = (arr) => {
  const [firstName, familyName,title,payPerHour] = arr
  const employee = {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents:[],
    timeOutEvents:[]

  }
  return employee
   
}

const createEmployeeRecords = (arrayOfArrays) => {
  return arrayOfArrays.map(array => {
    return createEmployeeRecord(array)
  })
  
}

const createTimeInEvent = (employee , dateTime) => {
  let [date, hour] = dateTime.split(' ')
  employee.timeInEvents.push({
   type: "TimeIn", 
   hour: parseInt(hour, 10), 
   date: date 
  })
  return employee
}

const createTimeOutEvent = (employee, dateTime) => {
  let [date, hour] = dateTime.split(" ")
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  })
  return employee
}

const hoursWorkedOnDate = (employee, date) => {
  let timeIn = employee.timeInEvents.find(obj => {
    return obj.date === date
  })

  let timeOut = employee.timeOutEvents.find(obj => {
    return obj.date === date
  })

  return (timeOut.hour - timeIn.hour ) / 100
}

const wagesEarnedOnDate = (employee, date) => {
  //get pay per hour for employee
  let payPerHour = employee.payPerHour 
  return payPerHour * hoursWorkedOnDate(employee, date)
}

const allWagesFor = (employee) => {
  // sum of all the hours for a specific employee
  let numberOfDaysWorked = employee.timeInEvents.map(obj => obj.date )
  let totalPayableWage = numberOfDaysWorked.reduce((acc, date) => {
    return acc + wagesEarnedOnDate(employee, date)
  },0)

  return totalPayableWage
}

const findEmployeeByFirstName = (arr, firstName) => {
  return arr.find(obj => obj.firstName === firstName)
}

const calculatePayroll = (arr) => {
  return arr.reduce((acc, employee) => {
    return acc + allWagesFor(employee)
  },0)
}