export type User = {
    address: string;
    name: string;
    dateOfBirth: string;
    phoneNumber: string;
    userPassword: string;
    dni: string;
    hospital: string;
    residence: string;
    email: string;
};

export type Permission = {
    patient: string;
    doctor: string;
    patientPassword: string;
};