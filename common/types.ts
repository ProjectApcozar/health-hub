export type User = {
    address: string;
    name: string;
    date_of_birth: string;
    phone_number: string;
    user_password: string;
    dni: string;
    hospital: string;
    residence: string;
    email: string;
};

export type Permission = {
    patient: string;
    doctor: string;
    user_password: string;
};