const nameValidation = (name: string): boolean => {
    if (name.length > 3 && name.length < 20) {
        return true;
    }
    return false;
}

const surnameValidation = (surname: string): boolean => {
    if (surname.length > 3 && surname.length < 20) {
        return true;
    }
    return false;
}

const emailValidation = (email: string): boolean => {
    if (email.length > 3 && email.length < 50 && email.includes('@') && email.includes('.')) {
        return true;
    }
    return false;
}

const passwordValidation = (password: string, passwordConfim: string): boolean => {
    if (password.length > 6 && password.length < 20 && password === passwordConfim) {
        return true;
    }
    return false;
}

const userTypeValidation = (userType: string): boolean => {
    if (userType === 'Customer' || userType === 'Company') {
        return true;
    }
    return false;
}

const validationForm = (name: string, surname: string, email: string, password: string, passwordConfim: string, userType: string): boolean => {
    if (nameValidation(name) && surnameValidation(surname) && emailValidation(email) && passwordValidation(password, passwordConfim) && userTypeValidation(userType)) {
        return true;
    }
    return false;
}

export {
    nameValidation,
    surnameValidation,
    emailValidation,
    passwordValidation,
    userTypeValidation,
    validationForm,
};
