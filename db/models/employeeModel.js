class EmployeeModel {
    constructor(id,firstName,lastName,startDate,department,dob,street,city,state,zipCode ) {
        this.id = id;
        this.firstName= firstName;
        this.lastName= lastName;
        this.startDate= startDate;
        this.department= department;
        this.dob= dob;
        address: {
            this.street= street;
            this.city= city;
            this.state= state;
            this.zipCode= zipCode;
        }
    }
}