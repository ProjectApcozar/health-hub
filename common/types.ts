export type User = {
    address: string;
    name: string;
    dateOfBirth: string;
    phoneNumber: string;
    encryptedUserPassword: string;
    dni: string;
    hospital: string;
    residence: string;
    email: string;
};

export type Permission = {
    patientId: string;
    doctorId: string;
    patientPassword: string;
};

export type Vaccine = {
    name: string;
    healthCenter: string;
    applicationDate: string;
    age: string;
    doctorId: string;
};

export type Medication = {
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    duration: string;
    notes: string;
    createdAt: string;
};