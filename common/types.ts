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